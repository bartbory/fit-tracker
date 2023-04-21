<template>
  <button :type="type" :class="mode">{{ text }}</button>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "BaseButton",
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
    type: {
      type: String as PropType<"button" | "submit" | "reset">,
      required: false,
      default: "button",
      validator(value: string) {
        return ["button", "submit", "reset"].includes(value);
      },
    },
  },
});
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px auto;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  height: 40px;
  margin: 8px 0;
}

</style>
