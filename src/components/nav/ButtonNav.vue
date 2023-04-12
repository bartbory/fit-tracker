<template>
  <router-link :to="{ name: to }" exact-active-class="active">
    <Icon :name="'ico_' + icon" color="#ffffff" :size="16" />
    <p class="title">{{ title }}</p>
  </router-link>
</template>

<script lang="ts">
import Icon from "../ui/Icon.vue";
export default {
  name: "NavButton",
  components: { Icon },
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    to: { type: String, required: true },
  },
};
</script>

<style scoped>
a {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  flex: 1 0;
  background-color: var(--highlight-15);
  padding: 4px;
  justify-content: center;
  height: 100%;
  align-items: center;
  border: 1px solid var(--highlight);
  border-radius: 4px;
  color: var(--font);
  text-decoration: none;
}
.title {
  font-size: 10px;
}
.active {
  background-color: var(--highlight);
  border-radius: 4px;
}
</style>
