const { del } = require("express/lib/application");
const req = require("express/lib/request");
const db = require("../db/index");
const format = require("pg-format");

exports.insertUser = (newUser) => {
  const { first_name, last_name, email } = newUser;
  return db
    .query(
      "INSERT INTO users (first_name, last_name, email, amount_earned, total_amount,weekly_pocket_money ) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *;",
      [first_name, last_name, email, 0.0, 0.0, 0.0]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchUserWords = (user_id) => {
  return db
    .query("SELECT * FROM user_words WHERE user_id = $1;", [user_id])
    .then((queryRes) => {
      return queryRes.rows;
    });
};

exports.updateAmountByUser = (amount_earned, total_amount, user_id) => {
  return db
    .query(
      `UPDATE users
       SET amount_earned = amount_earned + $1,
       total_amount = total_amount + $2
       WHERE user_id = $3
       RETURNING amount_earned, total_amount;`,
      [amount_earned, total_amount, user_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      let response = rows[0];
      response.amount_earned = Number(response.amount_earned);
      response.total_amount = Number(response.total_amount);
      return response;
    });
};

exports.updateWeeklyByUser = (
  weekly_pocket_money,
  weekly_question_number,
  user_id
) => {
  return db
    .query(
      `UPDATE users
       SET weekly_pocket_money = $1,
       weekly_question_number = $2
       WHERE user_id = $3
       RETURNING weekly_pocket_money, weekly_question_number;`,
      [weekly_pocket_money, weekly_question_number, user_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return rows[0];
    });
};

exports.removeUserWordListById = (list_id, user_id) => {
  const numberOfDeletions = db
    .query(`DELETE FROM user_words WHERE list_id = $1 AND user_id = $2;`, [
      list_id,
      user_id,
    ])
    .then((result) => {
      return result.rowCount;
    });

  if (!numberOfDeletions) {
    return Promise.reject({ status: 404, msg: "comment not found" });
  }
};

exports.fetchUserById = (user_id) => {
  return db
    .query(
      `SELECT
      user_id, 
      first_name, 
      last_name, 
      email, 
      amount_earned,
      total_amount,
      date_started,
      weekly_pocket_money,
      weekly_question_number FROM users WHERE user_id = $1;`,
      [user_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return rows[0];
    });
};
