<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["changeView"]);

function chageView(view: string) {
  emit("changeView", view);
}
</script>

<template>
  <nav class="nav-extended">
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab">
          <a href="#test1" @click="chageView('dashboard')">Dashboard</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
