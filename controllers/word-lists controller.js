const {
  fetchWordLists,
  insertWords,
  fetchWordListsById,
} = require("../models/word-lists model");

exports.getWordLists = (req, res, next) => {
  const list_difficulty = req.query;

  fetchWordLists(list_difficulty)
    .then((word_list) => {
      res.status(200).send(word_list);
    })
    .catch((err) => {
      next(err);
    });
};


exports.getWordListsById = (req, res, next) => {
  const id = req.params.list_id
console.log(id)
  fetchWordListsById(id)
    .then((word_list) => {
      res.status(200).send(word_list);
    })
    .catch((err) => {
      next(err);
    });
};










exports.postWords = (req, res, next) => {
  const params = req.params;
  insertWords(params)
    .then(() => {
      res.status(201).send({ msg: "List added" });
    })
    .catch((err) => {
      next(err);
    });
};
