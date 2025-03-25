<template>
  <q-page class="q-pa-md">
    <!-- Filtros -->
    <div class="q-pa-md q-mb-md">
      <q-form class="row q-gutter-md justify-start items-center">
        <div class="col-12 col-md-3 text-center text-h6">Dashboard</div>

        <q-input filled v-model="filtroEmail" label="E-mail do Responsável" class="col-12 col-md-3" v-if="usuarioAtual.tipo == 'admin'" />

        <q-input filled v-model="dataInicio" label="Data de Início" type="date" class="col-12 col-md-2" />
        <q-input filled v-model="dataFim" label="Data de Fim" type="date" class="col-12 col-md-2" />

        <q-btn label="Buscar" color="primary" class="col-12 col-md-1" @click="carregarDados" />
      </q-form>
    </div>
    <q-spinner v-if="carregando" size="50px" color="primary" />

    <!-- Cards de métricas -->
    <div class="row q-gutter-md q-mb-md justify-evenly">
      <q-card class="col-12 col-md-2 q-pa-md bg-cyan-4 text-center">
        <div class="text-h6">Total de Vendas</div>
        <div class="text-h5">{{ formatarMoeda(totalVendas) }}</div>
      </q-card>
      <q-card class="col-12 col-md-2 q-pa-md bg-pink-4 text-center">
        <div class="text-h6">Quantidade de Vendas</div>
        <div class="text-h5">{{ qtdVendas }}</div>
      </q-card>
      <q-card class="col-12 col-md-2 q-pa-md bg-blue-4 text-center">
        <div class="text-h6">Ticket Médio</div>
        <div class="text-h5">{{ formatarMoeda(ticketMedio) }}</div>
      </q-card>
      <q-card
        :class="[ 'col-12', 'col-md-2', 'q-pa-md', 'text-center', getColorClass(metaPercentual) ]"
      >
        <div class="text-h6">Meta</div>
        <div class="text-h5">{{ formatarMoeda(meta) }} ({{ metaPercentual }}%)</div>
      </q-card>
    </div>

    <!-- Tabela -->
    <q-table :rows="vendasFiltradas" :columns="colunas" row-key="id" dense class="q-ma-lg">
      <template v-slot:body-cell-dataVenda="props">
        <q-td :props="props">
          {{ formatarData(props.row.dataVenda) }}
        </q-td>
      </template>

      <template v-slot:body-cell-editar="props">
        <q-td :props="props">
          <q-btn icon="edit" color="primary" dense @click="editarVenda(props.row)" />
        </q-td>
      </template>
    </q-table>

    <!-- Diálogo de edição -->
    <q-dialog v-model="dialogEditar">
      <q-card class="q-pa-md" style="width: 100%; max-width: 500px">
        <q-card-section>
          <div class="text-h6">Editar Venda</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input filled v-model="vendaEdit.dataVenda" label="Data da Venda" type="date" />
          <q-input filled v-model="vendaEdit.contrato" label="Contrato" />
          <q-input filled v-model="vendaEdit.proposta" label="Proposta" />
          <q-input filled v-model="vendaEdit.emailResponsavel" label="E-mail do Responsável" :disable="usuarioAtual.tipo !== 'admin'" />
          <q-input filled v-model="vendaEdit.dataAverbacao" label="Data de Averbação" type="date" />
          <q-input filled v-model="vendaEdit.valorBase" label="Valor Base" type="number" />
          <q-input filled v-model="vendaEdit.valorFinanciado" label="Valor Financiado" type="number" />
          <q-input filled v-model="vendaEdit.tabConvenio" label="Tab. Convênio (%)" type="number" />
          <q-input filled v-model="vendaEdit.valorMultiplicador" label="Valor Multiplicador" type="number" />
          <q-select filled v-model="vendaEdit.status" :options="statusOptions" label="Status" />
          <q-input filled v-model="vendaEdit.valorParcela" label="Valor Parcela" type="number" />
          <q-input filled v-model="vendaEdit.valorDivida" label="Valor Dívida" type="number" />
          <q-input filled v-model="vendaEdit.prazo" label="Prazo" type="number" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="negative" flat @click="dialogEditar = false" />
          <q-btn label="Salvar" color="primary" @click="salvarEdicaoVenda" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>


<script setup>
import { ref} from "vue";
import { buscarVendas, Editar } from "src/API/vendas";

import Cookies from 'js-cookie'; 

const usuarioAtual = ref({
  tipo: 'admin',  // ou o valor que você tem para o tipo de usuário
  email: Cookies.get('user_email') || '', // Recupera o email do cookie
});

const totalVendas= 0;
const vendasFiltradas = ref([]);

const meta = 0;

// Filtros
const filtroEmail = ref(usuarioAtual.value.tipo === "admin" ? "" : usuarioAtual.value.email);
const dataInicio = ref("");
const dataFim = ref("");
const ticketMedio = 0;
const metaPercentual = 0;
const qtdVendas =0;

const colunas = [
  { name: 'dataVenda', label: 'Data de Venda', align: 'left', field: 'dataVenda', sortable: true },
  { name: 'contrato', label: 'Contrato', align: 'left', field: 'contrato', sortable: true },
  { name: 'proposta', label: 'Proposta', align: 'left', field: 'proposta', sortable: true },
  { name: 'emailResponsavel', label: 'E-mail do Responsável', align: 'left', field: 'emailResponsavel', sortable: true },
  { name: 'valorBase', label: 'Valor Base', align: 'left', field: 'valorBase', sortable: true },
  { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
  // Adicione mais colunas conforme necessário
];


// Função para formatar valores em moeda
const formatarMoeda = (valor) => {
  if (!valor) return "R$ 0,00";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

//cores do card de meta dependendo do percentual
const getColorClass = (percentual) => {
  if (percentual >= 100) return "bg-green-4";
  if (percentual >= 75) return "bg-yellow-4";
  if (percentual >= 50) return "bg-orange-4";
  return "bg-red-4";
};


const carregando = ref(false);

const carregarDados = async () => {
  carregando.value = true;

  if (!filtroEmail.value && !dataInicio.value && !dataFim.value) {
    console.log("Por favor, preencha ao menos um filtro.");
    carregando.value = false;
    return;
  }

  try {
    const resposta = await buscarVendas(filtroEmail.value, dataInicio.value, dataFim.value);

    if (resposta.error) {
      console.error("Erro ao buscar vendas:", resposta.error);
      carregando.value = false;
      return;
    }

    // Supondo que resposta.vendas seja um array de objetos, você pode processá-lo assim:
    vendasFiltradas.value = resposta.vendas.map(venda => ({
      id: venda.id,
      dataVenda: venda.dataVenda,
      contrato: venda.contrato,
      proposta: venda.proposta,
      emailResponsavel: venda.emailResponsavel,
      dataAverbacao: venda.dataAverbacao,
      valorBase: venda.valorBase,
      valorFinanciado: venda.valorFinanciado,
      tabConvenio: venda.tabConvenio,
      valorMultiplicador: venda.valorMultiplicador,
      status: venda.status,
      valorParcela: venda.valorParcela,
      valorDivida: venda.valorDivida,
      prazo: venda.prazo,
    }));

    meta.value = resposta.meta || '';

  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }

  carregando.value = false;
};


// Edição de vendas
const dialogEditar = ref(false);
const vendaEdit = ref({});
const statusOptions = ["Pago", "Confirmado", "Cancelado"];

const editarVenda = (venda) => {
  dialogEditar.value = true;

  vendaEdit.value = {
    id: venda.id || null,
    dataVenda: venda.dataVenda || "",
    contrato: venda.contrato || "",
    proposta: venda.proposta || "",
    emailResponsavel: venda.emailResponsavel || "",
    dataAverbacao: venda.dataAverbacao || "",
    valorBase: venda.valorBase || 0,
    valorFinanciado: venda.valorFinanciado || 0,
    tabConvenio: venda.tabConvenio || "",
    valorMultiplicador: venda.valorMultiplicador || 0,
    status: venda.status || "Confirmado",  
    valorParcela: venda.valorParcela || 0,
    valorDivida: venda.valorDivida || 0,
    prazo: venda.prazo || 0,
  };

  
};


const salvarEdicaoVenda = async () => {
  const resultado = await Editar(vendaEdit.value);  // Corrigido para passar vendaEdit.value
  if (resultado.error) {
    console.log("Erro ao editar venda:", resultado.error);
  } else {
    console.log("Venda editada com sucesso!", resultado);
    dialogEditar.value = false;  // Fechar o diálogo após a edição ser bem-sucedida
    carregarDados();  // Recarregar os dados para refletir as mudanças
  }
};
</script>
