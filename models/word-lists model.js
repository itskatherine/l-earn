const { del } = require("express/lib/application");
const req = require("express/lib/request");
const db = require("../db/index");



exports.fetchWordLists = (query) => {
  const list_difficulty = query.word_list
  const listDifficulty = ["Easy", "Medium", "Hard", "Harder"];
  let queryStr = `SELECT * FROM spelling_lists`;
  if (query) {
    if (listDifficulty.includes(list_difficulty)) {
      queryStr += ` WHERE spelling_lists.list_difficulty = 'Easy';`;
    }
  }
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
