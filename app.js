const express = require("express");
const cors = require("cors");
const app = express();
const {
  getWordLists,
  postWords,
} = require("./controllers/word-lists controller");
const {
  postUser,
  getUserWords,
  patchAmountByUser,
  deleteList,
} = require("./controllers/user controller");

app.use(cors());
app.use(express.json());

app.get("/api/word-lists", getWordLists);
app.post("/api/users/:user_id/:list_id", postWords);
app.post("/api/users/:user_id", postUser);
app.get("/api/users/:user_id/word_bank", getUserWords);
app.patch("/api/users/:user_id", patchAmountByUser);
app.delete("/api/users/:user_id/:list_id", deleteList);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use((err, req, res, next) => {
  const badRequestCodes = ["22P02", "23502", "42601"];
  const notFoundCodes = ["23503"];
  if (badRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else if (notFoundCodes.includes(err.code)) {
    res.status(404).send({ msg: "Not Found" });
  } else next(err);
});

// app.use((err, req, res, next) => {
//   if (err.status === 404 || 400) {
//     res.status(err.status).send({ msg: err.msg });
//   } else {
//     next(err);
//   }
// });

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

module.exports = app;
