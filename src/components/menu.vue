<script setup lang="ts">
</script>

<template>
  <RouterLink class="waves-effect waves-light btn" to="/trello-utils/"
    >Dashboard</RouterLink
  >
  <RouterLink class="waves-effect waves-light btn" to="/trello-utils/cards"
    >Cards</RouterLink
  >
  <RouterLink
    class="waves-effect waves-light btn"
    to="/trello-utils/create-cards"
    >Criar cards</RouterLink
  >
  <RouterLink class="waves-effect waves-light btn" to="/trello-utils/recurrents"
    >Recorrentes</RouterLink
  >
  <RouterLink class="waves-effect waves-light btn" to="/trello-utils/checklist"
    >Checklist</RouterLink
  >
  <RouterLink class="waves-effect waves-light btn" to="/trello-utils/analises"
    >Análises</RouterLink
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