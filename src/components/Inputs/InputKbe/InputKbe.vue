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
    v-on="$listeners"
  ></FormInput>
</template>

<script>
import { validKbe } from "@/mixins/valid-rules.js";
import FormInput from "@/components/Base/FormInput/FormInput.vue";

export default {
  mixins: [validKbe],
  components: { FormInput },
  props: {
    value: {
      type: String,
    },
  },
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
