<script setup lang="ts">
import { ref, onMounted } from "vue";
import Checklist from "@/components/checklist.vue";

onMounted(() => {
  console.log(`The initial count is.`);
});
</script>

<template>
  <main>
    <div class="row">
      <div class="col s12"><Checklist /></div>
    </div>
  </main>
</template>
