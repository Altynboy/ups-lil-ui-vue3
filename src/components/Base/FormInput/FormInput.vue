<template>
  <div :class="[{ root: !column, 'root-column': column }]" :style="{ maxWidth: width }">
    <label v-if="label">{{ label }}</label>
    <div class="input-container">
      <div class="custom-input focus" :class="{ warning: tooltipFlag || warningFlag }">
        <span class="mobile" v-if="mobile">+</span>
        <input
          :class="{ mobile: mobile }"
          type="text"
          :value="modelValue"
          :maxlength="max"
          @input="handleInput"
          @keypress="checkSintax($event)"
          @keydown="handleKeyDown($event)"
          @paste="onPaste($event)"
          :placeholder="placeholder"
          :autocomplete="mobile ? 'username' : 'on'"
        />
        <VueTooltip
          v-if="tooltipFlag && tooltipMsg"
          class="tooltip"
          :text="tooltipMsg"
        ></VueTooltip>
      </div>
      <span class="warning-text" v-if="tooltipFlag">{{ warn }}</span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import VueTooltip from '@/components/Base/VueTooltip/VueTooltip.vue'

export default {
  components: {
    VueTooltip
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 30
    },
    min: {
      type: Number,
      default: 1
    },
    warningMsg: String,
    tooltipMsg: String,
    rule: {
      type: String,
      default: '^[0-9А-Яа-я\\-\\s]+$'
    },
    warningFlag: {
      type: Boolean,
      default: false
    },
    sintax: {
      type: String,
      default: '^[0-9А-Яа-я\\-\\s]$'
    },
    capitalize: Boolean,
    column: {
      type: Boolean,
      default: true
    },
    decimal: Boolean,
    placeholder: String,
    mobile: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '350px'
    }
  },

  setup(props, { emit }) {
    const tooltipFlag = ref(false)
    const warn = ref(props.warningMsg)

    watch(
      () => props.value,
      (newValue) => {
        if (newValue === null) {
          tooltipFlag.value = false
        }
      }
    )

    watch(
      () => tooltipFlag.value,
      (newValue) => {
        emit('valid', !newValue)
      },
      { immediate: true }
    )

    const handleInput = (event) => {
      let value = event.target.value

      if (props.mobile) {
        if (event.inputType == 'deleteContentBackward') {
          value = value.endsWith('-') ? value.slice(0, -1) : value
        } else if (event.inputType == 'insertFromPaste') {
          value = value.startsWith('+') ? value.slice(1) : value
        } else {
          if ([5, 9, 10, 12].includes(value.length) && value[value.length - 1] !== '-') {
            value = value.slice(0, -1) + '-' + value.slice(-1)
          }
        }
      } else {
        value = props.capitalize ? value.toUpperCase() : value
      }

      emit('update:modelValue', value)

      if (value === null) {
        tooltipFlag.value = false
        return
      }

      if (props.min && value.length < props.min && value.length > 0) {
        tooltipFlag.value = true
        return
      }

      if (value.length < 1) {
        warn.value = 'Заполните поле'
        tooltipFlag.value = true
        return
      }

      warn.value = props.warningMsg
      checkRule(value)
    }

    const checkRule = (value) => {
      tooltipFlag.value = !isFormatCorrect(value)
    }

    const isFormatCorrect = (value) => {
      if (!props.rule) {
        return true
      }
      let match = new RegExp(props.rule)
      return match.test(value)
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        // Handle the backspace key press here
        // console.log("Backspace key pressed");
        // console.log(event.target.value);
      }
    }

    const onPaste = (event) => {
      const value = event.clipboardData.getData('text')
      checkRule(value)
      if (!isFormatCorrect(value)) {
        event.preventDefault()
      }
    }

    const checkSintax = (event) => {
      const value = event.target.value
      let char = String.fromCharCode(event.keyCode)

      if (value.length < 1 && char == ' ') {
        event.preventDefault()
        return
      }

      let match = new RegExp(props.sintax)
      if (props.decimal && char == '.' && value.indexOf('.') > -1) {
        event.preventDefault()
        return
      }

      if (props.mobile && value.length == props.max) {
        return
      }

      if (match.test(char) && value.length < props.max) {
        return
      } else {
        event.preventDefault()
      }
    }

    return {
      tooltipFlag,
      warn,
      handleKeyDown,
      onPaste,
      handleInput,
      checkSintax
    }
  }
}
</script>

<style lang="sass" scoped>
.tooltip
  padding-right: 5px

input.mobile
  padding-left: 0
  font-size: 16px

span.mobile
  padding-left: 12px
  padding-right: 5px

input
  min-width: auto
  width: 350px
  height: 40px
  border: none
  padding-left: 12px
  background: transparent
  color: var(--color-text, #000)
  &:focus-visible
    outline: none
    box-shadow: none
    border: 0
  &::placeholder
    font-size: 16px

.focus:focus-within
  // border: 0 !important
  box-shadow: 0 0 10px var(--color-box-shadow, #71a1ce)
  outline: 1px solid blue

.root-column
  display: flex
  flex-direction: column
  width: 100%
  max-width: 350px
  > label
    margin-bottom: 0.5rem
    width: 100%

.root
  display: flex
  align-items: center
  width: 100%
  max-width: 350px
  > label
    margin-right: 1rem
    width: 100%
.warning
    border-color: red !important
    &:focus-within
        outline: none !important
        border:1px solid red !important
        box-shadow: 0 0 10px #ce7171 !important
    &-text
        color: red


.input-container
  display: flex
  flex-direction: column
  width: 100%

div.custom-input
  display: flex
  background-color: var(--color-background, #FFF)
  border: 1px solid var(--color-border, #CCC)
  align-items: center
  width: 100%

@media screen and ( max-width: 750px  )
    .root
      display: block

      > label
          margin: 0
          width: 100%

      input
        width: 100%

    .input-container
        width: 100%
</style>
