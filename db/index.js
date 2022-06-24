const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require('dotenv').config({
    path: `${__dirname}/../.env.${ENV}`
});

//console.log(process.env.PGDATABASE, "<<< PGDATABASE");
//console.log(process.env.NODE_ENV, "<<< NODE_ENV");

if (!process.env.PGDATABASE) {
    throw new Error("No PGDATABASE set up");
}

module.exports = new Pool();