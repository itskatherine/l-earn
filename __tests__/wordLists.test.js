process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db/index");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const { string } = require("pg-format");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) db.end();
});

describe("1. GET /api/word-lists", () => {
  test("200: should return 200 if we pass a correctly formatted request", () => {
    return request(app).get("/api/word-lists").expect(200);
  });
  test("should return an array of word-list objects", () => {
    return request(app)
      .get("/api/word-lists")
      .expect(200)
      .then((res) => {
        const wordLists = res.body;
        const results = Array.isArray(wordLists);
        expect(results).toBe(true);
      });
  });
  test("200: should return an array of object with the correct key value pairs", () => {
    return request(app)
      .get("/api/word-lists")
      .expect(200)
      .then((res) => {
        const wordLists = res.body;
        expect(wordLists).toHaveLength(4);
        wordLists.forEach((wordList) => {
          expect.objectContaining({
            list_id: expect.any(Number),
            list_difficulty: expect.any(String),
            list_name: expect.any(String),
          });
        });
      });
  });
  test("404: Responds with an error message when passed a route which is not valid", () => {
    return request(app)
      .get("/notARoute")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("GET /api/word-lists/:List_difficulty", () => {
  test("200: Returns an word lists by difficulty", () => {
    return request(app)
      .get("/api/word-lists?word_list=Hard")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            list_id: 3,
            list_difficulty: "Hard",
            list_name: "Grade 3 spelling",
          },
        ]);
      });
  });
  test('400: should return 400 and message "bad query" when passed an invalid query', () => {
    return request(app)
      .get("/api/word-lists?word_list=Hippo")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("invalid query");
      });
  });
});

describe("POST api/users/:user_id/:list_id post words to user word list", () => {
  test("201: should return 201 and message list added when given valid user and and list id", () => {
    return request(app)
      .post("/api/users/1/1")
      .expect(201)
      .then(({ body }) => {
        expect(body.msg).toBe("List added");
      });
  });
  test("404: when given a non-existent user_id", () => {
    return request(app)
      .post("/api/users/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("400: Returns the bed request message when passed an invalid user_id", () => {
    return request(app)
      .get("/api/users/five")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
