const { del } = require("express/lib/application");
const req = require("express/lib/request");
const db = require("../db/index");

exports.insertUser = (newUser) => {
  const { first_name, last_name, email } = newUser;
  return db
    .query(
      "INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *;",
      [first_name, last_name, email]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
