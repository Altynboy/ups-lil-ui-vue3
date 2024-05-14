<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active
  transition: opacity 0.4s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
