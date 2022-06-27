const db = require("../index.js");
const format = require("pg-format");
const {createRef} = require("./utils")

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
    list_id INT REFERENCES spelling_lists(list_id) NOT NULL, 
    word VARCHAR
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

  return db
    .query(insertUsersQueryStr)
    .then((result) => result.rows)
    .then((result) => console.log(result));
  

  
  //const userLookup = createRef(userRows, "user_id", "first_name");
};




module.exports = seed