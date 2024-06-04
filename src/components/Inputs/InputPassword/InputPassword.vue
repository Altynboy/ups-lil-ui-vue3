<template>
  <div class="input-password-container">
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="password"
      @input="updateValue"
      autocomplete="on"
    />
    <div class="icon" v-show="password" @click="showPassword">
      <IconBase :iconId="eye" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineEmits } from 'vue'
import IconBase from '@/components/Base/IconBase/IconBase.vue'
import eye from '@/assets/icons/eye.svg'

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Пароль'
  }
})

const emit = defineEmits(['update:modelValue'])

const password = ref('')

const updateValue = (event) => {
  password.value = event.target.value
  emit('update:modelValue', password.value)
}

watchEffect(() => {
  password.value = props.modelValue
})

const type = ref('password')
const showPassword = () => {
  if (type.value === 'password') {
    type.value = 'text'
  } else {
    type.value = 'password'
  }
}
</script>

<style lang="sass" scoped>
.input-password-container
    max-width: 350px
    height: 40px
    width: 100%

    display: flex
    justify-content: space-between
    background-color: #fff

    border: 1px solid #CCC

    &:focus-within
        // border: 0 !important
        box-shadow: 0 0 10px var(--color-box-shadow, #71a1ce)
        outline: 1px solid blue
        input
            outline: none
    input
        width: 100%
        padding-left: 12px
        border: 1px solid #ccc
        border: none
        font-size: 1rem
    .icon
        width: 25px
        height: 100%
        color: #666
        border: none
        font-size: 1.5rem

        display: flex
        align-items: center

        margin-right: 5px
        svg
            filter: invert(0.5)
        &:hover
            cursor: pointer
            svg
                filter: invert(0)
</style>
