<template>
  <TopMenu />
  <suspense>
    <router-view />
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopMenu from "./components/nav/TopMenu.vue";

export default defineComponent({
  components: { TopMenu },
});
</script>

<style>
:root {
  --background: #09062a;
  --highlight: #6458ec;
  --highlight-15: rgba(100, 88, 236, 0.1);
  --font: #f6f2f9;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  color: var(--font);
  background-color: var(--background);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
section {
  max-width: 1140px;
  margin: 0 auto;
}

input,
select {
  margin: 16px 0;
  padding: 8px;
  color: var(--font);
  background: var(--highlight-15);
  border: 1px solid var(--highlight-15);
  border-radius: 8px;
}

.highlight {
  color: var(--highlight);
  font-weight: 700;
}

button {
  min-height: 32px;
  padding: 8px 16px;
  border: none;
  color: white;
  font-weight: 700;
  border-radius: 8px;
  background: var(--highlight);
  cursor: pointer;
}
</style>
