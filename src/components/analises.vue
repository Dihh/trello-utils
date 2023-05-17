<script lang="ts" setup>
import Search from "@/components/shared/search.vue";

import router from "@/router";
import M from "materialize-css";
import { onMounted, ref } from "vue";

const analises = ref([]) as any;

onMounted(() => {
  M.AutoInit();
  getAnalises();
});

async function getAnalises() {
  analises.value = await (
    await fetch(
      `http://localhost:3000/users/${localStorage.apiKey}/boards/${localStorage.board}/analyses`
    )
  ).json();
}

async function remove(id: string) {
  if (confirm()) {
    await fetch(`http://localhost:3000/analyses/${id}`, {
      method: "DELETE",
    });
    location.reload();
  }
}

function edit(id: string) {
  router.push({ path: `./analises-form/${id}` });
}

async function activeAnalysis(id: string) {
  if (confirm()) {
    await fetch(
      `http://localhost:3000/users/${localStorage.apiKey}/boards/${localStorage.board}/analyses/${id}/active`,
      {
        method: "POST",
      }
    );
    location.reload();
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
