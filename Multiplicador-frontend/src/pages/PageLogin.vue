<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-lg shadow-2 q-gutter-md login-card" style="width: 100%; max-width: 360px;">
      <!-- Logo -->
      <div class="flex justify-center q-mb-md">
        <img
          alt="Logo"
          src="~assets/quasar-logo-vertical.svg"
          style="width: 100px; height: 100px"
        />
      </div>

      <!-- Formulário de login -->
      <q-form class="full-width" @submit.prevent="fazerLogin">
        <q-input
          filled
          v-model="email"
          label="Email"
          type="email"
          class="q-mb-md"
        />
        <q-input
          filled
          v-model="password"
          label="Senha"
          type="password"
          class="q-mb-md"
        />
        
        <q-btn
          label="Entrar"
          color="primary"
          class="full-width"
          type="submit"
          :loading="loading"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { login } from 'src/API/login'
//import { buscarVendas } from 'src/API/vendas'


const email = ref('')
const password = ref('')
const loading = ref(false)
const $q = useQuasar()
const router = useRouter()

// Lógica de login
async function fazerLogin() {
  loading.value = true

  try {
    // Chama a API de login
    const response = await login(email.value, password.value);
    console.log("Resposta do login:", response);


    // Se houver erro no login, exibe a notificação com a mensagem
    if (response.error) {
      $q.notify({ type: 'negative', message: response.error });
      return;
    }

    // Salva o token no localStorage (ou sessionStorage)
    localStorage.setItem("token", response.token); 

    /*const userEmail = email.value;
    const hoje = new Date();
    const dataInicio = new Date();
    dataInicio.setDate(hoje.getDate() - 30); // 30 dias atrás

    // Formatando datas para string ISO (caso necessário para o backend)
    const dataInicioISO = dataInicio.toISOString().split('T')[0]; // YYYY-MM-DD
    const dataFimISO = hoje.toISOString().split('T')[0]; // YYYY-MM-DD

    // Chama a função buscarVendas
    console.log("Chamando buscarVendas...");
    const venda = await buscarVendas(userEmail, dataInicioISO, dataFimISO);
    console.log("Resposta de buscarVendas:", venda);*/

    // Exibe uma notificação de sucesso
    $q.notify({ type: 'positive', message: 'Login bem-sucedido!' })

    // Redireciona para a página Home após login bem-sucedido
    console.log("Redirecionando para /Home...");
    router.push('/Home');


  } catch (error) {
  console.error("Erro no login:", error);
  $q.notify({ type: 'negative', message: 'Erro ao fazer login. Tente novamente.' });
  }finally {
    loading.value = false
  }
}
</script>
