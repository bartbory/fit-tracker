<template>
  <p v-if="isLoading">Loading...</p>
  <form @submit.prevent="submitForm" v-else>
    <div class="form--row">
      <div class="tab__container">
        <div
          class="tab--selector"
          :class="[gender === 'male' ? active : '']"
          @click="setGender('male')"
        >
          <p>Męczyzna</p>
        </div>
        <div
          class="tab--selector"
          :class="[gender === 'female' ? active : '']"
          @click="setGender('female')"
        >
          <p>Kobieta</p>
        </div>
      </div>
    </div>
    <div class="form--row">
      <div class="form--input">
        <label>Rok urodzenia</label
        ><input v-model="birthYear" type="number" inputmode="numeric" />
      </div>
    </div>
    <div class="form--row">
      <div class="form--input">
        <label>Wzrost [cm]</label
        ><input v-model="height" type="number" inputmode="decimal" />
      </div>
    </div>
    <div class="form--row">
      <div class="form--input">
        <label>Cel wagowy [kg]</label
        ><input v-model="weightGoal" type="number" inputmode="decimal" />
      </div>
    </div>
    <button type="submit">Zaktualizuj</button>
  </form>
</template>

<script lang="ts">
import { Ref, defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import updateDetails from "../helpers/updateDetails";
import { IUser } from "../types";
import { getAuth } from "@firebase/auth";

export default defineComponent({
  name: "BodyDetails",
  setup() {
    const uid = localStorage.getItem("uid");
    const isLoading: Ref<boolean> = ref(true);
    const data: Ref<IUser | null> = ref(null);
    const gender: Ref<"male" | "female"> = ref("male");
    const birthYear: Ref<number> = ref(0);
    const height: Ref<number> = ref(0);
    const weightGoal: Ref<number> = ref(0);
    const active = ref("tab--active");

    function setGender(g: "male" | "female") {
      gender.value = g;
    }

    function submitForm() {
      const userDetails = {
        gender: gender.value,
        birthYear: birthYear.value,
        height: height.value,
        weightGoal: weightGoal.value,
      };
      console.log(userDetails);
      updateDetails(userDetails);
    }
    onMounted(() => {
      const auth = getAuth();

      isLoading.value = true;
      if (auth.currentUser) {
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
              isLoading.value = false;
            } else {
              data.value === null;
            }
          });
      }
    });

    return {
      data,
      gender,
      birthYear,
      height,
      weightGoal,
      submitForm,
      isLoading,
      setGender,
      active,
    };
  },
});
</script>

<style scoped>
.tab__container {
  width: 60%;
  display: flex;
  background-color: var(--highlight-15);
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--highlight-15);
  padding: 4px;
  margin-bottom: 16px;
}

.tab--selector {
  width: 50%;
  text-align: center;
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  transition: .5s;
}

.tab--active {
  background-color: var(--highlight);
  color: var(--font);
  font-weight: 700;
}
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
</style>
