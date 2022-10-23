<script setup lang="ts">
import { onMounted, ref } from "vue";
import { uuid, publicPath } from "../utils";
import Search from "@/components/shared/search.vue";
import { useRoute } from "vue-router";
import router from "@/router";

const labels = ref<any>([]);
const listsFiltered = ref<any>([]);
const card = ref<any>({
  lists: [],
  labels: [],
  name: "",
});

let lists: any = [];
const board = localStorage.board;
const apiKey = localStorage.apiKey;
const token = localStorage.token;
const searchValue = "";

const route = useRoute();
const id = route.params.id;

const systemCards = localStorage.cards || "[]";
const cards = JSON.parse(systemCards);

onMounted(() => {
  getLists();
  getLabels();
  M.AutoInit();
  if (id && typeof id == "string") {
    getCard(id);
  }
});

function getCard(id: string) {
  const systemCard = cards.find((card: any) => card.id == id);
  if (systemCard) {
    card.value = systemCard;
  }
}

async function getLists() {
  const resp = await fetch(
    `https://api.trello.com/1/boards/${board}/lists?key=${apiKey}&token=${token}`
  );
  lists = (await resp.json()).map((list: any) => ({
    name: list.name,
    id: list.id,
  }));
  filter();
}

async function getLabels() {
  const resp = await fetch(
    `https://api.trello.com/1/boards/${board}/labels?key=${apiKey}&token=${token}`
  );
  labels.value = (await resp.json()).map((label: any) => ({
    name: label.name,
    id: label.id,
  }));
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

function saveRecurrents() {
  if (id) {
    localStorage.cards = JSON.stringify(cards);
  } else {
    card.value.id = uuid();
    cards.push(card.value);
    localStorage.cards = JSON.stringify(cards);
  }
  alert("Salvo");
  router.push({ path: `${publicPath}/recurrents` });
}
</script>

<template>
  <div class="row">
    <Search @search="search" />
  </div>
  <form>
    <div class="row">
      <div class="col s12">
        <div class="row">
          <div class="col s5 lists">
            <div
              class="row"
              v-for="(list, index) in listsFiltered"
              :key="index"
            >
              <div class="col s12">
                <label>
                  <input type="checkbox" :value="list" v-model="card.lists" />
                  <span>{{ list.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="col s5 offset-s1 labels">
            <div class="row" v-for="(label, index) in labels" :key="index">
              <div class="col s12">
                <label>
                  <input type="checkbox" :value="label" v-model="card.labels" />
                  <span>{{ label.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <div v-for="list in card.lists" :key="list.id">
              {{ list.name }}
            </div>
          </div>
          <div class="col s6">
            <div v-for="label in card.labels" :key="label.id">
              {{ label.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row form-button">
      <div class="col s11">
        <input v-model="card.name" id="cardName" type="text" required />
        <label for="cardName"></label>
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
  max-height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  border: solid 1px rgba(170, 170, 170, 0.885);
  padding: 20px 10px 20px 20px !important;
  border-radius: 9px;
}
.form-button {
  margin-top: 20px;
  text-align: right;
}
</style>
