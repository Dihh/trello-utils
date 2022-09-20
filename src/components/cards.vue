<script setup lang="ts">
import Search from "@/components/shared/search.vue";

import { onMounted, ref } from "vue";

const cardsFiltered = ref([]);
const selectedsCheckbox: any = ref([]);
const selectedsCards = ref([]);
let cards: any = [];
const board = localStorage.board;
const apiKey = localStorage.apiKey;
const token = localStorage.token;

onMounted(() => {
  getCards();
});

async function getCards() {
  const resp = await fetch(
    `https://api.trello.com/1/boards/${board}/cards?key=${apiKey}&token=${token}`
  );
  cards = await resp.json();
  cardsFilter();
}

function send() {
  event?.preventDefault();
}

function search(search: string) {
  cardsFilter(search);
}

function cardsFilter(search = "") {
  cardsFiltered.value = cards.filter((card: any) => {
    const filterValue = search
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return card.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(filterValue);
  });
}

function select() {
  const selecteds: string[] = selectedsCheckbox.value.map(
    (element: any) => element
  );
  selectedsCards.value = cards.filter((card: any) =>
    selecteds.includes(card.id)
  );
}
</script>

<template>
  <div class="row">
    <Search @search="search" />
  </div>
  <form @submit="send()">
    <div class="row">
      <div class="col s7">
        <div class="cards">
          <div class="row" v-for="(card, index) in cardsFiltered" :key="index">
            <div class="col s12">
              <label>
                <input
                  type="checkbox"
                  :value="card.id"
                  v-model="selectedsCheckbox"
                  @change="select"
                />
                <span>{{ card.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col s5 cards">
        <div v-for="card in selectedsCards" :key="card.id">
          {{ card.name }}
        </div>
      </div>
    </div>
    <div class="row form-button">
      <div class="col s12">
        <button class="waves-effect waves-light btn">Enviar</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.cards {
  max-height: 65vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.form-button {
  margin-top: 20px;
  text-align: right;
}
</style>
