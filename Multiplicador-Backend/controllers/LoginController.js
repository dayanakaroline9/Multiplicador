// controllers/LoginController.js
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuarioModel");

const loginUsuario = async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      // Verificando se o usuário existe
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      // Verificando a senha (ajuste conforme o método de validação que você usa, por exemplo, bcrypt)
      const senhaCorreta = await usuario.compararSenha(senha);  // Alteração aqui
      if (!senhaCorreta) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }
  
      // Criando o token JWT
      const token = jwt.sign(
        { id: usuario._id, email: usuario.email, role: usuario.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }  // Define o tempo de expiração do token
      );
  
      // Enviando o token como cookie para o cliente
      res.cookie('token', token, {
        httpOnly: true,  // Impede acesso via JavaScript
        secure: process.env.NODE_ENV === 'production', // Usa 'secure' apenas em produção
        maxAge: 1000 * 60 * 60 * 24,  // 1 dia de expiração
      });
  
      // Retorna uma resposta indicando que o login foi bem-sucedido
      res.status(200).json({ message: 'Login bem-sucedido' });
  
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
    }
};

// controllers/LoginController.js (Logout)
const logout = (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });
    res.json({ message: 'Logout bem-sucedido' });
};

module.exports = { loginUsuario, logout };
