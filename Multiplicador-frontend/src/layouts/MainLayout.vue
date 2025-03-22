<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- Logo à esquerda -->
        <q-img src="../../public/icons/favicon-128x128.png" width="50px" height="50px" contain class="q-mr-md" />

        <q-space />
        
        <!-- Nome do usuário e botão de sair à direita -->
        <div class="row items-center">
          <div class="text-h6 q-mr-md">{{ userName }}</div>
          <q-btn flat dense color="white" icon="logout" @click="sair" class="q-mr-md" />
          <!-- Botão para alternar o tema -->
          <q-btn flat dense color="white" icon="brightness_6" @click="toggleTheme" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { logout } from 'src/API/login';

export default {
  data() {
    return {
      userName: "Name User"
    };
  },
  methods: {
    async sair() {
      try {
        await logout(); // Chama a função de logout
        this.$router.push("/login"); // Redireciona para a página de login após o logout
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    },
    toggleTheme() {
      // Alterna entre o tema claro e escuro
      this.$q.dark.toggle();
    }
  }
};
</script>
