DROP DATABASE IF EXISTS l_earn;
CREATE DATABASE l_earn;

\c l_earn;

CREATE TABLE spelling_lists(
    list_id SERIAL PRIMARY KEY,
     list_difficulty VARCHAR NOT NULL,
    list_name VARCHAR
);
SELECT * FROM spelling_lists;

CREATE TABLE all_words(
    word_id SERIAL PRIMARY KEY, 
    list_id INT REFERENCES spelling_lists(list_id) NOT NULL, 
    word VARCHAR
);
--SELECT * FROM all_words;












CREATE TABLE users(
    users_id SERIAL PRIMARY KEY, 
    first_name VARCHAR NOT NULL, 
    last_name VARCHAR, 
    email VARCHAR, 
    pass_word VARCHAR,
    amount_earned INT,
    total_amount INT
);
--SELECT * FROM users;

CREATE TABLE words_bank(
    users_id INT REFERENCES users(users_id),
    word_id INT REFERENCES all_words(word_id),
    used BOOLEAN
);
--SELECT * FROM words_bank;






-- INSERT INTO spelling_lists
-- (list_difficulty, list_name)
-- VALUES 
-- ('Easy', 'Grade 1'),
-- ('Medium', 'Grade 2');

---SELECT * FROM spelling_lists;

-- -- INSERT INTO all_words(list_id, word)
-- -- VALUES 
-- -- (1, "hello");
