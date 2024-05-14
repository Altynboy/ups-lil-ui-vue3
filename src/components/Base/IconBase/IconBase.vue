<template>
  <svg :class="['icon', customClass]" aria-hidden="true">
    <use :xlink:href="`#${iconId}`" />
  </svg>
</template>

<script>
export default {
  props: {
    iconId: {
      type: String,
      required: true
    },
    customClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.icon {
  width: 20px;
  height: 20px;
  /* fill: currentColor; */
  fill: black;
}
</style>
