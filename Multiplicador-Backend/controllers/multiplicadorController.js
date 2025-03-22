// controllers/multiplicadorController.js
const Venda = require("../models/vendaModel");

// Cadastrar venda
const cadastrarVenda = async (req, res) => {
  try {
    const venda = new Venda(req.body);
    await venda.save();
    res.status(201).json(venda);
  } catch (err) {
    res.status(500).json({ message: "Erro ao cadastrar venda", error: err });
  }
};

// controllers/multiplicadorController.js
const obterVendas = async (req, res) => {
  try {
    const { email, dataInicio, dataFim } = req.query;  // Recebe os filtros da requisição

    // Verificando o tipo de usuário logado, você deve ter um middleware que passe as informações do usuário
    const usuario = req.user;  // Supondo que o middleware de autenticação já tenha setado isso

    // Filtrando as vendas de acordo com o tipo de usuário
    const filtro = {
      ...(usuario.role === 'admin' ? {} : { emailResponsavel: usuario.email }),  // Se não for admin, filtra por e-mail
      dataVenda: { $gte: new Date(dataInicio), $lte: new Date(dataFim) },  // Filtra pela data
    };

    // Buscando as vendas com os filtros aplicados
    const vendasFiltradas = await Venda.find(filtro);

    // Respondendo com as vendas encontradas
    res.status(200).json({ vendas: vendasFiltradas });
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    res.status(500).json({ error: 'Erro ao buscar vendas' });
  }
};


// controllers/multiplicadorController.js
const editarVenda = async (req, res) => {
  try {
    const { id } = req.params;  // Pega o ID da venda
    const vendaAtualizada = req.body;  // Dados para atualizar

    // Validação dos dados da venda
    const erroValidacao = validarDadosVenda(vendaAtualizada);  // Utilize a mesma função de validação
    if (erroValidacao) {
      return res.status(400).json({ message: erroValidacao });
    }

    const venda = await Venda.findByIdAndUpdate(id, vendaAtualizada, { new: true });

    if (!venda) {
      return res.status(404).json({ message: "Venda não encontrada" });
    }

    res.status(200).json(venda);  // Retorna a venda atualizada
  } catch (err) {
    res.status(500).json({ message: "Erro ao editar venda", error: err.message });
  }
};

module.exports = { cadastrarVenda, obterVendas, editarVenda };


