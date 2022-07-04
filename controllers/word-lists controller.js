const {
  fetchWordLists,
  insertWords,
  fetchWordListById,
} = require("../models/word-lists model");

exports.getWordListById = (req, res) => {
  const { list_id } = req.params;
  fetchWordListById(list_id).then((listObj) => {
    res.status(200).send(listObj);
  });
};

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
