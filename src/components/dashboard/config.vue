<script setup lang="ts">
import { onMounted, ref } from "vue";
import M from "materialize-css";

const props = defineProps<{
  lists: any;
  selectedLists: any;
}>();

const iintialDay = ref("");
const finalDay = ref("");

const emit = defineEmits(["changeView", "setSelectedList"]);

onMounted(() => {
  M.AutoInit();
  iintialDay.value = localStorage.iintialDayString || "";
  finalDay.value = localStorage.finalDayString || "";
});

function changeDate() {
  localStorage.iintialDayString = iintialDay.value;
  localStorage.finalDayString = finalDay.value;
  localStorage.dashboardSelectedLists = JSON.stringify(
    props.selectedLists.map((el: any) => el)
  );
  emit("changeView", "dashboard");
}
</script>

<template>
  <div class="row">
    <div class="col s3">
      <div class="input-field col s11">
        <input id="initialDate" type="date" v-model="iintialDay" />
        <label for="initialDate">Data início</label>
      </div>
    </div>
    <div class="col s3">
      <div class="input-field col s11">
        <input id="initialDate" type="date" v-model="finalDay" />
        <label for="initialDate">Data fim</label>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col s7 lists">
      <div class="select-list">
        <div class="row" v-for="(list, index) in lists" :key="index">
          <div class="col s12">
            <label>
              <input
                type="checkbox"
                :value="list.name"
                v-model="selectedLists"
              />
              <span>{{ list.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row top-2">
    <div class="col s12">
      <button class="waves-effect waves-light btn" @click="changeDate">
        Salvar
      </button>
    </div>
  </div>
</template>
