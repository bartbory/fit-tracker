<template>
  <section>
    <h1>Twój postęp</h1>
    <div class="infobox" v-if="measurements.length <= 1">
      Tutaj znajdziesz swoje postępy, kiedy będziesz dodawać pomiary. Jeżeli
      jeszcze tego nie zrobiłeś,
      <router-link :to="{ name: 'measurement' }">dodaj je teraz</router-link>
    </div>
    <div class="container" v-else>
      <base-card>
        <template #title><h3>Waga</h3></template>
        <template #values>
          <div class="parent">
            <div class="div5">
              <p class="title">Zmiana wagi:</p>
              <p class="value">{{ changeCalc("weight") }} kg</p>
            </div>
            <div class="div6">
              <p class="title">Do celu pozostało:</p>
              <p class="value">{{ goalDiff }} kg</p>
            </div>
          </div>
        </template>
      </base-card>
      <base-card>
        <template #title><h3>Obwody korups</h3></template>
        <template #values>
          <div class="parent">
            <div class="div1">
              <p class="title">Kark:</p>
              <p class="value">{{ changeCalc("neck") }} cm</p>
            </div>
            <div class="div2">
              <p class="title">Klatka:</p>
              <p class="value">{{ changeCalc("chest") }} cm</p>
            </div>
            <div class="div3">
              <p class="title">Pas:</p>
              <p class="value">{{ changeCalc("waist") }} cm</p>
            </div>
            <div class="div4">
              <p class="title">Biodra:</p>
              <p class="value">{{ changeCalc("hips") }} cm</p>
            </div>
          </div>
        </template>
      </base-card>
      <base-card>
        <template #title><h3>Obwody ręce</h3></template>
        <template #values>
          <div class="parent">
            <div class="div1">
              <p class="title">Lewy biceps:</p>
              <p class="value">{{ changeCalc("leftArm") }} cm</p>
            </div>
            <div class="div2">
              <p class="title">Prawy biceps:</p>
              <p class="value">{{ changeCalc("rightArm") }} cm</p>
            </div>
            <div class="div3">
              <p class="title">Lewe przedramie:</p>
              <p class="value">{{ changeCalc("leftForearm") }} cm</p>
            </div>
            <div class="div4">
              <p class="title">Prawe przedramie:</p>
              <p class="value">{{ changeCalc("rightForearm") }} cm</p>
            </div>
          </div>
        </template></base-card
      >
      <base-card>
        <template #title><h3>Obwody nogi</h3></template>
        <template #values>
          <div class="parent">
            <div class="div1">
              <p class="title">Lewe udo:</p>
              <p class="value">{{ changeCalc("leftThigh") }} cm</p>
            </div>
            <div class="div2">
              <p class="title">Prawe udo:</p>
              <p class="value">{{ changeCalc("rightThigh") }} cm</p>
            </div>
            <div class="div3">
              <p class="title">Lewa łydka:</p>
              <p class="value">{{ changeCalc("leftCalf") }} cm</p>
            </div>
            <div class="div4">
              <p class="title">Prawa łydka:</p>
              <p class="value">{{ changeCalc("rightCalf") }} cm</p>
            </div>
          </div>
        </template>
      </base-card>
    </div>
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
    };
  },
});
</script>

<style scoped>
.container {
  margin-top: 48px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 48px;
  flex-wrap: wrap;
}

.container >>> .card {
  min-height: 160px;
  flex: 0 1 40%;
  justify-content: space-between;
}

.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  align-items: center;
  width: 100%;
}

.div1 {
  grid-area: 1 / 1 / 2 / 2;
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
}
.div3 {
  grid-area: 2 / 1 / 3 / 2;
}
.div4 {
  grid-area: 2 / 2 / 3 / 3;
}
.div5 {
  grid-area: 1/1/2/2;
}
.div6 {
  grid-area: 1/2/2/3;
}

.title {
  font-size: 12px;
}
</style>
