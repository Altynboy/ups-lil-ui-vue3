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
    :placeholder="placeholder ? placeholder : options.placeholder"
    v-bind="$attrs"
  ></FormInput>
</template>

<script>
import { validFIO } from '@/mixins/valid-rules.js'
import FormInput from '@/components/Base/FormInput/FormInput.vue'

export default {
  mixins: [validFIO],
  components: { FormInput },
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      required: false
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style></style>
