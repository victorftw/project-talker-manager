const validateDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const response = regex.test(watchedAt);
  return !response ? res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }) : next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  return rate < 1 || rate > 5 || !Number.isInteger(rate) ? res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }) : next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  return !talk ? res.status(400)
    .json({ message: 'O campo "talk" é obrigatório' }) : next();
};

module.exports = { validateTalk, validateDate, validateRate };