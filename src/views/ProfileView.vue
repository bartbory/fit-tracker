<template>
  <section>
    <h3 v-if="measurements.length >= 1">
      <span class="highlight"> {{ timeDistance() }} </span> days from last
      measures
    </h3>
    <div class="infobox" v-if="measurements.length <= 1">
      <nav-button
        name="measurement"
        mode="secondary"
        text="Dodaj pomiar"
      ></nav-button>
      <base-info
        ><p>
          After 2 measurements you gonna see your progress between two last
          measurements. <span class="highlight">Keep tracking!</span>
        </p></base-info
      >
    </div>
    <div class="container" v-else>
      <p class="description">Your progress between two last measurements</p>
      <base-card>
        <template #title
          ><div class="row--values">
            <h3>Weight</h3>
            <p class="changes">{{ showTwoLastMeasures("weight") }}</p>
            <h1 class="highlight">{{ changeCalc("weight") }} kg</h1>
          </div></template
        >
        <template #default>
          <div class="row--values">
            <p class="title" v-if="goalDiff > 0">
              <span class="highlight">{{ goalDiff }} kg</span> left to achieve
              your goal. Keep training!
            </p>
            <p class="title" v-else>
              <span class="highlight">You did it!!!</span> Good job!
            </p>
          </div>
        </template>
      </base-card>
      <base-card>
        <template #title><h3>Corpus circumferences</h3></template>
        <template #default>
          <div class="row--values">
            <p class="title">Neck:</p>
            <p class="changes">{{ showTwoLastMeasures("neck") }}</p>
            <h3 class="highlight">{{ changeCalc("neck") }} cm</h3>
          </div>
          <div class="row--values">
            <p class="title">Chest:</p>
            <p class="changes">{{ showTwoLastMeasures("chest") }}</p>
            <h3 class="highlight">{{ changeCalc("chest") }} cm</h3>
          </div>
          <div class="row--values">
            <p class="title">Waist:</p>
            <p class="changes">{{ showTwoLastMeasures("waist") }}</p>
            <h3 class="highlight">{{ changeCalc("waist") }} cm</h3>
          </div>
          <div class="row--values">
            <p class="title">Hips:</p>
            <p class="changes">{{ showTwoLastMeasures("hips") }}</p>
            <h3 class="highlight">{{ changeCalc("hips") }} cm</h3>
          </div>
        </template>
      </base-card>
      <base-card>
        <template #title><h3>Arms circumferences</h3></template>
        <template #default>
          <div class="row--values">
            <p class="title">Left biceps:</p>
            <p class="changes">{{ showTwoLastMeasures("leftArm") }}</p>
            <h3 class="highlight">{{ changeCalc("leftArm") }} cm</h3>
          </div>
          <div class="row--values">
            <p class="title">Right biceps:</p>
            <p class="changes">{{ showTwoLastMeasures("rightArm") }}</p>
            <h3 class="highlight">{{ changeCalc("rightArm") }} cm</h3>
          </div>
          <div class="row--values">
            <p class="title">Left forearm:</p>
            <p class="changes">{{ showTwoLastMeasures("leftForearm") }}</p>
            <h3 class="highlight">{{ changeCalc("leftForearm") }} cm</h3>
          </div>
          <div class="row--values">
            <p class="title">Right forearm:</p>
            <p class="changes">{{ showTwoLastMeasures("rightForearm") }}</p>
            <h3 class="highlight">{{ changeCalc("rightForearm") }} cm</h3>
          </div>
        </template></base-card
      >
      <base-card>
        <template #title><h3>Legs circumferences</h3></template>
        <template #default>
          <div class="row--values">
            <p class="title">Left thigh:</p>
            <p class="changes">{{ showTwoLastMeasures("leftThigh") }}</p>
            <h3 class="highlight">{{ changeCalc("leftThigh") }} cm</h3>
          </div>
          <div class="row--values">
            <p class="title">Right thigh:</p>
            <p class="changes">{{ showTwoLastMeasures("rightThigh") }}</p>
            <h3 class="highlight">{{ changeCalc("rightThigh") }} cm</h3>
          </div>
          <div class="row--values">
            <p class="title">Left calf:</p>
            <p class="changes">{{ showTwoLastMeasures("leftCalf") }}</p>
            <h3 class="highlight">{{ changeCalc("leftCalf") }} cm</h3>
          </div>
          <div class="row--values">
            <p class="title">Right calf:</p>
            <p class="changes">{{ showTwoLastMeasures("rightCalf") }}</p>
            <h3 class="highlight">{{ changeCalc("rightCalf") }} cm</h3>
          </div>
        </template>
      </base-card>
    </div>
    <nav-button v-if="measurements.length >= 2"
      class="cta--fixed"
      mode="secondary"
      text="Add new measurement"
      name="measurement"
    ></nav-button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, computed } from "vue";
import { Auth, getAuth } from "@firebase/auth";
import axios from "axios";
import { BodyMeasurement } from "../types";

export default defineComponent({
  name: "ProfileView",
  async setup() {
    const auth: Auth = getAuth();
    const uid = auth.currentUser?.uid;
    const isLoading: Ref<boolean> = ref(true);
    const measurements: Ref<BodyMeasurement[]> = ref([]);
    const goal: Ref<number> = ref(0);
    const dates: Ref<Date[]> = ref([]);
    const goalDiff = computed(() => {
      const lastIndex = measurements.value.length;
      const last = measurements.value[lastIndex - 1];
      if (last) {
        return last.weight - goal.value;
      } else {
        return 0;
      }
    });

    function changeCalc(key: keyof BodyMeasurement) {
      const lastIndex = measurements.value.length;
      if (measurements.value.length > 1) {
        return (
          measurements.value[lastIndex - 1][key] -
          measurements.value[lastIndex - 2][key]
        );
      } else {
        return measurements.value[lastIndex - 1][key];
      }
    }

    function showTwoLastMeasures(key: keyof BodyMeasurement) {
      const lastIndex = measurements.value.length;
      if (measurements.value.length > 1) {
        return `${measurements.value[lastIndex - 2][key]} ->
          ${measurements.value[lastIndex - 1][key]}`;
      } else {
        return measurements.value[lastIndex - 1][key];
      }
    }

    function timeDistance() {
      const lastIndex = dates.value.length;
      const last = new Date(dates.value[lastIndex - 1]);
      return (
        (new Date().getTime() - new Date(last).getTime()) /
        1000 /
        60 /
        60 /
        24
      ).toFixed(0);
    }

    onMounted(() => {
      isLoading.value = true;
      axios
        .get(
          `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json?auth=${auth.currentUser?.getIdToken()}`
        )
        .then((response) => {
          goal.value = response.data.details.weightGoal;
          const measures = response.data.measurements;
          for (const key in measures) {
            const measure = {
              chest: measures[key].chest,
              hips: measures[key].hips,
              neck: measures[key].neck,
              waist: measures[key].waist,
              weight: measures[key].weight,
              leftArm: measures[key].leftArm,
              rightArm: measures[key].rightArm,
              leftForearm: measures[key].leftForearm,
              rightForearm: measures[key].rightForearm,
              leftCalf: measures[key].leftCalf,
              rightCalf: measures[key].rightCalf,
              leftThigh: measures[key].leftThigh,
              rightThigh: measures[key].rightThigh,
            };

            dates.value.push(measures[key].date);

            measurements.value.push(measure);
          }
          isLoading.value = false;
        });
    });

    return {
      measurements,
      isLoading,
      goalDiff,
      goal,
      changeCalc,
      showTwoLastMeasures,
      timeDistance,
    };
  },
});
</script>

<style scoped>
.infobox {
  margin: 24px 0;
}
</style>
