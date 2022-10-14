<script setup lang="ts">
import { onMounted, ref } from "vue";
import M from "materialize-css";
import router from "@/router";

import { uuid, weekDay } from "@/utils";
import DashboardNav from "./dashboard/dashboard-nav.vue";
import AreaChart from "./dashboard/areaChart.vue";
import Config from "./dashboard/config.vue";
import showdown from "showdown";

const colors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(0, 255, 221, 0.2)",
  "rgba(229, 0, 255, 0.2)",
  "rgba(50, 255, 0, 0.2)",
  "rgba(75, 192, 192, 1)",
  "rgba(255, 140, 0, 0.7)",
  "rgba(255, 0, 0, 0.5)",
];

const board = localStorage.board;
const apiKey = localStorage.apiKey;
const token = localStorage.token;
const lists: any = ref([]);
const selectedLists = ref<any>([]);
const view = ref("dashboard");
const iintialDayString = ref("");
const finalDayString = ref("");
const chartType = ref("quantity");
const totalChartData = ref();
const tasksChartData = ref();
const activeAnalysis = ref();
let analysisContentPre = ref();
let analysisContentPos = ref();

var converter = new showdown.Converter();

let cards: any = [];
let dates: any = [];
let systemAnalises: any = [];

onMounted(() => {
  M.AutoInit();
  iintialDayString.value = localStorage.iintialDayString || "";
  finalDayString.value = localStorage.finalDayString || "";
  systemAnalises = JSON.parse(localStorage.analises);
  activeAnalysis.value = systemAnalises.find(
    (analysis: any) => analysis.status == "active"
  );
  setMarkDown();
  getLists().then(() => {
    mountChart();
  });
});

function getDates() {
  dates = [];
  const datesIntialDayString = iintialDayString.value.split("-");
  const datesFinalDayString = finalDayString.value.split("-");

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
}

async function updateDashboardData() {
  let dashboardData = localStorage.chartDatas || "{}";
  dashboardData = JSON.parse(dashboardData);

  const today = new Date();
  const date = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  )
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

  const updateChartData = {
    date,
    data: {},
  } as any;

  const labelIndex: any = activeAnalysis.value.quantityJson.labels.findIndex(
    (label: string) => label == updateChartData.date
  );

  try {
    await getLists();
    await getCards();
    alert("Atualizado");
    lists.value.forEach((list: any) => {
      const listCards = cards.filter((card: any) => card.idList == list.id);
      const labels = getListLabelsData(listCards);
      const cardsNumber = listCards.length;
      const cardsTasksNumber = listCards.filter((card: any) => {
        return !card.labels.find(
          (cardLabel: any) => cardLabel.name == "Rotina"
        );
      }).length;
      const points = listCards.reduce((a: any, b: any) => {
        const aPoints = a.points || a;
        const bPoints = b.points;
        return aPoints + bPoints;
      }, 0);
      updateChartData.data[list.name] = { cardsNumber, points, labels };
      if (activeAnalysis) {
        const datasetIndex =
          activeAnalysis.value.quantityJson.datasets.findIndex(
            (dataset: any) => dataset.label == list.name
          );

        if (datasetIndex >= 0) {
          activeAnalysis.value.quantityJson.datasets[datasetIndex].data[
            labelIndex
          ] = cardsNumber;
          activeAnalysis.value.taskQuantity.datasets[datasetIndex].data[
            labelIndex
          ] = cardsTasksNumber;
          activeAnalysis.value.scoreJson.datasets[datasetIndex].data[
            labelIndex
          ] = points;
        }
      }
    });
    localStorage.analises = JSON.stringify(systemAnalises);
    dashboardData[updateChartData.date] = updateChartData.data;
  } catch (e) {
    alert("Falha ao atualizado");
  }

  localStorage.chartDatas = JSON.stringify(dashboardData);
  totalChartData.value = getTotalChartData();
  tasksChartData.value = getTaskChartData();
}

function getListLabelsData(listCards: any) {
  const cardsLabels = listCards.map((card: any) =>
    card.labels.map((label: any) => label.name)
  );

  const listLabels = cardsLabels.reduce((init: any, label: any) => {
    return [...init, ...label];
  }, []);
  const uniqLabels = Array.from(new Set(listLabels));
  const labels = uniqLabels.map((label) => {
    const labelCards = listCards.filter((card: any) =>
      card.labels.find((cardLabel: any) => cardLabel.name == label)
    );
    return {
      name: label,
      count: labelCards.length,
    };
  });
  return labels;
}

// TODO: Voltar com gráfico sem rotina
function getTaskChartData() {
  let chartDatas = localStorage.chartDatas || "{}";
  chartDatas = JSON.parse(chartDatas);
  let datasets: any = lists.value.filter((list: any) => {
    return selectedLists.value.includes(list.name);
  });
  datasets = datasets.map((dataset: any, index: number) => {
    let data;
    data = dates.map((date: any) => {
      if (chartDatas[date]) {
        const cardsNumber = chartDatas[date][dataset.name].cardsNumber;
        const cardsLabels = chartDatas[date][dataset.name].labels || [];
        const cardsWithRotina = cardsLabels.find(
          (label: any) => label.name == "Rotina"
        );
        return cardsNumber - (cardsWithRotina ? cardsWithRotina.count : 0);
      } else {
        return null;
      }
    });
    return {
      label: dataset.name,
      data,
      backgroundColor: colors[index % 10],
      fill: index == 0 ? "start" : "-1",
    };
  });
  return {
    labels: dates,
    datasets: datasets,
  };
}

function getTotalChartData(dataChartType = "") {
  chartType.value = dataChartType || chartType.value;
  let chartDatas = localStorage.chartDatas || "{}";
  chartDatas = JSON.parse(chartDatas);
  let datasets: any = lists.value.filter((list: any) => {
    return selectedLists.value.includes(list.name);
  });
  let valuesType = "";
  switch (chartType.value) {
    case "quantity":
      valuesType = "cardsNumber";
      break;
    case "score":
      valuesType = "points";
      break;
    default:
      valuesType = "";
  }
  datasets = datasets.map((dataset: any, index: number) => {
    const data = dates.map((date: any) =>
      chartDatas[date] ? chartDatas[date][dataset.name][valuesType] : null
    );
    return {
      label: dataset.name,
      data,
      backgroundColor: colors[index % 10],
      fill: index == 0 ? "start" : "-1",
    };
  });

  return {
    labels: dates,
    datasets: datasets,
  };
}

async function getLists() {
  try {
    const resp = await fetch(
      `https://api.trello.com/1/boards/${board}/lists?key=${apiKey}&token=${token}`
    );
    lists.value = await resp.json();
  } catch (e) {
    lists.value = JSON.parse(localStorage.lists);
  }
}

async function getCards() {
  const resp = await fetch(
    `https://api.trello.com/1/boards/${board}/cards?key=${apiKey}&token=${token}`
  );
  const getCards = await resp.json();
  cards = getCards.map((card: any) => {
    const nameSlipetd = card.name.split(" ");
    const points = nameSlipetd[nameSlipetd.length - 1];
    card.points = 0;
    if (points[0] == "|") {
      card.points = parseInt(points.split("|").join(""));
    }
    return card;
  });
}

function mountChart() {
  if (localStorage.dashboardSelectedLists) {
    selectedLists.value = JSON.parse(localStorage.dashboardSelectedLists);
  }
  getDates();
  totalChartData.value = getTotalChartData();
  tasksChartData.value = getTaskChartData();
}

function changeView(newView: any) {
  view.value = newView;
  mountChart();
}

async function changeChartType() {
  totalChartData.value = getTotalChartData();
  tasksChartData.value = getTaskChartData();
}

function saveView() {
  const analise: any = {};
  analise.quantityJson = JSON.stringify(getTotalChartData("quantity"), null, 2);
  analise.scoreJson = JSON.stringify(getTotalChartData("score"), null, 2);
  localStorage.analise = JSON.stringify(analise);
  router.push({ path: "./analises-form" });
}

function setMarkDown() {
  let preHtml = converter.makeHtml(activeAnalysis.value.pre) || "";
  let posHtml = converter.makeHtml(activeAnalysis.value.pos) || "";
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
</script>

<template>
  <DashboardNav @changeView="changeView" />
  <div v-if="view == 'dashboard'">
    <div class="row">
      <div class="col s3">
        <div class="row">
          <div class="col s6">
            <label>
              <input
                v-model="chartType"
                @change="changeChartType"
                value="quantity"
                name="chartType"
                type="radio"
                checked
              />
              <span>Quantidade</span>
            </label>
          </div>
          <div class="col s6">
            <label>
              <input
                v-model="chartType"
                @change="changeChartType"
                value="score"
                name="chartType"
                type="radio"
              />
              <span>Pontuação</span>
            </label>
          </div>
        </div>
      </div>
      <div class="col s9 right-align">
        <button
          class="waves-effect waves-light btn"
          @click="updateDashboardData"
        >
          Atualizar
        </button>
      </div>
    </div>
    <div class="row" v-if="activeAnalysis">
      <div class="col s6">
        <AreaChart
          @changeChartType="changeChartType"
          :chartData="
            chartType == 'quantity'
              ? activeAnalysis.quantityJson
              : activeAnalysis.scoreJson
          "
          :chartId="'areaChart'"
          :title="'Total'"
        />
      </div>
      <div class="col s6">
        <AreaChart
          @changeChartType="changeChartType"
          :chartData="activeAnalysis.taskQuantity"
          :chartId="'areaChart1'"
          :title="'Tarefas'"
        />
      </div>
    </div>
    <div class="row" v-if="activeAnalysis">
      <div class="col s6" v-html="analysisContentPre"></div>
      <div class="col s6" v-html="analysisContentPos"></div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  width: 100% !important;
  height: 400px !important;
}
nav {
  margin-bottom: 20px;
  background-color: #26a69a;
}
.select-list {
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
pre {
  height: 300px;
  overflow-y: auto;
  border: solid 1px #aaa;
}

.top-2 {
  margin-top: 2rem;
}
</style>
