<script lang="ts">
import M from "materialize-css";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      analises: [] as any,
    };
  },
  mounted() {
    M.AutoInit();
    const systemSavedsAnalises = localStorage.analises || "[]";
    this.analises = JSON.parse(systemSavedsAnalises);
  },
  methods: {
    remove(id: string) {
      this.analises = this.analises.filter((analise: any) => analise.id != id);
      localStorage.analises = JSON.stringify(this.analises);
    },
  },
});
</script>

<template>
  <table class="highlight">
    <thead>
      <tr>
        <th class="line-name">Nome</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(analise, index) in analises" :key="index">
        <td>{{ analise.name }}</td>
        <td @click="remove(analise.id)" class="remove">
          <i class="material-icons">delete</i>
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