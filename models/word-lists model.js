const { del } = require("express/lib/application");
const req = require("express/lib/request");
const db = require("../db/index");
const format = require("pg-format");




exports.fetchWordLists = (query) => {
  const list_difficulty = query.word_list
  const listDifficulty = ["Easy", "Medium", "Hard", "Harder"];
  let queryStr = `SELECT * FROM spelling_lists`;
  console.log(query.word_list)
  if (query.word_list) {
    if (listDifficulty.includes(list_difficulty)) {
      queryStr += ` WHERE spelling_lists.list_difficulty = '${list_difficulty}' `;
    } else return Promise.reject({ status: 400, msg: "invalid query" });
  }
  queryStr += " ;"
        console.log(queryStr);

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};


exports.insertWords = ({ user_id, list_id }) => {
  console.log(user_id, "userid");

  const dbQuery = db.query(
    `SELECT * FROM all_words WHERE list_id = ${list_id}`
  );
  console.log("cheese");
  const userIdPromise = user_id;
  console.log("ruhere");

  return Promise.all([dbQuery, userIdPromise]).then((result) => {
    let queryRes = result[0].rows;
    let user_id = Number(result[1]);
    const wordsToAdd = queryRes;
    let wordsArr = [];
    wordsArr = wordsToAdd.map((wordObj) => {
      return [user_id, wordObj.word, wordObj.word_id, wordObj.list_id];
    });
    console.log(wordsArr);
    const wordListQueryString = format(
      `INSERT INTO user_words(users_id, word, word_id, list_id) VALUES %L RETURNING *;`,
      wordsArr
    );
    db.query(wordListQueryString).then((result) => {
      return result.rows;
    });
  });
};

