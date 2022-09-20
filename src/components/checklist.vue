<script setup lang="ts">
import Search from "@/components/shared/search.vue";
import { onMounted, ref } from "vue";

function search() {}
</script>

<template>
  <div class="row">
    <Search @search="search" />
  </div>
  component 2
</template>
