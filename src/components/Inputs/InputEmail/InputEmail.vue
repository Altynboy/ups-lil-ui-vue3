<template>
  <FormInput
    v-model="inputVal"
    :placeholder="options.placeholder"
    :title="options.title"
    :rule="options.format"
    :tooltipMsg="options.tooltip"
    :max="options.maxlength"
    :min="options.minlength"
    :warningMsg="options.warn"
    :sintax="options.sintax"
    v-on="$listeners"
  ></FormInput>
</template>

<script>
import { validEmail } from "@/mixins/valid-rules.js";
import FormInput from "@/components/Base/FormInput/FormInput.vue";

export default {
  mixins: [validEmail],
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
