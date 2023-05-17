<script setup lang="ts">
import { uuid, labelColors, publicPath } from "@/utils";
import { onMounted, ref } from "vue";
import M from "materialize-css";
import router from "@/router";
import showdown from "showdown";
import { useRoute } from "vue-router";

var converter = new showdown.Converter();
const analise = ref<any>({ dataLabels: [] });
const lists: any = ref([]);

const board = localStorage.board;
const apiKey = localStorage.apiKey;
const token = localStorage.token;

const route = useRoute();
const id = route.params.id;
const systemSavedsAnalises = localStorage.analises || "[]";

onMounted(() => {
  M.AutoInit();
  getLists();
  if (id && typeof id == "string") {
    getAnalysis(Number.parseInt(id));
  }
});

async function getAnalysis(id: number) {
  analise.value = await (
    await fetch(`http://localhost:3000/analyses/${id}`)
  ).json();
}

async function getLists() {
  try {
    const resp = await fetch(`http://localhost:3000/boards/${board}`);
    const json = await resp.json();
    lists.value = json["lists"];
  } catch (e) {
    lists.value = JSON.parse(localStorage.lists);
  }
}

const analysisContentPre = ref("");
const analysisContentPos = ref("");

function setMarkDown() {
  let preHtml = converter.makeHtml(analise.value.pre_planning) || "";
  let posHtml = converter.makeHtml(analise.value.pos_planning) || "";
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
  event?.preventDefault();
  if (analise.value.id) {
    updateForm(analise.value.id);
  } else {
    saveAnalise();
  }
}

async function updateForm(id: number) {
  await fetch(`http://localhost:3000/analyses/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      analysis: {
        name: analise.value.name,
        pre_planning: analise.value.pre_planning,
        pos_planning: analise.value.pos_planning,
      },
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  alert("Salvo");
  router.push({ path: `${publicPath}/analises` });
}

function setAnaliseCharts(analise: any) {
  return;
  analise.value.quantityJson = {
    labels: analise.value.labels,
    datasets: analise.value.dataLabels.map((label: string, index: number) => ({
      label,
      data: analise.value.labels.map(() => null),
      backgroundColor: labelColors[label] || "rgba(255, 255, 255, 0.2)",
      fill: index == 0 ? "start" : "-1",
    })),
  };
  analise.value.scoreJson = {
    labels: analise.value.labels,
    datasets: analise.value.dataLabels.map((label: string, index: number) => ({
      label,
      data: analise.value.labels.map(() => null),
      backgroundColor: labelColors[label] || "rgba(255, 255, 255, 0.2)",
      fill: index == 0 ? "start" : "-1",
    })),
  };
  analise.value.taskQuantity = {
    labels: analise.value.labels,
    datasets: analise.value.dataLabels.map((label: string, index: number) => ({
      label,
      data: analise.value.labels.map(() => null),
      backgroundColor: labelColors[label] || "rgba(255, 255, 255, 0.2)",
      fill: index == 0 ? "start" : "-1",
    })),
  };
  analise.value.taskScore = {
    labels: analise.value.labels,
    datasets: analise.value.dataLabels.map((label: string, index: number) => ({
      label,
      data: analise.value.labels.map(() => null),
      backgroundColor: labelColors[label] || "rgba(255, 255, 255, 0.2)",
      fill: index == 0 ? "start" : "-1",
    })),
  };
  return analise;
}

async function saveAnalise() {
  await fetch(`http://localhost:3000/analyses`, {
    method: "POST",
    body: JSON.stringify({
      lists: analise.value.dataLabels,
      board_id: board,
      analysis: {
        name: analise.value.name,
        pre_planning: analise.value.pre_planning,
        pos_planning: analise.value.pos_planning,
        start_date: analise.value.start_date,
        end_date: analise.value.end_date,
      },
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  alert("Salvo");
  router.push({ path: `${publicPath}/analises` });
}

function cancel() {
  router.back();
}

function changeLabels() {
  if (analise.value.start_date && analise.value.end_date) {
    const dates = [];
    const datesIntialDayString = analise.value.start_date.split("-");
    const datesFinalDayString = analise.value.end_date.split("-");

    const startDate = new Date(
      Date.UTC(
        parseInt(datesIntialDayString[0]),
        parseInt(datesIntialDayString[1]) - 1,
        parseInt(datesIntialDayString[2])
      )
    );
    let endDate = new Date(
      Date.UTC(
        parseInt(datesFinalDayString[0]),
        parseInt(datesFinalDayString[1]) - 1,
        parseInt(datesFinalDayString[2])
      )
    );
    endDate = new Date(endDate.setDate(endDate.getDate() + 1));
    if (startDate < endDate) {
      let currentDate = startDate;
      while (currentDate < endDate) {
        const date = currentDate
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/");
        dates.push(date);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
    }
    analise.value.labels = dates;
  }
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
                v-model="analise.pre_planning"
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
                v-model="analise.pos_planning"
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
            <div class="input-field col s11">
              <input
                id="initialDate"
                type="date"
                @change="changeLabels"
                v-model="analise.start_date"
                :disabled="!!id"
              />
              <label for="initialDate">Data início</label>
            </div>
          </div>
          <div class="col s6">
            <div class="input-field col s11">
              <input
                id="initialDate"
                type="date"
                @change="changeLabels"
                v-model="analise.end_date"
                :disabled="!!id"
              />
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
                      :value="list.id"
                      v-model="analise.dataLabels"
                      :disabled="!!id"
                    />
                    <span>{{ list.name }}</span>
                  </label>
                </div>
              </div>
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
        <!-- TODO: points edit -->
      </div>
    </div>
  </form>
</template>
