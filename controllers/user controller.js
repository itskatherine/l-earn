const { insertUser } = require("../models/user model");

exports.postUser = (req, res) => {
  insertUser(req.body).then((user) => res.status(201).send({ user }));
};
