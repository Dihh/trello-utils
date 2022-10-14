<script lang="ts" setup>
import Search from "@/components/shared/search.vue";

import router from "@/router";
import M from "materialize-css";
import { onMounted, ref } from "vue";

const analises = ref([]) as any;

onMounted(() => {
  M.AutoInit();
  const systemSavedsAnalises = localStorage.analises || "[]";
  analises.value = JSON.parse(systemSavedsAnalises);
});

function remove(id: string) {
  if (confirm()) {
    analises.value = analises.value.filter((analise: any) => analise.id != id);
    localStorage.analises = JSON.stringify(analises.value);
  }
}

function edit(id: string) {
  router.push({ path: `./analises-form/${id}` });
}

function activeAnalysis(id: string) {
  if (confirm()) {
    const analysisToDisableIndex = analises.value.findIndex(
      (analise: any) => analise.status == "active"
    );
    if (analysisToDisableIndex >= 0) {
      analises.value[analysisToDisableIndex].status = "open";
    }
    const analysis = analises.value.find((analise: any) => analise.id == id);
    analysis.status = "active";
    localStorage.analises = JSON.stringify(analises.value);
  }
}

function search() {}

function createAnalisys() {
  router.push({ path: "./analises-form" });
}
</script>

<template>
  <div class="row">
    <div class="col s6">
      <Search @search="search" />
    </div>
    <div class="col s6">
      <button
        class="waves-effect waves-light btn right"
        @click="createAnalisys"
      >
        Criar análise
      </button>
    </div>
  </div>
  <table class="highlight">
    <thead>
      <tr>
        <th class="line-name">Nome</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(analise, index) in analises" :key="index">
        <td>{{ analise.name }}</td>
        <td>
          <i
            v-if="analise.status !== 'active'"
            @click="remove(analise.id)"
            class="material-icons"
            >delete</i
          >
        </td>
        <td>
          <i @click="edit(analise.id)" class="material-icons">edit</i>
        </td>
        <td>
          <i
            @click="activeAnalysis(analise.id)"
            class="material-icons analysis-open"
            v-if="analise.status == 'open'"
            >check_circle</i
          >
          <i class="material-icons" v-if="analise.status == 'active'"
            >check_circle</i
          >
          <i class="material-icons" v-if="analise.status == 'closed'"
            >signal_cellular_no_sim</i
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
i {
  cursor: pointer;
}
.line-name {
  width: 60%;
}
th {
  font-weight: bold;
}
.analysis-open {
  opacity: 0.6;
}
</style>
