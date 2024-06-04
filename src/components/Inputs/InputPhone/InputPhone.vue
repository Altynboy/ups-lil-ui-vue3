<template>
  <FormInput
    v-model="inputVal"
    :label="label || options.title"
    :rule="options.format"
    :tooltipMsg="options.tooltip"
    :max="options.maxlength"
    :min="options.minlength"
    :warningMsg="options.warn"
    :sintax="options.sintax"
    capitalize
    v-bind="$attrs"
  ></FormInput>
</template>

<script>
import { validPhone } from '@/mixins/valid-rules.js'
import FormInput from '@/components/Base/FormInput/FormInput.vue'

export default {
  mixins: [validPhone],
  components: { FormInput },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  }
}
</script>

<style></style>
