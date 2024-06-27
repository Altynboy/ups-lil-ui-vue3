<template>
  <Transition name="slide-fade" :duration="props.duration">
    <slot></slot>
  </Transition>
</template>

<script setup>
const props = defineProps({
  duration: {
    type: Number,
    default: 1000
  }
})
</script>

<style lang="sass" scoped>
@use "@/sass/transitions.sass"
</style>
