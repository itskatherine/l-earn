const express = require("express");
const cors = require("cors");
const app = express();
const {
  getWordLists,
  postWords
  } = require("./controllers/word-lists controller");

app.use(cors());
app.use(express.json());

app.get("/api/word-lists", getWordLists);
app.post("/api/users/:user_id/:list_id", postWords)

console.log("app")
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "invalid user" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status === 404 || 400) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.sendStatus(500);
});


module.exports = app;

