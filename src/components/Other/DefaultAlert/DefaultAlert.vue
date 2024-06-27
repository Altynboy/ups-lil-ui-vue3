<template>
  <Transition name="slide-fade" :duration="250">
    <div
      v-show="useStore ? alertStore.isClicked : isClicked"
      tabindex="-1"
      ref="alertRef"
      :class="['ealert-container', $attrs.class]"
      @keydown.esc="hideSlot"
    >
      <div
        class="ealert-container__popup"
        :style="borderColor"
        :class="{ wide: useStore ? alertStore.height : wide }"
      >
        <div class="first">
          <IconBase :class="'alert-icon'" :iconId="alertIcon()" />
          <span>
            {{ useStore ? alertStore.text : alertText }}
          </span>
        </div>
        <div
          class="close underline"
          tabindex="0"
          ref="closeIconRef"
          @click="hideSlot"
          @keydown.shift.tab.prevent=""
          @keydown.enter="hideSlot"
        >
          <IconBase :class="'close-icon'" :iconId="iconClose" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import IconBase from '../../Base/IconBase/IconBase.vue'

import iconInfo from '@/assets/icons/info.svg'
import iconWarn from '@/assets/icons/warning.svg'
import iconError from '@/assets/icons/error.svg'
import iconSuccess from '@/assets/icons/success.svg'

import iconClose from '@/assets/icons/close.svg'

export default {
  components: {
    IconBase
  },

  inject: ['alertStore'],

  props: {
    'alert-type': {
      type: String,
      default: 'info'
    },
    useStore: {
      type: Boolean,
      default: true
    },
    'color-info': {
      type: String,
      default: '#2585EE'
    },
    'color-warning': {
      type: String,
      default: '#FFCF40'
    },
    'color-error': {
      type: String,
      default: '#F2363B'
    },
    'color-success': {
      type: String,
      default: '#22C993'
    },
    isClicked: {
      type: Boolean,
      default: false
    },
    'alert-text': {
      type: String,
      default: 'This is an alert'
    },
    wide: {
      type: Boolean,
      default: false
    },
    store: {
      type: String,
      default: 'pinia'
    },
    style: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      alertIcon: () => {
        const alertCase = this.useStore ? this.alertStore.type : this.alertType
        switch (alertCase) {
          case 'error':
            return iconError
          case 'warning':
            return iconWarn
          case 'success':
            return iconSuccess
          case 'info':
            return iconInfo
          default:
            return iconInfo
        }
      },
      iconClose: iconClose
    }
  },

  computed: {
    borderColor() {
      const alertCase = this.useStore ? this.alertStore.type : this.alertType
      let color = null
      switch (alertCase) {
        case 'error':
          color = this.colorError
          break
        case 'warning':
          color = this.colorWarning
          break
        case 'success':
          color = this.colorSuccess
          break
        case 'info':
          color = this.colorInfo
          break
      }

      let result = {
        borderLeft: '5px solid ' + color
      }

      if (this.style) {
        for (const key in this.style) {
          result[key] = this.style[key]
        }
      }
      return result
    }
  },

  methods: {
    hideSlot() {
      if (this.useStore) {
        if (this.alertStore.height) {
          this.alertStore.clickAlertWide(false)
        } else {
          this.alertStore.clickAlert(false)
        }
      } else {
        this.$emit('update:is-clicked', false)
      }
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.$refs.closeIconRef.focus()
    })
  },

  watch: {
    isClicked(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.closeIconRef.focus()
        })
      }
    },
    'alertStore.isClicked'(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.closeIconRef.focus()
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@use "@/sass/underline.sass"
@use "@/sass/transitions.sass"

.ealert-container
  width: 100%
  height: 100vh
  background-color: rgba(0, 0, 0, 0.5)
  // background-color: red

  position: fixed
  top: 0
  left: 0
  z-index: 9998

  display: flex
  justify-content: center
  align-items: center

  &__popup
    width: 520px
    height: 80px
    background: var(--color-background, #FFFFFF)
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
    padding: 25px

    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    .close
      cursor: pointer
      justify-self: flex-end
      display: flex
      align-items: center
      padding-block: 0.5rem
      padding-inline: 0.2rem
      &:focus-visible
        outline: none
      &:hover
        svg
          fill: black

    .first
      display: flex
      flex-direction: row
      display: flex
      align-items: center
      span
        color: #666

      > .alert-icon
          margin-right: 20px

      > h3
          color: #666666
          font-size: 25px
          line-height: 29px

  &__getfile
    color: let(--clr-main)
    display: flex
    flex-direction: row
    align-items: flex-end
    justify-content: flex-start
    margin-left: 77px

    span
      color: #999 !important
      padding: 0 0 4px 7px
      text-decoration: underline
      cursor: pointer
      font-size: 20px
      line-height: 23px

.wide
  height: 100px !important
  span
    margin-right: 10px

@media screen and ( max-width: 600px)
  .ealert-container
    &__popup
      padding: 12px
      width: 98%
      .first
        > .alert-icon
          margin-right: 10px
</style>
