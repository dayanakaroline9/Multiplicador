// middlewares/autenticarUsuario.js
const jwt = require('jsonwebtoken');

const autenticarUsuario = (req, res, next) => {
  const token = req.cookies.token;

  // Verifica se o token está presente
  if (!token) {
    return res.status(403).json({ message: "Token não encontrado" });
  }

  // Verifica a validade do token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    // Armazena as informações do usuário decodificado para uso posterior
    req.user = decoded;  // Usando "req.user" para consistência com o resto do código
    next();  // Segue para o próximo middleware ou controller
  });
};

module.exports = autenticarUsuario;
