const {
  insertUser,
  fetchUserWords,
  updateAmountByUser,
  updateWeeklyByUser,
  removeUserWordListById,
  fetchUserById,
} = require("../models/user model");

exports.postUser = (req, res) => {
  insertUser(req.body).then((user) => {
    res.status(201).send({ user });
  });
};

exports.getUserWords = (req, res) => {
  fetchUserWords(req.params.user_id).then((userWords) => {
    res.status(200).send({ userWords });
  });
  // .catch((err) => {
  //   next(err);
  // });
};

exports.patchAmountByUser = (req, res, next) => {
  const { amount_earned, total_amount } = req.body;
  const { user_id } = req.params;
  console.log(user_id, "user id");
  updateAmountByUser(amount_earned, total_amount, user_id)
    .then((updatedAmounts) => {
      res.status(200).send(updatedAmounts);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchWeeklyByUser = (req, res, next) => {
  const { weekly_pocket_money, weekly_question_number } = req.body;
  const { user_id } = req.params;
  updateWeeklyByUser(weekly_pocket_money, weekly_question_number, user_id)
    .then((updatedWeekly) => {
      res.status(200).send(updatedWeekly);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteUserWordList = (req, res) => {
  const { list_id, user_id } = req.params;
  removeUserWordListById(list_id, user_id);
  res.sendStatus(204);
};

exports.getUserById = (req, res, next) => {
  const user_id = req.params.user_id;
  fetchUserById(user_id)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};
