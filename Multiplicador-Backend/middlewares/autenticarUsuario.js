const jwt = require('jsonwebtoken');

const autenticarUsuario = (req, res, next) => {
  const token = req.cookies.token;  // Obtém o token do cookie

  // Verifica se o token está presente
  if (!token) {
    return res.status(403).json({ message: "Token não encontrado. Faça login novamente." });
  }

  // Verifica a validade do token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado. Faça login novamente." });
    }

    // Armazena as informações do usuário decodificado para uso posterior
    req.user = decoded;  // "req.user" para seguir uma convenção padrão
    next();  // Passa o controle para o próximo middleware ou controller
  });
};

module.exports = autenticarUsuario;
