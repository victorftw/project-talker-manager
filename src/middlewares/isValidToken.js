const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  return (authorization.length !== 16) ? res.status(401)
    .json({ message: 'Token inválido' }) : next();
};

module.exports = validateToken;