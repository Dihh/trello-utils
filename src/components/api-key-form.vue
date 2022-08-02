<style scoped>
.input-field {
  margin-top: 0px;
}
.form-button {
  text-align: right;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      board: "",
      apiKey: "",
      token: "",
    };
  },
  methods: {
    save() {
      localStorage.board = this.board;
      localStorage.apiKey = this.apiKey;
      localStorage.token = this.token;
      alert("Sucesso");
      this.board = "";
      this.apiKey = "";
      this.token = "";
    },
  },
});
</script>

<template>
  <form class="col s12">
    <div class="row">
      <div class="input-field col s12">
        <input v-model="board" id="board" type="text" class="validate" />
        <label for="board">Boards</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input v-model="apiKey" id="key" type="text" class="validate" />
        <label for="key">Key</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input v-model="token" id="token" type="text" class="validate" />
        <label for="token">Token</label>
      </div>
    </div>
    <div class="row">
      <div class="col s3 offset-s9 form-button">
        <a class="waves-effect waves-light btn" @click="save()">Salvar</a>
      </div>
    </div>
  </form>
</template>