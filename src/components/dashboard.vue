<script lang="ts">
import { defineComponent } from "vue";
import { Chart, registerables } from "chart.js";
import M from "materialize-css";

let chart: any = null;
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

export default defineComponent({
  data() {
    return {
      board: localStorage.board,
      apiKey: localStorage.apiKey,
      token: localStorage.token,
      options: {
        scales: {
          y: {
            stacked: true,
          },
        },
        plugins: {
          filler: {
            propagate: false,
          },
          "samples-filler-analyser": {
            target: "chart-analyser",
          },
        },
        interaction: {
          intersect: false,
        },
      },
      chartData: {} as any,
      lists: [] as any,
      cards: [] as any,
      selectedLists: [] as any,
      dates: [] as any,
      view: "dashboard",
      iintialDayString: "",
      finalDayString: "",
      chartType: "quantity",
    };
  },
  mounted() {
    M.AutoInit();
    Chart.register(...registerables);
    if (localStorage.dashboardSelectedLists) {
      this.selectedLists = JSON.parse(localStorage.dashboardSelectedLists);
    }
    this.iintialDayString = localStorage.iintialDayString || "";
    this.finalDayString = localStorage.finalDayString || "";
    this.getDates();
    this.mountChart();
  },
  methods: {
    getDates() {
      const iintialDayString = this.iintialDayString.split("-");
      const finalDayString = this.finalDayString.split("-");

      const startDate = new Date(
        Date.UTC(
          parseInt(iintialDayString[0]),
          parseInt(iintialDayString[1]) - 1,
          parseInt(iintialDayString[2])
        )
      );
      let endDate = new Date(
        Date.UTC(
          parseInt(finalDayString[0]),
          parseInt(finalDayString[1]) - 1,
          parseInt(finalDayString[2])
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
          this.dates.push(date);
          currentDate = new Date(
            currentDate.setDate(currentDate.getDate() + 1)
          );
        }
      }
    },
    async update() {
      let chartDatas = localStorage.chartDatas || "{}";
      chartDatas = JSON.parse(chartDatas);

      await this.getLists();
      await this.getCards();

      const today = new Date();
      const date = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
      )
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");

      const chartData = {
        date,
        data: {},
      } as any;

      this.lists.forEach((list: any) => {
        const cardsNumber = this.cards.filter(
          (card: any) => card.idList == list.id
        ).length;
        const listCards = this.cards.filter(
          (card: any) => card.idList == list.id
        );
        const points = listCards.reduce((a: any, b: any) => {
          const aPoints = a.points || a;
          const bPoints = b.points;
          return aPoints + bPoints;
        }, 0);
        chartData.data[list.name] = { cardsNumber, points };
      });
      chartDatas[chartData.date] = chartData.data;
      localStorage.chartDatas = JSON.stringify(chartDatas);
      alert("Atualizado");
      chart.data = await this.getData();
      chart.update();
    },

    async mountChart() {
      this.chartData = await this.getData();
      const chartConfig: any = {
        type: "line",
        data: this.chartData,
        options: this.options,
      };
      const component: any = document.getElementById("myChart");
      const ctx = component.getContext("2d");
      chart = new Chart(ctx, chartConfig);
    },

    async getData() {
      await this.getLists();
      let chartDatas = localStorage.chartDatas || "{}";
      chartDatas = JSON.parse(chartDatas);

      let datasets = this.lists.filter((list: any) => {
        return this.selectedLists.includes(list.name);
      });
      let valuesType = "";
      switch (this.chartType) {
        case "quantity":
          valuesType = "cardsNumber";
          break;
        case "score":
          valuesType = "points";
          break;
        default:
          valuesType = "";
      }
      this.chartType == "quantity";
      datasets = datasets.map((dataset: any, index: number) => {
        const data = this.dates.map((date: any) =>
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
        labels: this.dates,
        datasets: datasets,
      };
    },

    async getLists() {
      const resp = await fetch(
        `https://api.trello.com/1/boards/${this.board}/lists?key=${this.apiKey}&token=${this.token}`
      );
      this.lists = await resp.json();
    },

    async getCards() {
      const resp = await fetch(
        `https://api.trello.com/1/boards/${this.board}/cards?key=${this.apiKey}&token=${this.token}`
      );
      const cards = await resp.json();
      this.cards = cards.map((card: any) => {
        const nameSlipetd = card.name.split(" ");
        const points = nameSlipetd[nameSlipetd.length - 1];
        card.points = 0;
        if (points[0] == "|") {
          card.points = parseInt(points.split("|").join(""));
        }
        return card;
      });
    },
    chageView(view: string) {
      this.view = view;
      this.mountChart();
    },
    setLists() {
      localStorage.dashboardSelectedLists = JSON.stringify(
        this.selectedLists.map((el: any) => el)
      );
    },
    changeDate() {
      localStorage.iintialDayString = this.iintialDayString;
      localStorage.finalDayString = this.finalDayString;
    },
    async chartTypeChange() {
      chart.data = await this.getData();
      chart.update();
    },
  },
});
</script>

<template>
  <nav class="nav-extended">
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab">
          <a href="#test1" @click="chageView('dashboard')">Dashboard</a>
        </li>
        <li class="tab">
          <a href="#test2" @click="chageView('config')">Configuração</a>
        </li>
      </ul>
    </div>
  </nav>
  <div v-if="view == 'dashboard'">
    <div class="row">
      <div class="col s3">
        <div class="row">
          <div class="col s6">
            <label>
              <input
                v-model="chartType"
                @change="chartTypeChange"
                value="quantity"
                name="group1"
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
                @change="chartTypeChange"
                value="score"
                name="group1"
                type="radio"
              />
              <span>Pontuação</span>
            </label>
          </div>
        </div>
      </div>
      <div class="col s9 right-align">
        <button class="waves-effect waves-light btn" @click="update">
          Atualizar
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <canvas id="myChart"></canvas>
      </div>
    </div>
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
</style>