<template>
  <TopMenu v-if="!isMobile()" :showMenu="$route.path !== '/user/body-setup'" />
  <MobileTop v-if="$route.path !== '/home' && isMobile()" />
  <MobileNav v-if="isMobile()" />
  <router-view v-slot="{ Component }">
    <Suspense>
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </Suspense>
  </router-view>
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
    function isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
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
    return { isLogged, isLoading, isMobile };
  },
});
</script>

<style>
@import "./assets/styles.css";
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
}

.v-enter-from {
  transform: translateX(-120%);
}
.v-leave-to {
  transform: translateX(120%);
}
.v-enter-to,
.v-leave-from {
  transform: translateX(0%);
}
</style>
