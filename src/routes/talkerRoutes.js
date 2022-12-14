const { Router } = require('express');
const { getAllTalkers } = require('../utils/talkerCRUD');

const talkerRouter = Router();

talkerRouter.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(200).json(talkers);
});

module.exports = talkerRouter;