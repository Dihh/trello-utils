<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      lists: [] as any,
      labels: [] as any,
      listsFiltered: [] as any,
      selecteds: [],
      labelsSelecteds: [],
      selectedsLabels: [] as any,
      selectedsLists: [] as any,
      board: localStorage.board,
      apiKey: localStorage.apiKey,
      token: localStorage.token,
      searchValue: "",
      cardName: "",
    };
  },
  mounted() {
    this.getLists();
    this.getLabels();
  },
  methods: {
    async getLists() {
      const resp = await fetch(
        `https://api.trello.com/1/boards/${this.board}/lists?key=${this.apiKey}&token=${this.token}`
      );
      this.lists = await resp.json();
      this.filter();
    },
    async getLabels() {
      const resp = await fetch(
        `https://api.trello.com/1/boards/${this.board}/labels?key=${this.apiKey}&token=${this.token}`
      );
      this.labels = await resp.json();
    },
    search() {
      event?.preventDefault();
      this.filter();
    },
    filter() {
      this.listsFiltered = this.lists.filter((list: any) => {
        const filterValue = this.searchValue
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        return list.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(filterValue);
      });
    },
    select() {
      const selecteds: string[] = this.selecteds.map((element) => element);
      const selectedsLabels: string[] = this.labelsSelecteds.map(
        (element: any) => element
      );
      this.selectedsLists = this.lists.filter((card: any) =>
        selecteds.includes(card.id)
      );
      this.selectedsLabels = this.labels.filter((label: any) =>
        selectedsLabels.includes(label.id)
      );
    },
    async send() {
      event?.preventDefault();
      for (let index in this.selectedsLists) {
        const list = this.selectedsLists[index];
        let cardName = this.cardName.replace("{name}", list.name);
        cardName = cardName.replace("{NAME}", list.name.toUpperCase());
        const body = new URLSearchParams({
          name: cardName,
          idLabels: this.selectedsLabels.map((label: any) => label.id),
        } as any);
        const headers = {};
        await fetch(
          `https://api.trello.com/1/cards?idList=${list.id}&key=${this.apiKey}&token=${this.token}`,
          {
            method: "POST",
            body: body,
            headers,
          }
        );
      }
      alert("Sucesso");
      this.cardName = "";
    },
  },
});
</script>

<template>
  <div class="row">
    <div class="input-field col s11">
      <input v-model="searchValue" id="search" type="text" @keyup="search" />
      <label for="search"></label>
    </div>
    <div class="input-field col s1">
      <button class="waves-effect waves-light btn">
        <i class="material-icons">search</i>
      </button>
    </div>
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
                    v-model="selecteds"
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
      <div class="col s2">
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
.lists {
  max-height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  border: solid 1px #aaa;
  padding: 10px;
  border-radius: 9px;
}
.labels {
  max-height: 25vh;
  overflow-y: auto;
  overflow-x: hidden;
  border: solid 1px #aaa;
  padding: 10px;
  border-radius: 9px;
}
.form-button {
  margin-top: 20px;
  text-align: right;
}
</style>