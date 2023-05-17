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

async function getCard(id: string) {
  card.value = await (
    await fetch(`http://localhost:3000/recurrent_cards/${id}`)
  ).json();
  card.value.lists = card.value.card_lists.map((el: any) => el.id);
  card.value.labels = card.value.card_labels.map((el: any) => el.id);
}

async function getLists() {
  const resp = await fetch(
    `http://localhost:3000/users/${localStorage.apiKey}/boards/${localStorage.board}/lists`
  );
  lists = await resp.json();
  filter();
}

async function getLabels() {
  const resp = await fetch(
    `http://localhost:3000/users/${localStorage.apiKey}/boards/${localStorage.board}/labels`
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

async function saveRecurrents() {
  if (id) {
    await fetch(`http://localhost:3000/recurrent_cards/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        recurrent_card: {
          name: card.value.name,
          board_id: localStorage.board,
        },
        lists: card.value.lists,
        labels: card.value.labels,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  } else {
    await fetch(`http://localhost:3000/recurrent_cards/`, {
      method: "POST",
      body: JSON.stringify({
        recurrent_card: {
          name: card.value.name,
          board_id: localStorage.board,
        },
        lists: card.value.lists,
        labels: card.value.labels,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
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
                  <input
                    type="checkbox"
                    :value="list.id"
                    v-model="card.lists"
                  />
                  <span>{{ list.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="col s5 offset-s1 labels">
            <div class="row" v-for="(label, index) in labels" :key="index">
              <div class="col s12">
                <label>
                  <input
                    type="checkbox"
                    :value="label.id"
                    v-model="card.labels"
                  />
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
