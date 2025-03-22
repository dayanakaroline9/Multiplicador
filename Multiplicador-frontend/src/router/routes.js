import { isLoggedIn } from 'src/utils/auth';  // Importa a função que verifica se o usuário está logado

const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageLogin.vue') }
    ]
  },

  {
    path: '/Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageAdmin.vue') }
    ],
    // Protege a rota /Home
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        next(); // Usuário logado, permite o acesso
      } else {
        next('/login'); // Usuário não logado, redireciona para o login
      }
    }
  },

  // Sempre deixe isso por último, mas você também pode removê-lo
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
