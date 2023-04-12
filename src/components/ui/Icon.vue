<template>
  <icomoon :iconSet="iconSet" v-bind="props" />
</template>

<script lang="ts">
import { Icomoon } from "vue-icomoon";
import iconSet from "../../assets/selection.json";

export default {
  name: "App",
  components: {
    Icomoon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
      iconSet,
    };
  },
};
</script>
