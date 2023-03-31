<template>
  <section>
    <h1>Kalkulator</h1>
    <p v-if="isLoading">Loading...</p>
    <div class="form--row" v-else>
      <div class="form--input">
        <label>Płeć</label>
        <select v-model.lazy="gender">
          <option value="male">Męczyzna</option>
          <option value="female">Kobieta</option>
        </select>
      </div>
      <div class="form--input">
        <label>Wiek</label
        ><input v-model.lazy="age" type="number" inputmode="decimal" />
      </div>
      <div class="form--input">
        <label>Wzrost [cm]</label
        ><input v-model.lazy="height" type="number" inputmode="decimal" />
      </div>
      <div class="form--input">
        <label>Waga [kg]</label
        ><input v-model.lazy="weight" type="number" inputmode="decimal" />
      </div>
    </div>
    <div class="results" v-if="height > 0 && weight > 0">
      <p>
        BMI: <span class="highlight">{{ bmi }}</span>
      </p>
      <p v-if="age > 0 && gender">
        BMR: <span class="highlight">{{ bmr }}</span>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref, onMounted, watch } from "vue";
import { IUser } from "../types";
import axios from "axios";
import { Auth, getAuth } from "@firebase/auth";
export default defineComponent({
  name: "CalculationView",
  setup() {
    // const uid = localStorage.getItem("uid");
    const auth: Auth = getAuth();
    const uid = auth.currentUser?.uid;
    const isLoading: Ref<boolean> = ref(true);
    const data: Ref<IUser | null> = ref(null);
    const measurements: Ref<number[]> = ref([]);
    const lastIndex: Ref<number> = ref(-1);
    let age: Ref<number> = ref(18);
    let height: Ref<number> = ref(50);
    let weight: Ref<number> = ref(160);

    let gender: Ref<string> = ref("male");
    let bmi = computed(() => calcBmi(height, weight));
    let bmr = computed(() => calcBmr(height, weight, age, gender));

    function calcBmi(h: Ref<number>, w: Ref<number>) {
      if (h.value > 0 && w.value > 0) {
        return (+w.value / Math.pow(+h.value / 100, 2)).toFixed(2);
      } else {
        return 0;
      }
    }

    function calcBmr(
      h: Ref<number>,
      w: Ref<number>,
      a: Ref<number>,
      g: Ref<string>
    ) {
      if (h.value === 0 || w.value === 0) {
        return 0;
      } else if (g.value === "male" && w && h && a) {
        return (9.99 * w.value + 6.25 * h.value - 4.92 * a.value + 5).toFixed(
          2
        );
      } else if (g.value === "female" && w && h && a) {
        return (9.99 * w.value + 6.25 * h.value - 4.92 * a.value - 161).toFixed(
          2
        );
      }
    }

    onMounted(() => {
      isLoading.value = true;
      const auth = getAuth();
      if (auth.currentUser) {
        axios
          .get(
            `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
          )
          .then((response) => {
            for (const key in response.data.measurements) {
              const measure = {
                id: key,
                weight: response.data.measurements[key].weight,
              };
              lastIndex.value++;
              measurements.value.push(measure.weight);
            }

            const responseData = response.data;
            data.value = responseData;
            age.value =
              new Date().getFullYear() - responseData.details.birthYear;
            height.value = responseData.details.height;
            weight.value = measurements.value[lastIndex.value];
            gender.value = responseData.details.gender;
          });
      }
      isLoading.value = false;
    });

    return { weight, height, gender, age, bmi, bmr, isLoading };
  },
});
</script>

<style scoped>
.form--row {
  margin: 0 auto;
  position: relative;
  width: 100%;
  max-width: 840px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
}
.form--input {
  position: relative;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
label {
  position: absolute;
  top: -4px;
  left: 16px;
  font-size: 12px;
  text-align: right;
  flex: 0 0 40%;
}
input,
select {
  flex: 0 0 100%;
}

.results {
  max-width: 840px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.results p {
  width: 50%;
  background: var(--highlight-15);
  padding: 16px 24px;
  border: 1px solid var(--highlight-15);
  border-radius: 8px;
  margin: 40px;
}
</style>
