<template>
  <router-link :to="{ name: name }" :class="mode">{{ text }}</router-link>
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
  padding: 12px auto;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  min-width: 50%;
  height: 40px;
  margin: 8px 0;
}

.primary {
  background-color: var(--highlight);
  border: 1px solid var(--highlight-15);
  color: var(--font);
}
.secondary {
  background-color: var(--highlight2);
  border: 1px solid var(--highlight2-15);
  color: var(--background);
}
.primary-alt {
  background-color: var(--highlight-15);
  border: 1px solid var(--highlight-15);
  color: var(--font);
}
.secondary-alt {
  background-color: var(--highlight2-15);
  border: 1px solid var(--highlight2-15);
  color: var(--font);
}
</style>
