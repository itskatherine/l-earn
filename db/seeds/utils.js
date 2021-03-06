const wordLists = require("../data/test-data/spellingListsData");

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.spelling_lists_2 = wordLists.map((wordObj) => {
  return wordObj.words.map((word) => {
    return {
      name: wordObj.name,
      difficulty: wordObj.difficulty,
      list_id: wordObj.list_id,
      word: word,
    };
  });
});

exports.convertTimestampToDate = ({ date_started, ...otherProperties }) => {
  if (!date_started) return { ...otherProperties };
  return { date_started: new Date(date_started), ...otherProperties };
};
