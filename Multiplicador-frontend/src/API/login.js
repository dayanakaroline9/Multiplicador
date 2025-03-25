import axios from './axiosConfig'; 

// login.js (frontend)
import Cookies from 'js-cookie';

async function login(email, senha) {
  try {
    const response = await axios.post('/api/login', { email, senha }, { withCredentials: true });

    // Se o login for bem-sucedido, salva o token no cookie
    if (response.data.message === 'Login bem-sucedido') {
      // Armazenando o token no cookie
      Cookies.set('token', response.data.token, { expires: 1 });  // Expira em 1 dia
      console.log("Login bem-sucedido, redirecionando...");
      return { message: 'Login bem-sucedido' };
    }

    return { error: response.data.message };
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
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

export { login, logout };
