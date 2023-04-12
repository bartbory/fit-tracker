<template>
  <div class="form--row">
    <label>{{ option.label }}</label>
    <div class="controler">
      <!-- <IconButton icon="decrement" @click="$emit('decrement', -1)" /> -->
      <input
        type="type"
        inputmode="text"
        @input="$emit('update:modelValue', $event.target)"
      />
      <!-- <IconButton icon="increment" @click="$emit('increment', 1)" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import IconButton from "./IconButton.vue";

export default defineComponent({
  name: "Input",
  emits: ["increment", "decrement", "update:modelValue"],
  props: ["label", "type", "inputMode", "model"],
  setup(props) {
    const option = reactive(props);
    return {
      option,
    };
  },
  components: { IconButton },
});
</script>

<style scoped>
.controler {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  column-gap: 8px;
  flex: 0 1 60%;
}

.controler input {
  max-width: calc(100% - 2 * 8px - 64px);
  text-align: center;
  padding: 8px 0;
}
</style>
