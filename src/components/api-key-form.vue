<script setup lang="ts">
import { defineComponent, ref } from "vue";

const board = ref("");
const apiKey = ref("");
const token = ref("");

function save() {
  localStorage.board = board.value;
  localStorage.apiKey = apiKey.value;
  localStorage.token = token.value;
  alert("Sucesso");
  board.value = "";
  apiKey.value = "";
  token.value = "";
}
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

<style scoped>
.input-field {
  margin-top: 0px;
}
.form-button {
  text-align: right;
}
</style>