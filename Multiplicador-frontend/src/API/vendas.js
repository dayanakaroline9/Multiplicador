import axios from './axiosConfig'; 

async function buscarVendas(email,dataInicio,dataFim) {
  try {
    const response = await axios.get('/api/vendas', {
      params: {
        email,
        dataInicio,
        dataFim,
      }
    });

    console.log("Busca realizada com sucesso", response.data);
    return response.data; 
  } catch (error) {
    console.error('Erro ao obter vendas', error);
    return { error: "Erro ao buscar vendas" };
  }
}

async function Editar(venda) {
  try {
    const response = await axios.put(`/vendas/editar/${venda.id}`, venda);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar:", error);
    return { 
      error: error.response ? error.response.data : "Erro ao editar venda", 
      status: error.response ? error.response.status : "N/A" 
    }; 
  }
}

export { buscarVendas, Editar };
