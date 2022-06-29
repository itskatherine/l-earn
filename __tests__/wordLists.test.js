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
 test("should return 200 if we pass a correctly formatted request", () => { 
  return request(app).get("/api/word-lists").expect(200)
 })
 test("should return an array of word-list objects", () => {
  return request(app).get("/api/word-lists").expect(200).then((res) => {
   const wordLists = res.body;
   const results = Array.isArray(wordLists);
   expect(results).toBe(true)
     })
 })
 test('should return an array of object with the correct key value pairs', () => {
   return request(app).get("/api/word-lists").expect(200).then((res) => {
   
    const wordLists = res.body
    expect(wordLists).toHaveLength(4)
    wordLists.forEach((wordList) => {
    expect.objectContaining({
      list_id: expect.any(Number),
      list_difficulty: expect.any(String),
      list_name: expect.any(String),
    });
    })
    })
  });
  test("404: Responds with an error message when passed a route which is not valid", () => {
    return request(app)
      .get("/notARoute")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("Route not found");
      });
  });
});

describe("GET /api/word-lists/:List_difficulty", () => {
  test("200: Returns an word lists by difficulty", () => {
    return request(app)
      .get("/api/word-lists?word_list=Easy")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([{
          list_id: 1,
          list_difficulty: "Easy",
          list_name: "Grade 1 spelling",
        }]);
        

      });
  });
});