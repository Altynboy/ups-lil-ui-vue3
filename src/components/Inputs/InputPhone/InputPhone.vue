<template>
  <FormInput
    v-model="inputVal"
    :title="options.title"
    :rule="options.format"
    :tooltipMsg="options.tooltip"
    :max="options.maxlength"
    :min="options.minlength"
    :warningMsg="options.warn"
    :sintax="options.sintax"
    capitalize
    v-on="$listeners"
  ></FormInput>
</template>

<script>
import { validPhone } from "@/mixins/valid-rules.js";
import FormInput from "@/components/Base/FormInput/FormInput.vue";

export default {
  mixins: [validPhone],
  components: { FormInput },
  props: {
    value: {
      type: String,
    },
  },
  // method
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style></style>
