<template>
  <base-loading v-if="isLoading"></base-loading>
  <div v-else>
    <h2>Track the progress <br />of your transformation</h2>
    <nav-button mode="primary-alt" text="Login" name="login" />
    <nav-button mode="secondary-alt" text="Create account" name="register" />
  </div>
</template>

<script lang="ts">
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const isLoading = ref(true);
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push({ name: "profile" });
        } else {
          isLoading.value = false;
        }
      });
    });
    return { isLoading };
  },
});
</script>

<style scoped>
div {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h2 {
  margin: 40px 0;
  text-align: center;
}
</style>
