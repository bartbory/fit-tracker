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
import { ref } from "vue";

export default {
  name: "MobileNav",
  components: { ButtonNav },
  setup() {
    const isLogged = ref(false);

    const auth: Auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLogged.value = true;
      } else {
        isLogged.value = false;
      }
    });
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
  height: 80px;
  background-color: var(--background);
  padding: 16px 16px 16px;
  display: flex;
  column-gap: 8px;
  justify-content: space-evenly;
  z-index: 100;
}
</style>
