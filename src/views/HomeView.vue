<script setup lang="ts">
import { ref, onMounted } from "vue";
import TheWelcome from "@/components/TheWelcome.vue";
import Mennu from "@/components/menu.vue";

onMounted(() => {
  console.log(`The initial count is.`);
});
</script>

<template>
  <main>
    <div class="row">
      <div class="col s2"><Mennu /></div>
      <div class="col s6"><TheWelcome /></div>
    </div>
  </main>
</template>
