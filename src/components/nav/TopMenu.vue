<template>
  <nav>
    <router-link to="/" v-if="!isLoggedIn"><p>Home</p></router-link>
    <router-link :to="{ name: 'profile' }" v-if="isLoggedIn"
      >Dashboard</router-link
    >
    <router-link :to="{ name: 'details' }" v-if="isLoggedIn"
      >Detale</router-link
    >
    <router-link :to="{ name: 'measurement' }" v-if="isLoggedIn"
      >Wymiary</router-link
    >
    <router-link :to="{ name: 'summary' }" v-if="isLoggedIn"
      >Efekty</router-link
    >
    <router-link :to="{ name: 'calculation' }">Kalkulator</router-link>
    <router-link :to="{ name: 'login' }" v-if="!isLoggedIn">Login</router-link>
    <button @click="handleSignOut" v-else>Wyloguj</button>
  </nav>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { Auth, getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from "../../router";

const isLoggedIn: Ref<boolean> = ref(false);
let auth: Auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
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
  padding: 30px;
  display: flex;
  justify-content: center;
  column-gap: 16px;
}

nav a {
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  color: var(--font);
  border-radius: 8px;
  background: var(--highlight);
}

nav a.router-link-exact-active {
  color: var(--highlight);
  border-radius: 8px;
  background: var(--font);
}
</style>
