<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Cabeçalho -->
    <q-header elevated>
      <q-toolbar>
         <!-- Logo ou conteúdo à esquerda (se houver) -->
        <q-space />
        <!-- Botão de alternar tema no canto direito -->
        <q-btn flat dense icon="brightness_6" @click="toggleTheme" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      // Alterna entre o tema claro e escuro
      this.$q.dark.toggle();
    }
  }
};
</script>
