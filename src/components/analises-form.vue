<script setup lang="ts">
import { uuid } from "@/utils";
import { onMounted, ref } from "vue";
import M from "materialize-css";
import router from "@/router";

let analise = ref<any>(JSON.parse(localStorage.analise));

onMounted(() => {
  M.AutoInit();
});

function submitForm() {
  if (analise.value.id) {
    updateForm();
  } else {
    saveAnalise();
  }
}

function updateForm() {
  event?.preventDefault();
  const systemSavedsAnalises = localStorage.analises || "[]";
  const analises = JSON.parse(systemSavedsAnalises);
  const analiseIndex = analises.findIndex(
    (findAnalise: any) => analise.value.id == findAnalise.id
  );
  analises[analiseIndex] = {
    ...analises[analiseIndex],
    ...analise.value,
  };
  localStorage.analises = JSON.stringify(analises);
  alert("Salvo");
  router.push({ path: "./analises" });
}

function saveAnalise() {
  event?.preventDefault();
  const systemSavedsAnalises = localStorage.analises || "[]";
  const analises = JSON.parse(systemSavedsAnalises);
  analise.value.id = uuid();
  analises.push(analise.value);
  localStorage.analises = JSON.stringify(analises);
  alert("Salvo");
  router.push({ path: "./analises" });
}

function cancel() {
  router.back();
}
</script>

<template>
  <form @submit="submitForm()">
    <div class="row">
      <div class="col s6">
        <div class="row form-button">
          <div class="col s12">
            <div class="input-field col s11">
              <input
                id="name"
                type="text"
                v-model="analise.name"
                class="validate"
                placeholder=" "
              />
              <label for="name" class="active">Nome:</label>
            </div>
          </div>
        </div>
        <div class="row form-button">
          <div class="col s12">
            <div class="input-field col s11">
              <textarea
                id="obs"
                v-model="analise.pre"
                class="materialize-textarea validate"
                placeholder=" "
              ></textarea>
              <label for="obs" class="active">Pré-planejamento:</label>
            </div>
          </div>
        </div>
        <div class="row form-button">
          <div class="col s12">
            <div class="input-field col s11">
              <textarea
                id="obs"
                v-model="analise.pos"
                class="materialize-textarea validate"
                placeholder=" "
              ></textarea>
              <label for="obs" class="active">Pós-planejamento:</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <button
              type="button"
              @click="cancel"
              class="waves-effect waves-light btn"
            >
              Cancelar
            </button>
          </div>
          <div class="col s6 right-align">
            <button class="waves-effect waves-light btn">Salvar</button>
          </div>
        </div>
      </div>
      <div class="col s6">
        <pre>
          {{ analise.quantityJson }}
          </pre
        >
      </div>
    </div>
  </form>
</template>
