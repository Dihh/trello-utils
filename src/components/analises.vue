<script lang="ts" setup>
import router from "@/router";
import M from "materialize-css";
import { onMounted, ref } from "vue";

let analises = ref([]) as any;

onMounted(() => {
  M.AutoInit();
  const systemSavedsAnalises = localStorage.analises || "[]";
  analises.value = JSON.parse(systemSavedsAnalises);
});

function remove(id: string) {
  analises.value = analises.value.filter((analise: any) => analise.id != id);
  localStorage.analises = JSON.stringify(analises.value);
}

function edit(id: string) {
  localStorage.analise = JSON.stringify(
    analises.value.find((analise: any) => analise.id == id)
  );
  router.push({ path: "./analises-form" });
}
</script>

<template>
  <table class="highlight">
    <thead>
      <tr>
        <th class="line-name">Nome</th>
        <th></th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(analise, index) in analises" :key="index">
        <td>{{ analise.name }}</td>
        <td @click="remove(analise.id)" class="remove">
          <i class="material-icons">delete</i>
        </td>
        <td @click="edit(analise.id)" class="remove">
          <i class="material-icons">edit</i>
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