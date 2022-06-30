const { insertUser, fetchUserWords } = require("../models/user model");

exports.postUser = (req, res) => {
  insertUser(req.body).then((user) => res.status(201).send({ user }));
};

exports.getUserWords = (req, res) => {
  console.log(req.params)
  fetchUserWords(req.params.user_id).then((userWords) =>
    res.status(200).send({ userWords })
  );
}