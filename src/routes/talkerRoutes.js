const { Router } = require('express');
const validateAge = require('../middlewares/isValidAge');
const validateName = require('../middlewares/isValidName');
const { validateTalk, validateDate, validateRate } = require('../middlewares/isValidTalk');
const validateToken = require('../middlewares/isValidToken');
const { getAllTalkers, getTalkerById, deleteTalkerById,
  addNewTalker, editTalkerById, searchTalkers } = require('../utils/talkerCRUD');

const talkerRouter = Router();

talkerRouter.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await searchTalkers(q);
  return res.status(200).json(talkers);
});

talkerRouter.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  return res.status(200).json(talkers);
});

talkerRouter.post('/talker', validateToken,
  validateName, validateAge, validateTalk, validateRate, validateDate, async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkers = await getAllTalkers();
    const newTalker = {
      age: Number(age),
      id: talkers.length + 1,
      name,
      talk: {
        watchedAt,
        rate: Number(rate),
      },
    };
  await addNewTalker(newTalker);
  return res.status(201).json(newTalker);
});

talkerRouter.put('/talker/:id', validateToken, validateName, validateAge,
  validateTalk, validateRate, validateDate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talker = {
    id: Number(id),
    name,
    age: Number(age),
    talk: {
      watchedAt,
      rate: Number(rate),
    },
  };
  await editTalkerById(id, talker);
  return res.status(200).json(talker);
});

talkerRouter.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);

  return talker.message ? res.status(404).json(talker) : res.status(200).json(talker);
});

talkerRouter.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const response = await deleteTalkerById(id);
  return response && res.status(204).json();
});

module.exports = talkerRouter;