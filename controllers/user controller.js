const {
  insertUser,
  fetchUserWords,
  updateAmountByUser,
  removeListById,
} = require("../models/user model");

exports.postUser = (req, res) => {
  insertUser(req.body).then((user) => res.status(201).send({ user }));
};

exports.getUserWords = (req, res) => {
  fetchUserWords(req.params.user_id).then((userWords) =>
    res.status(200).send({ userWords })
  );
};

exports.patchAmountByUser = (req, res, next) => {
  const { amount_earned, total_amount } = req.body;
  const { user_id } = req.params;
  updateAmountByUser(amount_earned, total_amount, user_id)
    .then((updatedAmounts) => {
      res.status(200).send(updatedAmounts);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteList = (req, res) => {
  const { list_id } = req.params;
  removeListById(res);
  res.text = "test";
  console.log(res.text);
  res.sendStatus(204);
};
