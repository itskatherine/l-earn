const { del } = require("express/lib/application");
const req = require("express/lib/request");
const db = require("../db/index");



exports.fetchWordLists = (query) => {
  const list_difficulty = query.word_list
  const listDifficulty = ["Easy", "Medium", "Hard", "Harder"];
  let queryStr = `SELECT * FROM spelling_lists`;
  console.log(query.word_list)
  if (query.word_list) {
    if (listDifficulty.includes(list_difficulty)) {
      queryStr += ` WHERE spelling_lists.list_difficulty = \'${list_difficulty}\' `;
    } else return Promise.reject({ status: 400, msg: "invalid query" });
  }
  queryStr += " ;"
        console.log(queryStr);

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
   