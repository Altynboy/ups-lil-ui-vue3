<template>
  <FormInput
    v-model="inputVal"
    :title="options.title"
    :rule="options.format"
    :tooltipMsg="options.tooltip"
    :max="options.maxlength"
    :min="options.maxlength"
    :warningMsg="options.warn"
    :sintax="options.sintax"
    capitalize
    column
    v-on="$listeners"
  ></FormInput>
</template>

<script>
import { validAcc } from "@/mixins/valid-rules.js";
import FormInput from "@/components/Base/FormInput/FormInput.vue";

export default {
  mixins: [validAcc],
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
