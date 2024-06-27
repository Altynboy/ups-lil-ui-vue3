<template>
  <Transition name="slide-fade" :duration="1000">
    <slot></slot>
  </Transition>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
.slide-fade-enter-active
  transition: all .6s ease

.slide-fade-leave-active
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter-from, .slide-fade-leave-to
  transform: translateY(10px)
  opacity: 0
</style>
