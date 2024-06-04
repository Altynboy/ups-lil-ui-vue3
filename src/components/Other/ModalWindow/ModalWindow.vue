<template>
  <SlideTransition>
    <div
      v-if="showModal"
      class="modal-container"
      tabindex="0"
      :style="styleBg"
      ref="modalContainerRef"
      @keyup.esc="closeModal"
    >
      <div :class="['modal-window', $attrs.class]" :style="styleWin">
        <div class="header">
          <h2>
            {{ title }}
          </h2>
          <div
            v-if="closeIcon"
            ref="closeIconRef"
            tabindex="0"
            class="close-icon underline"
            @keydown.shift.tab.prevent=""
            @keyup.enter="closeModal"
            @click="closeModal"
          >
            <IconBase :iconId="close"></IconBase>
          </div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="btns-row">
          <slot name="btns"></slot>
        </div>
      </div>
    </div>
  </SlideTransition>
</template>

<script setup>
import { ref, watch, defineComponent, nextTick } from 'vue'
import SlideTransition from '../Transition/SlideTransition.vue'
import IconBase from '@/components/Base/IconBase/IconBase.vue'
import close from '@/assets/icons/close.svg'

defineComponent({
  name: 'ModalWindow'
})

const props = defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'Modal Window'
  },
  closeIcon: {
    type: Boolean,
    default: true
  },
  styleBg: {
    type: Object,
    default: () => ({})
  },
  styleWin: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

defineExpose({
  closeModal
})

const showModal = ref(false)
const closeIconRef = ref(null)
const modalContainerRef = ref(null)
watch(
  () => props.show,
  (newVal) => {
    showModal.value = newVal
    if (props.closeIcon && newVal) {
      nextTick(() => {
        closeIconRef.value.focus()
      })
    }
  },
  { immediate: true }
)
</script>

<style lang="sass" scoped>
@use "@/sass/underline.sass"

.modal-container
    width: 100%
    height: 100vh
    background-color: rgba(0, 0, 0, 0.5)

    position: fixed
    top: 0
    left: 0
    z-index: 9999


    display: flex
    justify-content: center
    align-items: center

    .modal-window
        width: 600px
        background-color: var(--color-background, white)
        border: 1px solid var(--color-border)

        padding-block: 2rem
        padding-inline: 2rem

        .header
            display: flex
            justify-content: space-between
            align-items: center
            margin-bottom: 1.5rem
            h2
                margin: 0
            .close-icon
                display: flex
                justify-content: center
                padding-block: 0.5rem
                padding-inline: 0.2rem
                &:focus-visible
                    outline: none
                    > svg
                        filter: brightness(0.8)
                svg
                    cursor: pointer
                    &:hover
                        filter: brightness(0.8)
</style>
