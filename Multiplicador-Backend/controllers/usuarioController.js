// controllers/usuarioController.js
const Usuario = require("../models/usuarioModel");

const cadastrarUsuario = async (req, res) => {
  try {
    const { email, tipo, senha } = req.body;

    // Validar os dados aqui (como verificar se o e-mail já está cadastrado)

    const novoUsuario = new Usuario({
      email,
      tipo,
      senha
    });

    await novoUsuario.save();

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao cadastrar usuário", error: err });
  }
};

// Buscar usuários
const buscarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar usuários", error: err });
  }
};

module.exports = { cadastrarUsuario, buscarUsuarios };
