<template>
  <header>
    <h1>FIT TRACKER</h1>
    <IconButton icon="user" @click="toggleMenuHandler" />
    <div class="dropdown" v-if="isOpen && isLogged">
      <p @click="handleSignOut" v-if="isLogged">Logout</p>
    </div>
    <div class="dropdown" v-if="isOpen && !isLogged">
      <router-link :to="{ name: 'login' }" @click.native="toggleMenuHandler"
        >Login</router-link
      >
      <router-link :to="{ name: 'register' }" @click.native="toggleMenuHandler"
        >Create account</router-link
      >
    </div>
  </header>
</template>

<script lang="ts">
import { Ref, onMounted, ref } from "vue";
import { Auth, getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import IconButton from "../ui/IconButton.vue";
import router from "../../router";

export default {
  name: "MobileTop",
  components: { IconButton },
  setup() {
    const isLogged: Ref<boolean> = ref(false);
    let auth: Auth = getAuth();
    const isOpen: Ref<boolean> = ref(false);
    function toggleMenuHandler() {
      isOpen.value = !isOpen.value;
    }

    function closeDropdown() {
      isOpen.value = false;
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLogged.value = true;
      } else {
        isLogged.value = false;
      }
    });
    // onMounted(() => {
    //   auth = getAuth();
    // });
    function handleSignOut() {
      signOut(auth).then(() => {
        localStorage.clear();
        toggleMenuHandler();
        router.push({ name: "home" });
      });
    }
    return {
      isOpen,
      toggleMenuHandler,
      handleSignOut,
      isLogged,
      closeDropdown,
    };
  },
};
</script>
<style scoped>
header {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  color: var(--highlight2);
  z-index: 100;
}

.dropdown {
  position: absolute;
  top: 48px;
  right: 0px;
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: var(--background);
  padding: 8px 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 4px;
}

p,
a {
  margin: 8px 0;
  text-decoration: none;
  color: var(--highlight2);
}
</style>
