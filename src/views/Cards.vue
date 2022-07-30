<script setup lang="ts">
import { ref, onMounted } from "vue";
import Cards from "@/components/cards.vue";

onMounted(() => {
  console.log(`The initial count is.`);
});
</script>

<template>
  <main>
    <div class="row">
      <div class="col s12"><Cards /></div>
    </div>
  </main>
</template>
