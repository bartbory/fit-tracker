<template>
  <section>
    <form @submit.prevent="submitForm">
      <div class="form--row">
        <div class="form--input">
          <label>Kark</label
          ><input v-model="neck" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>Lewy biceps</label
          ><input v-model="leftArm" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
        <div class="form--input">
          <label>Prawy biceps</label
          ><input v-model="rightArm" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>Lewe przedramie</label
          ><input
            v-model="leftForearm"
            type="number"
            inputmode="decimal"
          /><span>cm</span>
        </div>
        <div class="form--input">
          <label>Prawe przedramie</label
          ><input
            v-model="rightForearm"
            type="number"
            inputmode="decimal"
          /><span>cm</span>
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>Klatka piersiowa</label
          ><input v-model="chest" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>Pas</label
          ><input v-model="waist" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>Biodra</label
          ><input v-model="hips" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>Lewe udo</label
          ><input v-model="leftThigh" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
        <div class="form--input">
          <label>Prawe udo</label
          ><input v-model="rightThigh" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>Lewa łydka</label
          ><input v-model="leftCalf" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
        <div class="form--input">
          <label>Prawa łydka</label
          ><input v-model="rightCalf" type="number" inputmode="decimal" /><span
            >cm</span
          >
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>Waga</label
          ><input v-model="weight" type="number" inputmode="decimal" /><span
            >kg</span
          >
        </div>
      </div>
      <button>Zapisz dane</button>
    </form>
  </section>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref } from "vue";
import sendBodyMeasure from "../helpers/sendBodyMeasure";
import { getAuth } from "@firebase/auth";
import axios from "axios";
import { BodyMeasurement } from "../types";

export default defineComponent({
  name: "BodyMeasurement",
  setup() {
    const weight: Ref<number> = ref(0);
    const neck: Ref<number> = ref(0);
    const leftArm: Ref<number> = ref(0);
    const rightArm: Ref<number> = ref(0);
    const leftForearm: Ref<number> = ref(0);
    const rightForearm: Ref<number> = ref(0);
    const leftThigh: Ref<number> = ref(0);
    const rightThigh: Ref<number> = ref(0);
    const leftCalf: Ref<number> = ref(0);
    const rightCalf: Ref<number> = ref(0);
    const chest: Ref<number> = ref(0);
    const waist: Ref<number> = ref(0);
    const hips: Ref<number> = ref(0);
    const isLoading: Ref<boolean> = ref(false);
    const lastIndex: Ref<number> = ref(-1);
    const measurements: Ref<BodyMeasurement[]> = ref([]);

    function submitForm() {
      const data = {
        weight: weight.value,
        neck: neck.value,
        leftArm: leftArm.value,
        rightArm: rightArm.value,
        leftForearm: leftForearm.value,
        rightForearm: rightForearm.value,
        leftThigh: leftThigh.value,
        rightThigh: rightThigh.value,
        leftCalf: leftCalf.value,
        rightCalf: rightCalf.value,
        chest: chest.value,
        waist: waist.value,
        hips: hips.value,
        date: new Date(),
      };

      sendBodyMeasure(data);
    }

    onMounted(() => {
      isLoading.value = true;
      const auth = getAuth();
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        axios
          .get(
            `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
          )
          .then((response) => {
            for (const key in response.data.measurements) {
              const measure = {
                chest: response.data.measurements[key].chest,
                hips: response.data.measurements[key].hips,
                neck: response.data.measurements[key].neck,
                waist: response.data.measurements[key].waist,
                weight: response.data.measurements[key].weight,
                leftArm: response.data.measurements[key].leftArm,
                rightArm: response.data.measurements[key].rightArm,
                leftForearm: response.data.measurements[key].leftForearm,
                rightForearm: response.data.measurements[key].rightForearm,
                leftCalf: response.data.measurements[key].leftCalf,
                rightCalf: response.data.measurements[key].rightCalf,
                leftThigh: response.data.measurements[key].leftThigh,
                rightThigh: response.data.measurements[key].rightThigh,
              };
              lastIndex.value++;
              measurements.value.push(measure);
            }
            chest.value = measurements.value[lastIndex.value].chest;
            hips.value = measurements.value[lastIndex.value].hips;
            neck.value = measurements.value[lastIndex.value].neck;
            waist.value = measurements.value[lastIndex.value].waist;
            weight.value = measurements.value[lastIndex.value].weight;
            leftArm.value = measurements.value[lastIndex.value].leftArm;
            rightArm.value = measurements.value[lastIndex.value].rightArm;
            leftForearm.value = measurements.value[lastIndex.value].leftForearm;
            rightForearm.value =
              measurements.value[lastIndex.value].rightForearm;
            leftCalf.value = measurements.value[lastIndex.value].leftCalf;
            rightCalf.value = measurements.value[lastIndex.value].rightCalf;
            leftThigh.value = measurements.value[lastIndex.value].leftThigh;
            rightThigh.value = measurements.value[lastIndex.value].rightThigh;
          });
        isLoading.value = false;
      }
    });

    return {
      weight,
      neck,
      leftArm,
      rightArm,
      leftForearm,
      rightForearm,
      leftThigh,
      rightThigh,
      leftCalf,
      rightCalf,
      chest,
      waist,
      hips,
      submitForm,
    };
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
  justify-content: center;
  align-items: center;
  column-gap: 40px;
}
.form--input {
  position: relative;
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
input {
  flex: 0 0 40%;
}
</style>
