<script setup lang="ts">
import Search from "@/components/shared/search.vue";
import router from "@/router";

import { createCards } from "@/utils";
import M from "materialize-css";
import { onMounted, ref } from "vue";

const cards = ref<any>([]);
const loading = ref(false);
const apiKey = localStorage.apiKey;
const token = localStorage.token;

onMounted(() => {
  M.AutoInit();
  const systemCards = localStorage.cards || "[]";
  cards.value = JSON.parse(systemCards);
});

function remove(id: string) {
  cards.value = cards.value.filter((card: any) => card.id != id);
  localStorage.cards = JSON.stringify(cards.value);
}

async function send(card: any) {
  await createCards(card.lists, card.name, card.labels, apiKey, token);
  alert("Sucesso");
}

function goTo(id: string) {
  router.push({ path: `./create-cards/${id}` });
}

function search() {}

async function createAll() {
  loading.value = true;
  await Promise.all(
    cards.value.map(async (card: any) => {
      await createCards(card.lists, card.name, card.labels, apiKey, token);
    })
  );
  alert("Cards criados");
  loading.value = false;
}
</script>

<template>
  <div class="row">
    <Search @search="search" />
  </div>
  <table class="highlight">
    <thead>
      <tr>
        <th class="line-name">Nome</th>
        <th>Colunas</th>
        <th>Etiquetas</th>
        <th></th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(card, index) in cards" :key="index">
        <td class="click" @click="goTo(card.id)">{{ card.name }}</td>
        <td>
          <ul>
            <li v-for="(list, listIndex) in card.lists" :key="listIndex">
              {{ list.name }}
            </li>
          </ul>
        </td>
        <td>
          <ul>
            <li v-for="(label, labelIndex) in card.labels" :key="labelIndex">
              {{ label.name }}
            </li>
          </ul>
        </td>
        <td>
          <i @click="remove(card.id)" class="material-icons click">delete</i>
        </td>
        <td>
          <i @click="send(card)" class="material-icons click">send</i>
        </td>
      </tr>
    </tbody>
  </table>
  <br />
  <div class="row">
    <div class="col s12 right-align">
      <button
        @click="createAll"
        class="waves-effect waves-light btn loading-btn"
      >
        <div>
          <span v-if="!loading">Criar todos</span>
          <div v-else class="button-loader"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.line-name {
  width: 60%;
}
th {
  font-weight: bold;
}
.click {
  cursor: pointer;
}
.loading-btn > div {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
