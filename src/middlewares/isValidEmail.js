const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const regexValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regexValidEmail.test(email) ? res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' })
  : next();
};

exports.validateEmail = validateEmail;
