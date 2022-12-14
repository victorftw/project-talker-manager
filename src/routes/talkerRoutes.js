const { Router } = require('express');
const { getAllTalkers, getTalkerById } = require('../utils/talkerCRUD');

const talkerRouter = Router();

talkerRouter.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(200).json(talkers);
});

talkerRouter.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);

  return talker.message ? res.status(404).json(talker) : res.status(200).json(talker);
});

module.exports = talkerRouter;