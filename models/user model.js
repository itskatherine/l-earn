const { del } = require("express/lib/application");
const req = require("express/lib/request");
const db = require("../db/index");
const format = require("pg-format");

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

 
exports.fetchUserWords = (user_id) => {


  return  db
    .query("SELECT * FROM user_words WHERE users_id = 1;")
    .then((queryRes) => {
 console.log(queryRes.rows);
 return queryRes.rows;
    });
 
}