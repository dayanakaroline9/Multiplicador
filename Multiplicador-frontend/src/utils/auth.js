
export function isLoggedIn() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  console.log("Verificando se usuário está logado:", token);
  return !!token; // Retorna true se o token existir
}

  