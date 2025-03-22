import axios from './axiosConfig'; 

//Realiza requisição de login
async function login(email, senha) {
  try {
    const response = await axios.post('/api/login', { email, senha });

    // Se a resposta for bem-sucedida, retorna os dados do usuário
    if (response.data.message) {
      return { error: response.data.message }; // Exibe mensagem caso não haja token
    }

    return response.data;
  } catch (error) {
    console.error("Erro no login:", error);
    return { 
      error: error.response ? error.response.data.message : "Erro desconhecido",
      status: error.response ? error.response.status : "N/A"
    };
  }
}


const logout = async () => {
  try {
    // Enviar a requisição de logout para o backend
    await axios.post("/api/logout");

    // Limpar os dados de sessão (token, informações do usuário, etc.)
    localStorage.removeItem("token");  // Caso use localStorage
    sessionStorage.removeItem("token");  // Caso use sessionStorage

    // Redirecionar ou realizar outra ação após o logout, como redirecionar para a página de login
    window.location.href = '/login';  // Exemplo de redirecionamento
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

export { login, logout };
