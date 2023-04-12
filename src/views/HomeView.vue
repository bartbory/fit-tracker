<template>
  <div>
    <h1 class="highlight">FIT TRACKER</h1>
    <h3>Track the progress <br />of your transformation</h3>
    <nav-button mode="primary-alt" text="Login" name="login" />
    <nav-button mode="secondary-alt" text="Create account" name="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
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
h3 {
  margin: 40px 0;
  text-align: center;
}
</style>
