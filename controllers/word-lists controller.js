const { fetchWordLists, fetchWordListsByDifficulty } = require("../models/word-lists model")




exports.getWordLists = (req, res) => {
 fetchWordLists().then((wordLists) => {
  res.status(200).send({wordLists})
 })
}

exports.getWordListsByDifficulty = (req, res) => {
  const { list_difficulty } = req.query;
  console.log(req.query)
    fetchWordListsByDifficulty(list_difficulty).then((word_list) =>{
      res.status(200).send(word_list);
    });
}