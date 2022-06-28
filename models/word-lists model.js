const { del } = require("express/lib/application");
const req = require("express/lib/request");
const db = require("../db/index");


exports.fetchWordLists = () => {
 return db.query(`SELECT * FROM spelling_lists`).then((results) => {
  //console.log(results.rows, "model")

  return results.rows 
  })
}

exports.fetchWordListsByDifficulty = (list_difficulty) => {
  console.log(list_difficulty, "model")
  return db.query(
    `SELECT * FROM spelling_lists
    WHERE spelling_lists.list_difficulty = $1;`, [list_difficulty]
    )
  .then((res) => {
   //console.log(res, "model")
 
   return res.rows
   })
 }

