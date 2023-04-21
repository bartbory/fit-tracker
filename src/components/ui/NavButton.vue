<template>
  <router-link :to="{ name: name }" :class="mode" exact-active-class="active">{{
    text
  }}</router-link>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "NavButton",
  props: {
    text: { type: String, required: true },
    mode: {
      type: String as PropType<
        "primary" | "secondary" | "success" | "primary-alt" | "secondary-alt"
      >,
      required: true,
      validator(value: string) {
        return [
          "primary",
          "secondary",
          "success",
          "primary-alt",
          "secondary-alt",
        ].includes(value);
      },
    },
    name: { type: String, required: true },
  },
});
</script>

<style scoped>
a {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  height: 40px;
  margin: 8px 0;
}


.active {
  background-color: var(--highlight);
  border-radius: 4px;
}
</style>
