const { Router } = require('express');
const validateEmail = require('../middlewares/isValidEmail');
const validatePassword = require('../middlewares/isValidPassword');
const generateToken = require('../utils/generateToken');

const loginRouter = Router();

loginRouter.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = loginRouter;