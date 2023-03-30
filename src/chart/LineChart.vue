<template>
  <Line :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "App",
  components: {
    Line,
  },
  props: ["data"],
  setup() {
    const options = {
      responsive: true,
    };
    return {
      options,
      //   data: {
      //     labels: ["January", "February", "March"],
      //     datasets: [{ data: [40, 20, 12] }],
      //   },
      //   options: {
      //     responsive: true,
      //   },
    };
  },
};
</script>
