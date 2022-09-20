<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits(["search"]);
const searchValue = ref<string>();

let searchTimeOut: ReturnType<typeof setTimeout>;

function search() {
  clearTimeout(searchTimeOut);
  searchTimeOut = setTimeout(() => {
    emit("search", searchValue.value);
  }, 500);
}
</script>

<template>
  <div class="input-field col s11">
    <input v-model="searchValue" id="search" type="text" @keyup="search" />
    <label for="search"></label>
  </div>
  <div class="input-field col s1">
    <button class="waves-effect waves-light btn">
      <i class="material-icons">search</i>
    </button>
  </div>
</template>
