<script setup lang="ts">
import { onMounted, ref } from "vue";
import { uuid, createCards } from "../utils";
import Search from "@/components/shared/search.vue";

let labels = ref([]);
let listsFiltered = ref([]);
let selectedsCheckbox = ref([]);
let labelsSelecteds = ref([]);
let selectedsLists = ref([]);
let cardName = ref("");
let selectedsLabels = ref([]);
let lists: any = [];
let board = localStorage.board;
let apiKey = localStorage.apiKey;
let token = localStorage.token;
let searchValue = "";

onMounted(() => {
  getLists();
  getLabels();
});

async function getLists() {
  const resp = await fetch(
    `https://api.trello.com/1/boards/${board}/lists?key=${apiKey}&token=${token}`
  );
  lists = await resp.json();
  filter();
}

async function getLabels() {
  const resp = await fetch(
    `https://api.trello.com/1/boards/${board}/labels?key=${apiKey}&token=${token}`
  );
  labels.value = await resp.json();
}

function search(search: string) {
  event?.preventDefault();
  filter(search);
}

function filter(search = "") {
  listsFiltered.value = lists.filter((list: any) => {
    const filterValue = search
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return list.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(filterValue);
  });
}

function select() {
  const selecteds: string[] = selectedsCheckbox.value.map((element) => element);
  const _selectedsLabels: string[] = labelsSelecteds.value.map(
    (element: any) => element
  );
  selectedsLists.value = lists.filter((card: any) =>
    selecteds.includes(card.id)
  );
  selectedsLabels.value = labels.value.filter((label: any) =>
    _selectedsLabels.includes(label.id)
  );
}

async function send() {
  event?.preventDefault();
  await createCards(
    selectedsLists.value,
    cardName.value,
    selectedsLabels.value,
    apiKey,
    token
  );
  alert("Sucesso");
  cardName.value = "";
}

function saveRecurrents() {
  const systemRecurrents = localStorage.recurrents || "[]";
  const recurrents = JSON.parse(systemRecurrents);
  const recurrent = {
    id: uuid(),
    selectedsLists: selectedsLists.value,
    cardName: cardName.value,
    selectedsLabels: selectedsLabels.value,
  };
  if (recurrent.cardName) {
    recurrents.push(recurrent);
    localStorage.recurrents = JSON.stringify(recurrents);
    alert("Salvo");
    document.querySelector("form")?.reset();
  }
}
</script>

<template>
  <div class="row">
    <Search @search="search" />
  </div>
  <form @submit="send()">
    <div class="row">
      <div class="col s12">
        <div class="row">
          <div class="col s7 lists">
            <div
              class="row"
              v-for="(list, index) in listsFiltered"
              :key="index"
            >
              <div class="col s12">
                <label>
                  <input
                    type="checkbox"
                    :value="list.id"
                    v-model="selectedsCheckbox"
                    @change="select"
                  />
                  <span>{{ list.name }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="col s5">
            <div v-for="list in selectedsLists" :key="list.id">
              {{ list.name }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s7 labels">
            <div class="row" v-for="(label, index) in labels" :key="index">
              <div class="col s12">
                <label>
                  <input
                    type="checkbox"
                    :value="label.id"
                    v-model="labelsSelecteds"
                    @change="select"
                  />
                  <span>{{ label.name }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="col s5">
            <div v-for="label in selectedsLabels" :key="label.id">
              {{ label.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row form-button">
      <div class="col s10">
        <input v-model="cardName" id="cardName" type="text" required />
        <label for="cardName"></label>
      </div>
      <div class="col s1">
        <button class="waves-effect waves-light btn">Enviar</button>
      </div>
      <div class="col s1">
        <button
          type="button"
          @click="saveRecurrents"
          class="waves-effect waves-light btn"
        >
          Salvar
        </button>
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
.lists {
  max-height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  border: solid 1px rgba(170, 170, 170, 0.885);
  padding: 20px 10px 20px 20px !important;
  border-radius: 9px;
}
.labels {
  max-height: 25vh;
  overflow-y: auto;
  overflow-x: hidden;
  border: solid 1px #aaa;
  padding: 20px 10px 20px 20px !important;
  border-radius: 9px;
}
.form-button {
  margin-top: 20px;
  text-align: right;
}
</style>