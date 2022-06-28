const db = require("../index.js");
const format = require("pg-format");
const { createRef, spelling_lists_2 } = require("./utils");

const spelling_list_data = spelling_lists_2;
//console.log(spelling_list_data)

const seed = async (data) => {
  const { userData, spellingListsData, allWordsData } = data;
  await db.query(`DROP TABLE IF EXISTS users CASCADE`);
  await db.query(`DROP TABLE IF EXISTS user_words`);
  await db.query(`DROP TABLE IF EXISTS all_words`);
  await db.query(`DROP TABLE IF EXISTS spelling_lists`);

  const spellingListsTablePromise = db.query(`
CREATE TABLE spelling_lists(
    list_id SERIAL PRIMARY KEY,
    list_difficulty VARCHAR NOT NULL,
    list_name VARCHAR);
    
`);

  const allWordsTablePromise = db.query(`CREATE TABLE all_words(
    word_id SERIAL PRIMARY KEY, 
    list_id INT,
    word VARCHAR,
    difficulty VARCHAR,
    name VARCHAR
);
`);

  const usersTablePromise = db.query(`CREATE TABLE users(
    users_id SERIAL PRIMARY KEY, 
    first_name VARCHAR NOT NULL, 
    last_name VARCHAR, 
    email VARCHAR, 
    pass_word VARCHAR,
    amount_earned decimal,
    total_amount decimal
);
`);

  await Promise.all([
    spellingListsTablePromise,
    allWordsTablePromise,
    usersTablePromise,
  ]);

  await db.query(`CREATE TABLE user_words(
    users_id SERIAL PRIMARY KEY REFERENCES users(users_id),
    word_id INT REFERENCES all_words(word_id) NOT NULL,
    list_id INT REFERENCES spelling_lists(list_id) NOT NULL,
    word VARCHAR,
    used BOOLEAN
);
`);

  const insertUsersQueryStr = format(
    `INSERT INTO users (first_name, last_name, email, pass_word, amount_earned, total_amount) VALUES %L RETURNING *;`,
    userData.map(
      ({
        first_name,
        last_name,
        email,
        pass_word,
        amount_earned,
        total_amount,
      }) => [
        first_name,
        last_name,
        email,
        pass_word,
        amount_earned,
        total_amount,
      ]
    )
  );
  const insertSpellingListsQueryStr = format(
    `INSERT INTO spelling_lists(list_difficulty, list_name) VALUES %L RETURNING *;`,
    spellingListsData.map(({ difficulty, name }) => [difficulty, name])
  );
  const spellingListRows = db
    .query(insertSpellingListsQueryStr)
    .then((result) => result.rows);

  //This is how I've formatted the word data, may want to refactor
  //into something a bit cleaner
  const allWordData = [];
  for (let i = 0; i < spelling_list_data.length; i++) {
    for (let j = 0; j < spelling_list_data[i].length; j++) {
      let currentWord = spelling_list_data[i][j];
      allWordData.push([
        currentWord.word,
        currentWord.list_id,
        currentWord.difficulty,
        currentWord.name,
      ]);
    }
  }

  const allWordsQueryStr = format(
    `INSERT INTO all_words (word, list_id, difficulty, name) VALUES %L RETURNING *;`,
    allWordData
  );

  const allWordsRows = db.query(allWordsQueryStr).then((result) => result.rows);

  return db.query(insertUsersQueryStr).then((result) => result.rows);

  //const userLookup = createRef(userRows, "user_id", "first_name");
};

module.exports = seed;
