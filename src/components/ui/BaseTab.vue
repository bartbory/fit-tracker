<template>
  <div class="form--row">
    <label v-if="title">{{ title }}</label>
    <div class="tab__container">
      <div
        v-for="option in options"
        key="option.id"
        class="tab--selector"
        :class="[activeTab === option.value ? active : inactive]"
        @click="$emit('setActiveTab', option.value)"
      >
        <p>{{ option.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef } from "vue";

export default defineComponent({
  name: "TabSelector",
  emits: ["setActiveTab"],
  props: {
    options: {
      type: Array<{ name: String; value: String; id: Number }>,
      required: true,
    },
    activeTab: { type: String, required: true },
    title: { type: String, required: false },
  },
  setup(props) {
    const options = reactive(props.options);
    const activeTab = toRef(props, "activeTab");
    const active = "tab--active";
    const inactive = "tab--inactive";
    return {
      options,
      active,
      activeTab,
      inactive,
    };
  },
});
</script>

<style>
.tab__container {
  width: 100%;
  display: flex;
  background-color: var(--highlight-15);
  justify-content: center;
  align-items: center;
  height: 32px;
  border-radius: 4px;
  border: 1px solid var(--highlight-15);
  padding: 2px;
  flex-grow: 1;
  column-gap: 2px;
}

.tab--selector {
  max-width: 50%;
  text-align: center;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  border-radius: 2px;
  transition: 0.5s;
  font-size: 12px;
  flex-grow: 1;
}

.tab--active {
  background-color: var(--highlight);
  color: var(--font);
  font-weight: 700;
}
.tab--inactive {
  background-color: var(--highlight-15);
  border: 1px solid var(--highlight-15);
  color: var(--font);
  font-weight: 700;
}
</style>
