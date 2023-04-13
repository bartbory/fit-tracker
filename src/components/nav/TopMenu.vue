<template>
  <nav>
    <h1 class="highlight">FIT TRACKER</h1>
    <div class="navigation">
      <nav-button
        name="home"
        text="Home"
        mode="primary-alt"
        v-if="!isLogged"
      ></nav-button>
      <nav-button
        name="profile"
        mode="primary-alt"
        text="Dashboard"
        v-if="isLogged"
      />
      <nav-button
        name="details"
        mode="primary-alt"
        text="Details"
        v-if="isLogged"
      />
      <nav-button
        name="summary"
        mode="primary-alt"
        text="Body tracker"
        v-if="isLogged"
      />
      <nav-button name="calculation" mode="primary-alt" text="Calculator" />
      <nav-button
        name="login"
        mode="primary-alt"
        text="Login"
        v-if="!isLogged"
      />
      <base-button
        v-if="isLogged"
        @click="handleSignOut"
        text="Logout"
        mode="primary-alt"
      ></base-button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { Auth, getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from "../../router";
import NavButton from "../ui/NavButton.vue";

const isLogged: Ref<boolean> = ref(false);
let auth: Auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogged.value = true;
    } else {
      isLogged.value = false;
    }
  });
});

function handleSignOut() {
  signOut(auth).then(() => {
    localStorage.clear();
    router.push("/");
  });
}
</script>

<style scoped>
nav {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 16px;
}

.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  column-gap: 8px;
}
</style>
