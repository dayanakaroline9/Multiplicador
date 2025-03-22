const mongoose = require("mongoose");

const vendaSchema = new mongoose.Schema({
  dataVenda: { type: Date, required: true },
  contrato: { type: String, required: true },
  proposta: { type: String, required: true },
  emailResponsavel: { type: String, required: true },
  valorBase: { type: Number, required: true },
  tabConvenio: { type: String, required: true },
  valorMultiplicador: { type: Number, required: true },
});

module.exports = mongoose.model("Venda", vendaSchema);
