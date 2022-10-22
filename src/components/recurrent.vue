<script setup lang="ts">
import Search from "@/components/shared/search.vue";
import router from "@/router";

import { createCards } from "@/utils";
import M from "materialize-css";
import { onMounted, ref } from "vue";

const cards = ref<any>([]);
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
</style>
