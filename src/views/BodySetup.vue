<template>
  <section>
    <base-info
      >Add your body & life details, to help us measure your
      parameteres</base-info
    >
    <form @submit.prevent="submitForm">
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
          <input type="number" inputmode="numeric" v-model="birthYear" />
          <IconButton icon="increment" @click="birthYear++" />
        </div>
      </div>
      <div class="form--row">
        <label>Height [cm]</label>
        <div class="controler">
          <IconButton icon="decrement" @click="height--" />
          <input type="number" inputmode="decimal" v-model="height" />
          <IconButton icon="increment" @click="height++" />
        </div>
      </div>
      <div class="form--row">
        <label>Weight goal [kg]</label>
        <div class="controler">
          <IconButton icon="decrement" @click="weightGoal--" />
          <input type="number" inputmode="decimal" v-model="weightGoal" />
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
          <input type="number" inputmode="numeric" max="5" v-model="pal" />
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
      <base-button type="submit" mode="secondary" text="Zapisz"></base-button>
    </form>
  </section>
</template>

<script lang="ts">
import { Ref, defineComponent, ref } from "vue";
import updateDetails from "../helpers/updateDetails";
import { IUser, CustomInput } from "../types";
import BaseTab from "../components/ui/BaseTab.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import IconButton from "../components/ui/IconButton.vue";
import palLevel from "../helpers/palLevel";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "BodySetup",
  setup() {
    const router = useRouter();
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
    function submitForm() {
      const userDetails = {
        gender: gender.value,
        birthYear: birthYear.value,
        height: height.value,
        weightGoal: weightGoal.value,
        pal: pal.value,
      };
      updateDetails(userDetails);
      router.push({ name: "profile" });
    }

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
    };
  },
  components: { BaseTab, BaseInput, IconButton },
});
</script>
