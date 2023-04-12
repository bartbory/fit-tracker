<template>
  <button type="button">
    <Icon :name="'ico_' + icon" color="var(--highlight2)" :size="16" />
  </button>
</template>

<script lang="ts">
import Icon from "../ui/Icon.vue";

export default {
  name: "IconButton",
  components: { Icon },
  props: {
    icon: { type: String, required: true },
  },
};
</script>

<style scoped>
button {
  display: block;
  height: 32px;
  width: 32px;
  background-color: var(--highlight-15);
  border: 1px solid var(--highlight-15);
  padding: 7px;
  border-radius: 16px;
}
</style>
