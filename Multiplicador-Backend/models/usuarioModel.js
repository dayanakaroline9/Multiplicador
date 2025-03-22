const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  tipo: {
    type: String,
    enum: ["admin", "usuario"],
    required: true
  },
  senha: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Antes de salvar, criptografar a senha
usuarioSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

// Método para comparar a senha fornecida com a senha criptografada
usuarioSchema.methods.compararSenha = async function(senhaFornecida) {
  return await bcrypt.compare(senhaFornecida, this.senha);
};

module.exports = mongoose.model("Usuario", usuarioSchema);
