import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3000',  // Altere para a URL do seu back-end
  withCredentials: true,  // Garantir que os cookies sejam enviados
});

export default axiosConfig;
