
export function isLoggedIn() {
  // Verifique se o token está presente no localStorage ou sessionStorage
  return !!localStorage.getItem('token');  // Retorna true se o token existir
}
  