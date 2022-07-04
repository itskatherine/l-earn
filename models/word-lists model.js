const { del } = require("express/lib/application");
const req = require("express/lib/request");
const db = require("../db/index");
const format = require("pg-format");

exports.fetchWordListById = (list_id) => {
  const responseObj = {};

  const queryStr = `SELECT * from all_words WHERE list_id = $1`;

  return db.query(queryStr, [list_id]).then(({ rows }) => {
    responseObj.list_difficulty = rows[0].difficulty;
    responseObj.list_name = rows[0].name;
    const wordArr = [];
    for (let i = 0; i < rows.length; i++) {
      wordArr.push(rows[i].word);
    }
    responseObj.words = wordArr;
    return responseObj;
  });
};

exports.fetchWordLists = (query) => {
  const list_difficulty = query.word_list;
  const listDifficulty = ["Easy", "Medium", "Hard", "Harder"];
  let queryStr = `SELECT * FROM spelling_lists`;
  if (query.word_list) {
    if (listDifficulty.includes(list_difficulty)) {
      queryStr += ` WHERE spelling_lists.list_difficulty = '${list_difficulty}' `;
    } else return Promise.reject({ status: 400, msg: "invalid query" });
  }
  queryStr += " ;";

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.insertWords = ({ user_id, list_id }) => {
  const isUserId = parseInt(user_id);
  if (user_id === undefined || !isUserId) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const dbQuery = db.query(
    `SELECT * FROM all_words WHERE list_id = ${list_id}`
  );
  const userIdPromise = user_id;

  return Promise.all([dbQuery, userIdPromise]).then((result) => {
    let queryRes = result[0].rows;
    let user_id = Number(result[1]);
    const wordsToAdd = queryRes;
    let wordsArr = [];
    wordsArr = wordsToAdd.map((wordObj) => {
      return [user_id, wordObj.word, wordObj.word_id, wordObj.list_id];
    });

    const wordListQueryString = format(
      `INSERT INTO user_words(user_id, word, word_id, list_id) VALUES %L RETURNING *;`,
      wordsArr
    );
    db.query(wordListQueryString).then((result) => {
      return result.rows;
    });
  });
};
