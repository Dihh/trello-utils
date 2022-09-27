<script setup lang="ts">
import { uuid } from "@/utils";
import { onMounted, ref } from "vue";
import M from "materialize-css";
import router from "@/router";
import showdown from "showdown";

var converter = new showdown.Converter();
const analise = ref<any>(JSON.parse(localStorage.analise));

onMounted(() => {
  M.AutoInit();
});

const analysisContentPre = ref("");
const analysisContentPos = ref("");

function setMarkDown() {
  let preHtml = converter.makeHtml(analise.value.pre);
  let posHtml = converter.makeHtml(analise.value.pos);
  const checkbox = '<label><input type="checkbox" /><span></span></label>';
  const checkboxChecked =
    '<label><input type="checkbox" checked /><span></span></label>';
  preHtml = preHtml.replace(/\[ \]/g, checkbox);
  preHtml = preHtml.replace(/\[x\]/g, checkboxChecked);
  posHtml = posHtml.replace(/\[ \]/g, checkbox);
  posHtml = posHtml.replace(/\[x\]/g, checkboxChecked);
  analysisContentPre.value = preHtml;
  analysisContentPos.value = posHtml;
}

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
        <div class="row">
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
        <div class="row">
          <div class="col s12">
            <div class="input-field col s11">
              <textarea
                id="obs"
                v-model="analise.pre"
                class="materialize-textarea validate"
                placeholder=" "
                @keyup="setMarkDown()"
              ></textarea>
              <label for="obs" class="active">Pré-planejamento:</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <div class="input-field col s11">
              <textarea
                id="obs"
                v-model="analise.pos"
                class="materialize-textarea validate"
                placeholder=" "
                @keyup="setMarkDown()"
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
        <div class="row" v-html="analysisContentPre"></div>
        <div class="row" v-html="analysisContentPos"></div>
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
