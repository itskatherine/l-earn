const express = require("express");
const cors = require("cors");
const app = express();
const {
  getWordLists,
  } = require("./controllers/word-lists controller");

app.use(cors());
app.use(express.json());

app.get("/api/word-lists", getWordLists);
// app.get("/api/word-lists/:List_difficulty", getWordListsByDifficulty);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.status === 404 || 400) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

module.exports = app;

