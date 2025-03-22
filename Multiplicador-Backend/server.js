const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importar as rotas de login (se você tiver uma rota específica de login)
const multiplicadorRoutes = require("./routes/multiplicadorRoutes");

const app = express();

// Middleware

const corsOptions = {
  origin: 'http://localhost:9000', // URL do frontend
  credentials: true, // Permite enviar cookies com a requisição
};


app.use(cors(corsOptions));
app.use(express.json());

// Usar a rota de login (ou outras rotas que você tenha)
app.use("/api", multiplicadorRoutes); 

// Rota de logout - Fora de `multiplicadorRoutes`
app.post('/api/logout', (req, res) => {
  // Remover o cookie de autenticação
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });

  // Enviar resposta de sucesso
  res.json({ message: 'Logout bem-sucedido' });
});

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB! 🚀"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Iniciar o servidor
const PORT = process.env.PORT || 3000; // Definindo o valor da porta

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
