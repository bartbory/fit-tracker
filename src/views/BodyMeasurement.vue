<template>
  <base-loading v-if="isLoading"></base-loading>
  <section v-else>
    <form @submit.prevent="submitForm">
      <div class="form--row">
        <label>Weight [kg]</label>
        <div class="controler">
          <IconButton icon="decrement" @click="weight--" />
          <input v-model="weight" type="number" inputmode="decimal" />
          <IconButton icon="increment" @click="weight++" />
        </div>
      </div>
      <BaseTab
        :options="tabOptions"
        :activeTab="activeTab"
        @setActiveTab="setActiveTab"
      />
      <div v-if="activeTab === 'corpus'">
        <div class="form--row">
          <label>Neck [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="neck--" />
            <input v-model="neck" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="neck++" />
          </div>
        </div>
        <div class="form--row">
          <label>Chest [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="chest--" />
            <input v-model="chest" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="chest++" />
          </div>
        </div>
        <div class="form--row">
          <label>Waist [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="waist--" />
            <input v-model="waist" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="waist++" />
          </div>
        </div>
        <div class="form--row">
          <label>Hips [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="hips--" />
            <input v-model="hips" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="hips++" />
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'arms'">
        <div class="form--row">
          <label>Left biceps [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="leftArm--" />
            <input v-model="leftArm" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="leftArm++" />
          </div>
        </div>
        <div class="form--row">
          <label>Right biceps [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="rightArm--" />
            <input v-model="rightArm" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="rightArm++" />
          </div>
        </div>
        <div class="form--row">
          <label>Left forearm [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="leftForearm--" />
            <input v-model="leftForearm" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="leftForearm++" />
          </div>
        </div>
        <div class="form--row">
          <label>Right forearm [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="rightForearm--" />
            <input v-model="rightForearm" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="rightForearm++" />
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'legs'">
        <div class="form--row">
          <label>Left thigh [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="leftThigh--" />
            <input v-model="leftThigh" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="leftThigh++" />
          </div>
        </div>
        <div class="form--row">
          <label>Right thigh [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="rightThigh--" />
            <input v-model="rightThigh" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="rightThigh++" />
          </div>
        </div>
        <div class="form--row">
          <label>Left calf [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="leftCalf--" />
            <input v-model="leftCalf" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="leftCalf++" />
          </div>
        </div>
        <div class="form--row">
          <label>Right calf [cm]</label>
          <div class="controler">
            <IconButton icon="decrement" @click="rightCalf--" />
            <input v-model="rightCalf" type="number" inputmode="decimal" />
            <IconButton icon="increment" @click="rightCalf++" />
          </div>
        </div>
      </div>

      <base-button
        mode="secondary"
        text="Save data"
        type="submit"
      ></base-button>
    </form>
  </section>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref } from "vue";
import sendBodyMeasure from "../helpers/sendBodyMeasure";
import { getAuth } from "@firebase/auth";
import axios from "axios";
import { BodyMeasurement } from "../types";
import BaseTab from "../components/ui/BaseTab.vue";
import IconButton from "../components/ui/IconButton.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "BodyMeasurement",
  setup() {
    const router = useRouter();

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
    const activeTab: Ref<"corpus" | "arms" | "legs"> = ref("corpus");

    const tabOptions = [
      { id: 1, name: "Corpus", value: "corpus" },
      { id: 2, name: "Arms", value: "arms" },
      { id: 3, name: "Legs", value: "legs" },
    ];

    function setActiveTab(v: "corpus" | "arms" | "legs") {
      activeTab.value = v;
    }

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
      router.push({ name: "profile" });
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
      tabOptions,
      setActiveTab,
      activeTab,
      isLoading,
    };
  },
  components: { BaseTab, IconButton },
});
</script>

<style scoped>
form {
  row-gap: 16px;
}
button.secondary {
  margin-top: 48px;
}
</style>
