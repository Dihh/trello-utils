<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";

const props = defineProps<{
  chartData: any;
  chartId: string;
}>();

let chart: any = null;

let options = {
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
};

onMounted(() => {
  Chart.register(...registerables);
  mountChart();
});

watch(props, (newValue, oldValue) => {
  chart.data = props.chartData;
  console.log("here");
  chart.update();
});

function mountChart() {
  const currentChartData = props.chartData;
  const chartConfig: any = {
    type: "line",
    data: currentChartData,
    options: options,
  };
  const component: any = document.getElementById(props.chartId);
  try {
    const ctx = component.getContext("2d");
    chart = new Chart(ctx, chartConfig);
  } catch (e) {}
}
</script>

<template>
  <div class="row">
    <div class="col s12">
      <canvas :id="chartId"></canvas>
    </div>
  </div>
</template>
