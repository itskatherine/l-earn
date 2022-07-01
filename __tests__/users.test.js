process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db/index");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const { string } = require("pg-format");
const usersData = require("../db/data/test-data/usersData");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) db.end();
});

describe(" api/users/:user_id/word_bank", () => {
  test('should return 200 when passed valid user id"', () => {
    return request(app).get("/api/users/1/word_bank").expect(200);
  });
  test("should return a response object with the correct data", () => {
    return request(app)
      .post("/api/users/1/1")
      .then(() => {
        return request(app)
          .get("/api/users/1/word_bank")
          .expect(200)
          .then((res) => {
            const wordLists = res.body;
            expect.objectContaining({
              word_id: expect.any(Number),
              user_id: expect.any(Number),
              list_id: expect.any(Number),
              word: expect.any(String),
              used: expect.any(Boolean),
            });
          });
      });
  });
});

describe("POST api/users/:user_id creates user in a database", () => {
  test("201: Returns status 201 for a user added to database", () => {
    const newUser = {
      first_name: "piotr",
      last_name: "IsGreat",
      email: "piotr@gmail.com",
    };
    return request(app)
      .post("/api/users/2")
      .send(newUser)
      .expect(201)
      .then((res) => {
        expect.objectContaining({
          user_id: expect.any(Number),
          first_name: expect.any(String),
          last_name: expect.any(String),
          email: expect.any(String),
        });
      });
  });
});

describe("GET api/users/:user_id gets user from a database", () => {
  test("200: Returns a user from database", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toEqual(
          expect.objectContaining({
            users_id: expect.any(Number),
            first_name: expect.any(String),
            last_name: expect.any(String),
            email: expect.any(String),
            weekly_pocket_money: expect.any(Number),
            total_amount: expect.any(String),
            amount_earned: expect.any(String),
            date_started: expect.any(String),
            weekly_question_number: expect.any(Number),
          })
        );
      });
  });
});

describe("PATCH api/users/:user_id ", () => {
  test("200: Returns an amoun earned and total amount updated by the provided number", () => {
    const req = { amount_earned: 1, total_amount: 1.2 };
    const expected = {
      amount_earned: 1,
      total_amount: 1.4,
    };
    return request(app)
      .patch("/api/users/1")
      .send(req)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(expected);
      });
  });
});

describe("DELETE api/users/:user_id/:list_id", () => {
  test("status:204, responds with an empty response body", () => {
    return request(app)
      .delete(`/api/users/2/1`)
      .expect(204)
      .then((res) => {
        expect(res.body).toEqual({});
      });
  });
});
