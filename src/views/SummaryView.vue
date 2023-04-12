<template>
  <section>
    <div class="container--chart">
      <base-card>
        <h3>Weight</h3>
        <LineChart :data="dataWeight" :options="options" />
      </base-card>
    </div>
    <div class="container--chart">
      <base-card>
        <h3>Corpus</h3>
        <LineChart :data="data" :options="options" />
      </base-card>
    </div>
    <div class="container--chart">
      <base-card>
        <h3>Arms</h3>
        <LineChart :data="dataArms" :options="options" />
      </base-card>
    </div>
    <div class="container--chart">
      <base-card>
        <h3>Legs</h3>
        <LineChart :data="dataLegs" :options="options" />
      </base-card>
    </div>
    <nav-button
      class="cta--fixed"
      mode="secondary"
      text="Add new measurement"
      name="measurement"
    ></nav-button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, computed } from "vue";
import axios from "axios";
import LineChart from "../chart/LineChart.vue";
import { IBodyMeasurement } from "../types";
import { Auth, getAuth } from "@firebase/auth";

export default defineComponent({
  name: "SummaryView",
  components: { LineChart },
  async setup() {
    const auth: Auth = getAuth();
    const uid = auth.currentUser?.uid;
    const isLoading: Ref<boolean> = ref(true);
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
          position: "bottom",
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
            label: "Weight",
            backgroundColor: `rgb(13, 100, 251)`,
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
            label: "Neck",
            backgroundColor: `rgb(13, 100, 251)`,
            data: measurement.value.map((m) => m.neck),
          },
          {
            label: "Chest",
            backgroundColor: `rgb(13, 20, 255)`,
            data: measurement.value.map((m) => m.chest),
          },
          {
            label: "Waist",
            backgroundColor: `rgb(13, 251, 237)`,
            data: measurement.value.map((m) => m.waist),
          },
          {
            label: "Hips",
            backgroundColor: `rgb(13, 201, 107)`,
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
            label: "Left biceps",
            backgroundColor: `rgb(13, 20, 255)`,
            data: measurement.value.map((m) => m.leftArm),
          },
          {
            label: "Right biceps",
            backgroundColor: `rgb(13, 100, 251)`,
            data: measurement.value.map((m) => m.rightArm),
          },
          {
            label: "Left forearm",
            backgroundColor: `rgb(13, 201, 107)`,
            data: measurement.value.map((m) => m.leftForearm),
          },
          {
            label: "Right forearm",
            backgroundColor: `rgb(13, 251, 237)`,
            data: measurement.value.map((m) => m.rightForearm),
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
            label: "Left thigh",
            backgroundColor: `rgb(13, 20, 255)`,
            data: measurement.value.map((m) => m.leftThigh),
          },
          {
            label: "Right thigh",
            backgroundColor: `rgb(13, 100, 251)`,
            data: measurement.value.map((m) => m.rightThigh),
          },

          {
            label: "Left calf",
            backgroundColor: `rgb(13, 201, 107)`,
            data: measurement.value.map((m) => m.leftCalf),
          },
          {
            label: "Right calf",
            backgroundColor: `rgb(13, 251, 237)`,
            data: measurement.value.map((m) => m.rightCalf),
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
  width: 100%;
}
</style>
