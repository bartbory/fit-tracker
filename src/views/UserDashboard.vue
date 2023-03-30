<template>
  <h1>Cześć {{ name }} !</h1>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import axios from "axios";

export default defineComponent({
  name: "UserDashboard",
  setup() {
    const isLoading: Ref<boolean> = ref(false);
    const name: Ref<string | null> = ref("");
    const auth = getAuth();
    onMounted(() => {
      isLoading.value = true;
      onAuthStateChanged(auth, (user) => {
        if (user) {
          axios
            .get(
              `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${
                user.uid
              }.json?auth=${user.getIdToken()}`
            )
            .then((response) => {
              name.value = response.data.name;
            });
        }
      });
      isLoading.value = false;
    });
    return { name };
  },
});
</script>
