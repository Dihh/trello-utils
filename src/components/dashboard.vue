<script lang="ts">
import { defineComponent } from "vue";
import { Chart, registerables } from "chart.js";

let chart: any = null;
const colors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(75, 192, 192, 0.9)",
  "rgba(255, 159, 64, 0.2)",
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
      listsSelecteds: ["Done", "Sexta", "Quinta", "Quarta", "Terça", "Segunda"],
      dates: [
        "31/07/2022",
        "01/08/2022",
        "02/08/2022",
        "03/08/2022",
        "04/08/2022",
        "05/08/2022",
        "06/08/2022",
        "07/08/2022",
      ],
    };
  },
  mounted() {
    Chart.register(...registerables);
    this.mountChart();
  },
  methods: {
    async update() {
      let chartDatas = localStorage.chartDatas || "{}";
      chartDatas = JSON.parse(chartDatas);

      await this.getLists();
      await this.getCards();

      let datasets = this.lists.filter((list: any) => {
        return this.listsSelecteds.includes(list.name);
      });

      const chartData = {
        date: new Date()
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/"),
        data: {},
      } as any;

      datasets.forEach((dataset: any, index: number) => {
        const cardsNumber = this.cards.filter(
          (card: any) => card.idList == dataset.id
        ).length;
        chartData.data[dataset.name] = cardsNumber;
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
        return this.listsSelecteds.includes(list.name);
      });
      datasets = datasets.map((dataset: any, index: number) => {
        const data = this.dates.map((date) =>
          chartDatas[date] ? chartDatas[date][dataset.name] : null
        );
        return {
          label: dataset.name,
          data,
          backgroundColor: colors[index],
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
      this.cards = await resp.json();
    },
  },
});
</script>

<template>
  <div class="row">
    <div class="col s12 right-align">
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
</template>

<style scoped>
canvas {
  width: 100% !important;
  height: 400px !important;
}
</style>