const path = require('path');
const { readFile } = require('./fs/readData');
// const { writeFile } = require('./fs/writeData');

const talkerPath = path.join(__dirname, '..', 'talker.json');

const getAllTalkers = async () => {
  const talkers = await readFile(talkerPath);
  return talkers.length === 0 ? [] : talkers;
};

module.exports = { getAllTalkers };