const { Router } = require('express');
const validateAge = require('../middlewares/isValidAge');
const validateName = require('../middlewares/isValidName');
const { validateTalk, validateDate, validateRate } = require('../middlewares/isValidTalk');
const validateToken = require('../middlewares/isValidToken');
const { getAllTalkers, getTalkerById, deleteTalkerById,
  addNewTalker } = require('../utils/talkerCRUD');

const talkerRouter = Router();

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

talkerRouter.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);

  return talker.message ? res.status(404).json(talker) : res.status(200).json(talker);
});

talkerRouter.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const response = await deleteTalkerById(id);
  return response && res.status(200).json();
});

module.exports = talkerRouter;