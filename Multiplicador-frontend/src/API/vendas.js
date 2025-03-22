import axios from './axiosConfig'; 

async function buscarVendas() {
  try {
    const response = await axios.get('/api/vendas');
    console.log("Busca realizada com sucesso"); 
    return response.data // Vendas retornadas pelo backend
  } catch (error) {
    console.error('Erro ao obter vendas', error);
  }
};

async function Editar(venda) {
  try {
    const response = await axios.put(`/vendas/editar/${venda.id}`, venda);
    return response.data; // Retorna os dados editados ou resposta do backend
  } catch (error) {
    console.error("Erro ao editar:", error);
    return { 
      error: error.response ? error.response.data : "Erro ao editar venda", 
      status: error.response ? error.response.status : "N/A" 
    }; // Retorna o erro com a mensagem e o status HTTP
  }
}

export { buscarVendas, Editar };
