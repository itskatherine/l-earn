 let poo = {user_word_id: 1,
    word_id: 1,
    users_id INT REFERENCES users(users_id),
    list_id INT REFERENCES spelling_lists(list_id) NOT NULL,
    word VARCHAR,
 used BOOLEAN}