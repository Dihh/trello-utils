<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { onMounted } from "vue";
import M from "materialize-css";

const board = ref("");
const apiKey = ref("");
const token = ref("");
const boards = ref<any[]>([]);
const user = ref();

onMounted(() => {
  const [key, token] = [localStorage.apiKey, localStorage.token];
  if (key && token) {
    setUser(key);
  }
  board.value = localStorage.board;
});

async function setUser(key: string) {
  user.value = await (await fetch(`http://localhost:3000/users/${key}`)).json();
  if (user.value) {
    boards.value = user.value.boards;
  }
}

async function save() {
  try {
    await fetch(`http://localhost:3000/users`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          key: apiKey.value,
          token: token.value,
        },
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    localStorage.apiKey = apiKey.value;
    localStorage.token = token.value;

    alert("Sucesso");
    apiKey.value = "";
    token.value = "";
  } catch (e) {
    alert("Error");
  }
}

function selectBoard() {
  localStorage.board = board.value;
}
</script>

<template>
  <form class="col s12">
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
      <div>
        <label>Materialize Select</label>
        <select @change="selectBoard" v-model="board">
          <option
            v-for="(board, index) in boards"
            :key="index"
            :value="board.id"
          >
            {{ board.name }}
          </option>
        </select>
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
