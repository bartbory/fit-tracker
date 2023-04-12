<template>
  <div class="nav__container">
    <ButtonNav icon="home" title="Home" :to="isLogged ? 'profile' : 'home'" />
    <ButtonNav icon="details" title="Details" to="details" v-if="isLogged" />
    <ButtonNav icon="track" title="Body tracker" to="summary" v-if="isLogged" />
    <ButtonNav icon="calculator" title="Calculator" to="calculation" />
  </div>
</template>

<script lang="ts">
import { Auth, getAuth, onAuthStateChanged } from "@firebase/auth";
import ButtonNav from "./ButtonNav.vue";
import { onMounted, ref } from "vue";

export default {
  name: "MobileNav",
  components: { ButtonNav },
  setup() {
    const isLogged = ref(false);

    const auth: Auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLogged.value = true;
      }
    });
    // onMounted(() => {
    // });
    return { isLogged };
  },
};
</script>

<style scoped>
.nav__container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: var(--background);
  padding: 2px;
  display: flex;
  column-gap: 2px;
  justify-content: space-evenly;
}
</style>
