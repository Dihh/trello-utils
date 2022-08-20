<script lang="ts">
import { createCards } from "@/utils";
import M from "materialize-css";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      recurrents: [] as any,
      apiKey: localStorage.apiKey,
      token: localStorage.token,
    };
  },
  mounted() {
    M.AutoInit();
    const systemRecurrents = localStorage.recurrents || "[]";
    this.recurrents = JSON.parse(systemRecurrents);
  },
  methods: {
    remove(id: string) {
      this.recurrents = this.recurrents.filter(
        (recurrent: any) => recurrent.id != id
      );
      localStorage.recurrents = JSON.stringify(this.recurrents);
    },
    async send(recurrent: any) {
      await createCards(
        recurrent.selectedsLists,
        recurrent.cardName,
        recurrent.selectedsLabels,
        this.apiKey,
        this.token
      );
      alert("Sucesso");
    },
  },
});
</script>

<template>
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