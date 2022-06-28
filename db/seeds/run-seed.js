const devData = require("../data/dev-data/index.js");
const seed = require("./seed.js");
db = require("../index")

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
