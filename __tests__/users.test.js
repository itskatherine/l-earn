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
