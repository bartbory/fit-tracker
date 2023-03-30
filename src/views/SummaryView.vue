<template>
  <section class="container">
    <p>Tutaj znajdziesz wykresy Twoich przemian</p>
    <div class="container--chart">
      <base-card>
        <h3>Waga</h3>
        <LineChart :data="dataWeight" :options="options" />
      </base-card>
    </div>
    <div class="container--chart">
      <base-card>
        <h3>Korpus</h3>
        <LineChart :data="data" :options="options" />
      </base-card>
    </div>
    <div class="container--chart">
      <base-card>
        <h3>Ręce</h3>
        <LineChart :data="dataArms" :options="options" />
      </base-card>
    </div>
    <div class="container--chart">
      <base-card>
        <h3>Nogi</h3>
        <LineChart :data="dataLegs" :options="options" />
      </base-card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, computed } from "vue";
import axios from "axios";
import LineChart from "../chart/LineChart.vue";
import { IBodyMeasurement } from "../types";

export default defineComponent({
  name: "SummaryView",
  components: { LineChart },
  async setup() {
    const uid = localStorage.getItem("uid");
    const isLoading = ref(true);
    const measurement: Ref<IBodyMeasurement[]> = ref([]);

    const options = {
      responsive: true,
      scales: {
        x: {
          grid: {
            color: "rgba(255,255,255,.15)",
          },
          ticks: {
            color: "rgba(255,255,255,.55)",
          },
        },

        y: {
          grid: {
            color: "rgba(255,255,255,.15)",
          },
          ticks: {
            color: "rgba(255,255,255,.55)",
          },
        },
      },
      elements: {
        point: { pointStyle: "rectRounded" },
        line: {
          borderColor: "rgba(255,255,255,.35)",
          borderWidth: 2,
          borderJoinStyle: "round",
          tension: 0.2,
          capBezierPoints: true,
        },
      },
      plugins: {
        legend: {
          display: true,
          color: "#ffffff",
          position: "right",
          labels: {
            align: "bottom",
            color: "#ffffff",
          },
        },
      },
    };

    const dataWeight = computed(() => {
      return {
        labels: measurement.value.map((m) =>
          new Date(m.date).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Waga",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.weight),
          },
        ],
      };
    });

    const data = computed(() => {
      return {
        labels: measurement.value.map((m) =>
          new Date(m.date).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Kark",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.neck),
          },
          {
            label: "Klatka piersiowa",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.chest),
          },
          {
            label: "Pas",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.waist),
          },
          {
            label: "Biodra",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.hips),
          },
        ],
      };
    });

    const dataArms = computed(() => {
      return {
        labels: measurement.value.map((m) =>
          new Date(m.date).toLocaleDateString()
        ),
        datasets: [
          {
            label: "P. biceps",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.rightArm),
          },
          {
            label: "L. biceps",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.leftArm),
          },
          {
            label: "P. przedramie",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.rightForearm),
          },
          {
            label: "L. przedramie",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.leftForearm),
          },
        ],
      };
    });

    const dataLegs = computed(() => {
      return {
        labels: measurement.value.map((m) =>
          new Date(m.date).toLocaleDateString()
        ),
        datasets: [
          {
            label: "P. udo",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.rightThigh),
          },
          {
            label: "L. udo",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.leftThigh),
          },
          {
            label: "P. łydka",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.rightCalf),
          },
          {
            label: "L. łydka",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            data: measurement.value.map((m) => m.leftCalf),
          },
        ],
      };
    });

    onMounted(() => {
      isLoading.value = true;
      axios
        .get(
          `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/measurements.json`
        )
        .then((response) => {
          for (const key in response.data) {
            const measure = {
              date: response.data[key].date,
              chest: response.data[key].chest,
              hips: response.data[key].hips,
              neck: response.data[key].neck,
              waist: response.data[key].waist,
              weight: response.data[key].weight,
              leftArm: response.data[key].leftArm,
              rightArm: response.data[key].rightArm,
              leftForearm: response.data[key].leftForearm,
              rightForearm: response.data[key].rightForearm,
              leftCalf: response.data[key].leftCalf,
              rightCalf: response.data[key].rightCalf,
              leftThigh: response.data[key].leftThigh,
              rightThigh: response.data[key].rightThigh,
            };

            measurement.value.push(measure);
          }
          isLoading.value = false;
        });
    });

    return {
      data,
      dataWeight,
      dataArms,
      dataLegs,
      measurement,
      isLoading,
      options,
    };
  },
});
</script>

<style scoped>
.container {
  margin: 40px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 48px;
}
.container--chart {
  width: 50%;
}
</style>
