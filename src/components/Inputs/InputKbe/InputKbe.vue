<template>
  <FormInput
    v-model="inputVal"
    :label="label || options.title"
    :rule="options.format"
    :tooltipMsg="options.tooltip"
    :max="options.maxlength"
    :min="options.maxlength"
    :warningMsg="options.warn"
    :sintax="options.sintax"
    v-bind="$attrs"
  ></FormInput>
</template>

<script>
import { validKbe } from '@/mixins/valid-rules.js'
import FormInput from '@/components/Base/FormInput/FormInput.vue'

export default {
  mixins: [validKbe],
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
