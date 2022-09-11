<script setup lang="ts">
import { onMounted, ref } from "vue";
import M from "materialize-css";
import { uuid } from "@/utils";
import DashboardNav from "./dashboard/dashboard-nav.vue";
import AreaChart from "./dashboard/areaChart.vue";

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

let board = localStorage.board;
let apiKey = localStorage.apiKey;
let token = localStorage.token;
let analise = ref<any>({});
let lists = ref([]);
let selectedLists = ref<any>([]);
let view = ref("dashboard");
let iintialDayString = ref("");
let finalDayString = ref("");
let chartType = ref("quantity");
let totalChartData = ref();
let tasksChartData = ref();
let cards: any = [];
let dates: any = [];

onMounted(() => {
  M.AutoInit();
  if (localStorage.dashboardSelectedLists) {
    selectedLists.value = JSON.parse(localStorage.dashboardSelectedLists);
  }
  iintialDayString.value = localStorage.iintialDayString || "";
  finalDayString.value = localStorage.finalDayString || "";
  getLists().then(() => {
    mountChart();
  });
  getDates();
});

function getDates() {
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

  try {
    await getLists();
    await getCards();
    alert("Atualizado");
    lists.value.forEach((list: any) => {
      const listCards = cards.filter((card: any) => card.idList == list.id);
      const labels = getListLabelsData(listCards);
      const cardsNumber = listCards.length;
      const points = listCards.reduce((a: any, b: any) => {
        const aPoints = a.points || a;
        const bPoints = b.points;
        return aPoints + bPoints;
      }, 0);
      updateChartData.data[list.name] = { cardsNumber, points, labels };
    });
    dashboardData[updateChartData.date] = updateChartData.data;
  } catch (e) {
    alert("Falha ao atualizado");
  }

  localStorage.chartDatas = JSON.stringify(dashboardData);
  totalChartData.value = getTotalChartData();
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
  totalChartData.value = getTotalChartData();
  tasksChartData.value = getTaskChartData();
}

function chageView(newView: any) {
  view.value = newView;
  mountChart();
}

function setLists() {
  localStorage.dashboardSelectedLists = JSON.stringify(
    selectedLists.value.map((el: any) => el)
  );
}
function changeDate() {
  localStorage.iintialDayString = iintialDayString;
  localStorage.finalDayString = finalDayString;
}

async function changeChartType() {
  totalChartData.value = getTotalChartData();
}

function saveView() {
  analise.value.quantityJson = JSON.stringify(
    getTotalChartData("quantity"),
    null,
    2
  );
  analise.value.scoreJson = JSON.stringify(getTotalChartData("score"), null, 2);
  view.value = "save";
}

function cancelSave() {
  document.querySelector("form")?.reset();
  chageView("dashboard");
}

function saveAnalise() {
  event?.preventDefault();
  const systemSavedsAnalises = localStorage.analises || "[]";
  const analises = JSON.parse(systemSavedsAnalises);
  analise.value.id = uuid();
  analises.push(analise.value);
  localStorage.analises = JSON.stringify(analises);
  alert("Salvo");
  document.querySelector("form")?.reset();
  chageView("dashboard");
}
</script>

<template>
  <DashboardNav @changeView="chageView" />
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
    <AreaChart
      v-if="totalChartData"
      @changeChartType="changeChartType"
      :chartData="totalChartData"
      :chartId="'areaChart'"
    />
    <div class="row">
      <div class="col s12 right-align">
        <button
          class="waves-effect waves-light btn"
          @click="saveView"
          data-target="modal1"
        >
          Salvar
        </button>
      </div>
    </div>
    <AreaChart
      v-if="totalChartData"
      @changeChartType="changeChartType"
      :chartData="tasksChartData"
      :chartId="'areaChart1'"
    />
  </div>
  <div v-if="view == 'config'">
    <div class="row">
      <div class="col s3">
        <div class="input-field col s11">
          <input
            id="initialDate"
            type="date"
            v-model="iintialDayString"
            @change="changeDate()"
          />
          <label for="initialDate">Data início</label>
        </div>
      </div>
      <div class="col s3">
        <div class="input-field col s11">
          <input
            id="initialDate"
            type="date"
            v-model="finalDayString"
            @change="changeDate()"
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
                  :value="list.name"
                  @change="setLists()"
                  v-model="selectedLists"
                />
                <span>{{ list.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="view == 'save'">
    <form @submit="saveAnalise()">
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
                <label for="name">Nome:</label>
              </div>
            </div>
          </div>
          <div class="row form-button">
            <div class="col s12">
              <div class="input-field col s11">
                <textarea
                  id="obs"
                  v-model="analise.obs"
                  class="materialize-textarea validate"
                  placeholder=" "
                ></textarea>
                <label for="obs">Observações:</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <button
                type="button"
                @click="cancelSave"
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
          </pre>
        </div>
      </div>
    </form>
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
</style>