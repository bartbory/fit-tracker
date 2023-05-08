<template>
  <base-loading v-if="isLoading"></base-loading>
  <section v-else>
    <base-loading v-if="showProgress"></base-loading>
    <form @submit.prevent="submitForm" v-else>
      <BaseTab
        title="Gender"
        :options="tabOptions"
        :activeTab="gender"
        @setActiveTab="setGender"
      />
      <div class="form--row">
        <label>Birth year</label>
        <div class="controler">
          <IconButton icon="decrement" @click="birthYear--" />
          <input
            type="number"
            inputmode="numeric"
            min="1920"
            :max="new Date().getFullYear()"
            v-model="birthYear"
          />
          <IconButton icon="increment" @click="birthYear++" />
        </div>
      </div>
      <div class="form--row">
        <label>Height [cm]</label>
        <div class="controler">
          <IconButton icon="decrement" @click="height--" />
          <input
            type="number"
            inputmode="decimal"
            v-model="height"
            min="50"
            max="270"
          />
          <IconButton icon="increment" @click="height++" />
        </div>
      </div>
      <div class="form--row">
        <label>Weight goal [kg]</label>
        <div class="controler">
          <IconButton icon="decrement" @click="weightGoal--" />
          <input
            type="number"
            inputmode="decimal"
            v-model="weightGoal"
            min="20"
            step="0.1"
          />
          <IconButton icon="increment" @click="weightGoal++" />
        </div>
      </div>
      <div class="form--row">
        <label>PAL [1-6]</label>
        <div class="controler">
          <IconButton
            icon="decrement"
            @click="pal--"
            :class="[pal > 1 ? '' : 'disable']"
          />
          <input
            type="number"
            inputmode="numeric"
            min="1"
            max="6"
            v-model="pal"
          />
          <IconButton
            icon="increment"
            @click="pal++"
            :class="[pal < 6 ? '' : 'disable']"
          />
        </div>
      </div>
      <base-info>
        <template #default>
          <p class="description">PAL - Physic activity level</p>
          <p class="description op60">{{ palDesc }}</p>
        </template>
      </base-info>
      <p class="error" v-if="!formIsValid">{{ error }}</p>
      <base-info v-if="successMsg">
        <template #default>
          <p class="description">{{ successMsg }}</p>
        </template>
      </base-info>
      <base-button type="submit" text="Update" mode="secondary"></base-button>
    </form>
    <nav-button
      class="cta--fixed"
      mode="secondary"
      text="Add new measurement"
      name="measurement"
    ></nav-button>
  </section>
</template>

<script lang="ts">
import { Ref, defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import updateDetails from "../helpers/updateDetails";
import { IUser, CustomInput } from "../types";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import BaseTab from "../components/ui/BaseTab.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import IconButton from "../components/ui/IconButton.vue";
import palLevel from "../helpers/palLevel";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "BodyDetails",
  setup() {
    const uid = localStorage.getItem("uid");
    const formIsValid: Ref<boolean> = ref(true);
    const showProgress: Ref<boolean> = ref(false);
    const error: Ref<string> = ref("");
    const successMsg: Ref<string> = ref("");
    const isLoading: Ref<boolean> = ref(true);
    const data: Ref<IUser | null> = ref(null);
    const gender: Ref<"male" | "female"> = ref("male");
    const birthYear: Ref<number> = ref(1980);
    const height: Ref<number> = ref(160);
    const weightGoal: Ref<number> = ref(72);
    const pal: Ref<1 | 2 | 3 | 4 | 5 | 6> = ref(1);

    const tabOptions = [
      { id: 1, name: "Male", value: "male" },
      { id: 2, name: "Female", value: "female" },
    ];

    const inputsOptions: CustomInput[] = [
      {
        id: "birthYear",
        label: "Age",
        type: "number",
        inputMode: "numeric",
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        inputMode: "decimal",
      },
      {
        id: "weightGoal",
        label: "Weight goal",
        type: "number",
        inputMode: "decimal",
      },
      {
        id: "pal",
        label: "PAL",
        type: "number",
        inputMode: "numeric",
      },
    ];

    const palDesc = computed(() => palLevel(pal.value));

    function setAge(v: number) {
      birthYear.value + v;
    }
    function setGender(g: "male" | "female") {
      gender.value = g;
    }
    async function submitForm() {
      if (
        birthYear.value <= 1923 ||
        height.value >= 270 ||
        weightGoal.value <= 10 ||
        pal.value > 7 ||
        pal.value < 1
      ) {
        formIsValid.value === false;
        error.value = "Some data in form is out of possible range";
        return;
      }
      showProgress.value = true;
      const userDetails = {
        gender: gender.value,
        birthYear: birthYear.value,
        height: height.value,
        weightGoal: weightGoal.value,
        pal: pal.value,
      };
      await updateDetails(userDetails);
      showProgress.value = false;
      successMsg.value = "Your data have been updated";
      resetSuccessMsg();
    }

    function resetSuccessMsg() {
      setTimeout(() => {
        successMsg.value = "";
      }, 2500);
    }
    onMounted(() => {
      const auth = getAuth();
      isLoading.value = true;
      onAuthStateChanged(auth, (user) => {
        if (user) {
          axios
            .get(
              `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
            )
            .then((response) => {
              if (response.data.details) {
                const responseData = response.data;
                data.value = responseData;
                birthYear.value = responseData.details.birthYear;
                height.value = responseData.details.height;
                weightGoal.value = responseData.details.weightGoal;
                gender.value = responseData.details.gender;
                pal.value = responseData.details.pal;
                isLoading.value = false;
              } else {
                data.value === null;
                isLoading.value = false;
              }
            })
            .catch((error) => {
              isLoading.value = false;
              console.log(error);
            });
        }
      });
    });
    return {
      data,
      gender,
      birthYear,
      height,
      weightGoal,
      pal,
      submitForm,
      isLoading,
      setGender,
      tabOptions,
      inputsOptions,
      setAge,
      palDesc,
      formIsValid,
      showProgress,
      error,
      successMsg,
    };
  },
  components: { BaseTab, BaseInput, IconButton },
});
</script>
