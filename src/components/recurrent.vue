<script setup lang="ts">
import Search from "@/components/shared/search.vue";

import { createCards } from "@/utils";
import M from "materialize-css";
import { onMounted, ref } from "vue";

const recurrents = ref([]);
const apiKey = localStorage.apiKey;
const token = localStorage.token;

onMounted(() => {
  M.AutoInit();
  const systemRecurrents = localStorage.recurrents || "[]";
  recurrents.value = JSON.parse(systemRecurrents);
});

function remove(id: string) {
  recurrents.value = recurrents.value.filter(
    (recurrent: any) => recurrent.id != id
  );
  localStorage.recurrents = JSON.stringify(recurrents.value);
}

async function send(recurrent: any) {
  await createCards(
    recurrent.selectedsLists,
    recurrent.cardName,
    recurrent.selectedsLabels,
    apiKey,
    token
  );
  alert("Sucesso");
}
</script>

<template>
  <div class="row">
    <Search @search="search" />
  </div>
  <table class="highlight">
    <thead>
      <tr>
        <th class="line-name">Nome</th>
        <th>Colunas</th>
        <th>Etiquetas</th>
        <th></th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(recurrent, index) in recurrents" :key="index">
        <td>{{ recurrent.cardName }}</td>
        <td>
          <ul>
            <li
              v-for="(list, listIndex) in recurrent.selectedsLists"
              :key="listIndex"
            >
              {{ list.name }}
            </li>
          </ul>
        </td>
        <td>
          <ul>
            <li
              v-for="(label, labelIndex) in recurrent.selectedsLabels"
              :key="labelIndex"
            >
              {{ label.name }}
            </li>
          </ul>
        </td>
        <td @click="remove(recurrent.id)" class="remove">
          <i class="material-icons">delete</i>
        </td>
        <td @click="send(recurrent)" class="remove">
          <i class="material-icons">send</i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.line-name {
  width: 60%;
}
th {
  font-weight: bold;
}
.remove {
  cursor: pointer;
}
</style>
