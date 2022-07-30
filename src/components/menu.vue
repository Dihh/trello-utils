<script setup lang="ts">
import { ref, onMounted } from "vue";

onMounted(() => {});
</script>

<template>
  <RouterLink class="waves-effect waves-light btn" to="/trello-utils/"
    >Cards</RouterLink
  >
  <RouterLink class="waves-effect waves-light btn" to="/trello-utils/checklist"
    >Checklist</RouterLink
  >
  <RouterLink class="waves-effect waves-light btn" to="/trello-utils/api-key"
    >API_KEY</RouterLink
  >
</template>

<style scoped>
.btn {
  width: 100%;
  margin-bottom: 5px;
}
</style>