const { Router } = require('express');
const generateToken = require('../utils/generateToken');

const loginRouter = Router();

loginRouter.post('/login', (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = loginRouter;