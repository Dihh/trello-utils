<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      cards: [] as any,
      cardsFiltered: [] as any,
      selecteds: [],
      selectedsCards: [],
      board: localStorage.board,
      apiKey: localStorage.apiKey,
      token: localStorage.token,
      searchValue: "",
    };
  },
  mounted() {
    this.getCards();
  },
  methods: {
    async getCards() {
      const resp = await fetch(
        `https://api.trello.com/1/boards/${this.board}/cards?key=${this.apiKey}&token=${this.token}`
      );
      this.cards = await resp.json();
      this.cardsFilter();
    },
    send(form: any) {
      event?.preventDefault();
    },
    search() {
      event?.preventDefault();
      this.cardsFilter();
    },
    cardsFilter() {
      this.cardsFiltered = this.cards.filter((card: any) => {
        const filterValue = this.searchValue
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        return card.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(filterValue);
      });
    },
    select() {
      const selecteds: string[] = this.selecteds.map((element) => element);
      this.selectedsCards = this.cards.filter((card: any) =>
        selecteds.includes(card.id)
      );
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
      <div class="col s7">
        <div class="cards">
          <div class="row" v-for="(card, index) in cardsFiltered" :key="index">
            <div class="col s12">
              <label>
                <input
                  type="checkbox"
                  :value="card.id"
                  v-model="selecteds"
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