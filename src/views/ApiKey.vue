<script setup lang="ts">
import { ref, onMounted } from "vue";
import M from "materialize-css";

let board = "12";
const key = "";
const token = "";

function temp() {
  console.log("here");
  console.log(board, key, token);
}

onMounted(() => {
  M.AutoInit();
});
</script>

<template>
  <main>
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input :value="board" id="board" type="text" class="validate" />
          <label for="board">Boards</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="key" type="text" class="validate" />
          <label for="key">Key</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="token" type="text" class="validate" />
          <label for="token">Token</label>
        </div>
      </div>
      <div class="row">
        <div class="col s3 offset-s9 form-button">
          <a class="waves-effect waves-light btn" @click="temp()">Salvar</a>
        </div>
      </div>
    </form>
  </main>
</template>


<style scoped>
.input-field {
  margin-top: 0px;
}
.form-button {
  text-align: right;
}
</style>