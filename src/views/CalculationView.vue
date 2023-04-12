<template>
  <section>
    <p v-if="isLoading">Loading...</p>
    <div v-else>
      <BaseTab
        title="Gender"
        :options="tabOptions"
        :activeTab="gender"
        @setActiveTab="setGender"
      />
      <div class="form--row">
        <label>Birth year</label>
        <div class="controler">
          <IconButton icon="decrement" @click="age--" />
          <input type="number" inputmode="numeric" v-model.lazy="age" />
          <IconButton icon="increment" @click="age++" />
        </div>
      </div>
      <div class="form--row">
        <label>Height</label>
        <div class="controler">
          <IconButton icon="decrement" @click="height--" />
          <input type="number" inputmode="numeric" v-model.lazy="height" />
          <IconButton icon="increment" @click="height++" />
        </div>
      </div>
      <div class="form--row">
        <label>Weight</label>
        <div class="controler">
          <IconButton icon="decrement" @click="weight--" />
          <input type="number" inputmode="numeric" v-model.lazy="weight" />
          <IconButton icon="increment" @click="weight++" />
        </div>
      </div>
      <div class="form--row">
        <label>PAL</label>
        <div class="controler">
          <IconButton
            icon="decrement"
            @click="pal--"
            :class="[pal > 1 ? '' : 'disable']"
          />
          <input type="number" inputmode="numeric" max="6" v-model="pal" />
          <IconButton
            icon="increment"
            @click="pal++"
            :class="[pal < 6 ? '' : 'disable']"
          />
        </div>
      </div>
    </div>
    <base-info>
      <template #default>
        <p class="description">PAL - Physic activity level</p>
        <p class="description op60">{{ palDesc }}</p>
      </template>
    </base-info>
    <div class="container--row">
      <base-card>
        <template #title
          ><div class="row--values">
            <h2>BMI</h2>
            <h1 class="highlight">{{ bmi }}</h1>
          </div></template
        >
        <template #default>
          <div class="row--values">
            <p class="title">
              {{ bmiMessage }}
            </p>
          </div>
        </template>
      </base-card>
      <base-card>
        <template #title
          ><div class="row--values">
            <h2>BMR</h2>
            <h1 class="highlight">{{ bmr }} kcal</h1>
          </div></template
        >
      </base-card>
      <base-card>
        <template #title
          ><div class="row--values">
            <h2>CPM</h2>
            <h1 class="highlight">{{ calcCpm() }} kcal</h1>
          </div></template
        >
      </base-card>
    </div>
    <nav-button
      v-if="isLogged"
      class="cta--fixed"
      mode="secondary"
      text="Add new measurement"
      name="measurement"
    ></nav-button>
  </section>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref, onMounted, watch } from "vue";
import { IUser } from "../types";
import axios from "axios";
import { Auth, getAuth, onAuthStateChanged } from "@firebase/auth";
import BaseTab from "../components/ui/BaseTab.vue";
import IconButton from "../components/ui/IconButton.vue";
import palLevel from "../helpers/palLevel";

export default defineComponent({
  name: "CalculationView",
  setup() {
    const active = "tab--active";
    const isLoading: Ref<boolean> = ref(true);
    const data: Ref<IUser | null> = ref(null);
    const isLogged: Ref<boolean> = ref(false);
    const measurements: Ref<number[]> = ref([]);
    const lastIndex: Ref<number> = ref(-1);
    const age: Ref<number> = ref(18);
    const height: Ref<number> = ref(160);
    const weight: Ref<number> = ref(50);
    const pal: Ref<number> = ref(1);
    const gender: Ref<"male" | "female"> = ref("male");

    const tabOptions = [
      { id: 1, name: "Male", value: "male" },
      { id: 2, name: "Female", value: "female" },
    ];

    let bmi = computed(() => calcBmi(height, weight));
    let bmiMessage = computed(() => {
      if (bmi.value < 18.5) {
        if (bmi.value < 16) {
          return "Underweight: severe thinness";
        } else if (bmi.value < 16.99) {
          return "Underweight: moderate thinness";
        } else if (bmi.value < 18.49) {
          return "Underweight: mild thinness";
        }
      } else if (bmi.value >= 18.5 && bmi.value <= 24.99) {
        return "Normal";
      } else if (bmi.value >= 25) {
        if (bmi.value < 30) {
          return "Overweight: pre-obese";
        } else if (bmi.value < 35) {
          return "Overweight: Obese class I";
        } else if (bmi.value < 40) {
          return "Overweight: Obese class II";
        } else if (bmi.value >= 40) {
          return "Overweight: Obese class III";
        }
      }
    });
    const bmr: Ref<number> = computed(() =>
      calcBmr(height, weight, age, gender)
    );
    function setGender(g: "male" | "female") {
      gender.value = g;
    }
    function calcBmi(h: Ref<number>, w: Ref<number>): number {
      if (h.value > 0 && w.value > 0) {
        return +(+w.value / Math.pow(+h.value / 100, 2)).toFixed(2);
      } else {
        return 0;
      }
    }
    function calcBmr(
      h: Ref<number>,
      w: Ref<number>,
      a: Ref<number>,
      g: Ref<string>
    ): number {
      if (h.value === 0 || w.value === 0) {
        return 0;
      } else if (g.value === "male" && w && h && a) {
        return +(9.99 * w.value + 6.25 * h.value - 4.92 * a.value + 5).toFixed(
          0
        );
      } else if (g.value === "female" && w && h && a) {
        return +(
          9.99 * w.value +
          6.25 * h.value -
          4.92 * a.value -
          161
        ).toFixed(0);
      } else {
        return 0;
      }
    }

    function calcCpm() {
      switch (pal.value) {
        case 1:
          return (bmr.value * 1.0).toFixed(0);
        case 2:
          return (bmr.value * 1.2).toFixed(0);
        case 3:
          return (bmr.value * 1.4).toFixed(0);
        case 4:
          return (bmr.value * 1.6).toFixed(0);
        case 5:
          return (bmr.value * 1.8).toFixed(0);
        case 6:
          return (bmr.value * 2.0).toFixed(0);
        default:
          return (bmr.value * 1.0).toFixed(0);
          break;
      }
    }

    const palDesc = computed(() => palLevel(pal.value));

    onMounted(() => {
      const auth: Auth = getAuth();
      isLoading.value = true;
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isLogged.value = true;
          axios
            .get(
              `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}.json`
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
              pal.value = responseData.details.pal;
            });
        }
      });
      isLoading.value = false;
    });
    return {
      weight,
      height,
      gender,
      age,
      bmi,
      bmr,
      isLoading,
      setGender,
      active,
      tabOptions,
      pal,
      bmiMessage,
      calcCpm,
      palDesc,
      isLogged,
    };
  },
  components: { BaseTab, IconButton },
});
</script>

