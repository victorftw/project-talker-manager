const path = require('path');
const { readFile } = require('./fs/readData');
// const { writeFile } = require('./fs/writeData');

const talkerPath = path.join(__dirname, '..', 'talker.json');

const getAllTalkers = async () => {
  const talkers = await readFile(talkerPath);
  return talkers.length === 0 ? [] : talkers;
};

const getTalkerById = async (id) => {
  const talkers = await getAllTalkers();
  const result = talkers.find((talker) => talker.id === Number(id));
  const errorMessage = {
    message: 'Pessoa palestrante não encontrada',
  };

  return result === undefined ? errorMessage : result;
};

module.exports = { getAllTalkers, getTalkerById };