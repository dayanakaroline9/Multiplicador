const express = require("express");
const router = express.Router();
const Venda = require("../models/vendaModel");
const { cadastrarUsuario } = require("../controllers/usuarioController");
const { loginUsuario, logout } = require("../controllers/LoginController");
const { cadastrarVenda, obterVendas, editarVenda } = require("../controllers/multiplicadorController"); 
const autenticarUsuario = require('../middlewares/autenticarUsuario');

// Rota para cadastrar um novo usuário
router.post("/cadastrar-usuario", cadastrarUsuario);
router.post("/login", loginUsuario);
// routes/multiplicadorRoutes.js
router.post('/logout', logout);  // Rota de logout

// Rota para cadastrar a venda
router.post("/venda", autenticarUsuario, cadastrarVenda);

// Rota para listar as vendas
router.get("/vendas", autenticarUsuario, obterVendas);  

// Rota para editar uma venda
router.put("/vendas/editar/:id", autenticarUsuario, editarVenda);  // Rota para edição de vendas

// Rota protegida de exemplo
router.get('/dados-protegidos', autenticarUsuario, (req, res) => {
  res.status(200).json({ message: 'Acesso autorizado', user: req.user });
});

module.exports = router;

