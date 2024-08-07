<template>
  <div v-show="loading" class="lds-spinner" :style="{ width: `${size}px`, height: `${size}px` }">
    <div
      v-for="i in 12"
      :key="`lds-spinner-${i}`"
      :style="[
        spinnerStyleDuration,
        { transformOrigin: `${size * 0.5}px ${size * 0.5}px` },
        divsStyles[i - 1]
      ]"
    >
      <div class="div-after" v-bind:style="[spinnerStyle]"></div>
    </div>
  </div>
</template>

<script>
import validateDuration from './helpers/validateDuration.js'
import calcPropertyValue from './helpers/calcPropertyValue.js'

export default {
  name: 'SpinnerLoader',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 35
    },
    color: {
      type: String,
      default: '#3498db'
    },
    duration: {
      type: String,
      default: '1.2s',
      validator: validateDuration
    }
  },
  data() {
    return {
      spinnerStyleDuration: {
        animationDuration: this.duration
      },
      spinnerStyle: {
        top: `${this.size * 0.0375}px`,
        left: `${this.size * 0.4625}px`,
        width: `${this.size * 0.075}px`,
        height: `${this.size * 0.225}px`,
        background: this.color
      }
    }
  },
  computed: {
    divsStyles() {
      const divsStyles = []
      for (let i = 1; i <= 12; i++) {
        divsStyles.push(calcPropertyValue('animationDelay', this.duration, 0.083 * i - 1))
      }
      return divsStyles
    }
  }
}
</script>

<style scoped>
.lds-spinner {
  display: inline-block;
  position: relative;
}
.lds-spinner div {
  animation-name: lds-spinner;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.lds-spinner div .div-after {
  content: ' ';
  display: block;
  position: absolute;

  border-radius: 20%;
  background: #fff;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
