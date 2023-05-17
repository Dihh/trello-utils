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
  getCards();
});

async function getCards() {
  cards.value = await (
    await fetch(
      `http://localhost:3000/users/${localStorage.apiKey}/boards/${localStorage.board}/recurrent_cards`
    )
  ).json();
}

async function remove(id: string) {
  await fetch(`http://localhost:3000/recurrent_cards/${id}`, {
    method: "DELETE",
  });
  location.reload();
}

async function send(card: any) {
  await createCards(card.lists, card.name, card.labels, apiKey, token);
  alert("Sucesso");
}

function goTo(id: string) {
  router.push({ path: `./create-cards/${id}` });
}

function createCard(id: string) {
  router.push({ path: `./create-cards` });
}

function search() {}

async function createAll() {
  loading.value = true;
  await fetch(
    `http://localhost:3000/users/${localStorage.apiKey}/boards/${localStorage.board}/execute`,
    {
      method: "POST",
    }
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
            <li v-for="(list, listIndex) in card.card_lists" :key="listIndex">
              {{ list.name }}
            </li>
          </ul>
        </td>
        <td>
          <ul>
            <li
              v-for="(label, labelIndex) in card.card_labels"
              :key="labelIndex"
            >
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
          <span v-if="!loading">Executar</span>
          <div v-else class="button-loader"></div>
        </div>
      </button>
      <button
        @click="createCard"
        class="waves-effect waves-light btn loading-btn"
      >
        <div>
          <span v-if="!loading">Criar card recorrent</span>
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
button {
  margin-left: 10px;
}
</style>
