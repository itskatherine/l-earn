const { fetchWordLists, fetchWordListsByDifficulty } = require("../models/word-lists model")






exports.getWordLists = (req, res, next) => {

  const list_difficulty  = req.query;

  fetchWordLists(list_difficulty)
    .then((word_list) => {
      res.status(200).send(word_list);
    })
    .catch((err) => {
      next(err);
    });
}