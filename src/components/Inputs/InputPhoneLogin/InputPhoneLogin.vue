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
    :placeholder="options.placeholder"
    capitalize
    mobile
    v-on="$listeners"
  ></FormInput>
</template>

<script>
import { validLoginPhone } from "@/mixins/valid-rules.js";
import FormInput from "@/components/Base/FormInput/FormInput.vue";

export default {
  mixins: [validLoginPhone],
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
