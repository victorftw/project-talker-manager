const path = require('path');
const { readFile } = require('./fs/readData');
const { writeFile } = require('./fs/writeData');

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

const addNewTalker = async (talker) => {
  const talkers = await getAllTalkers();
  talkers.push(talker);
  const response = await writeFile(talkers, talkerPath);
  return response;
};

const deleteTalkerById = async (id) => {
  const talkers = await getAllTalkers();
  const newTalkersList = talkers.filter((talker) => talker.id !== Number(id));
  const response = await writeFile(newTalkersList, talkerPath);
  return response;
};

const editTalkerById = async (id, editTalker) => {
  const talkersList = await getAllTalkers();
  const index = talkersList.findIndex((talker) => talker.id === Number(id));
  talkersList[index] = { ...editTalker };
  const response = await writeFile(talkersList, talkerPath);
  return response;
};

module.exports = { getAllTalkers, getTalkerById, deleteTalkerById, addNewTalker, editTalkerById };