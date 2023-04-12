<template>
  <MobileTop v-if="$route.path !== '/home'" />
  <suspense>
    <router-view />
  </suspense>
  <MobileNav />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import router from "./router";
import TopMenu from "./components/nav/TopMenu.vue";
import MobileNav from "./components/nav/MobileNav.vue";
import MobileTop from "./components/nav/MobileTop.vue";
import { Auth, getAuth, onAuthStateChanged } from "@firebase/auth";

export default defineComponent({
  components: { TopMenu, MobileNav, MobileTop },
  setup() {
    const isLoading = ref(false);
    const isLogged = ref(false);
    onMounted(() => {
      const auth: Auth = getAuth();
      isLoading.value = true;
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isLogged.value = true;
          isLoading.value = false;
        }
      });
    });
    return { isLogged, isLoading };
  },
});
</script>

<style>
@import "./assets/styles.css";
</style>
