<template>
  <svg :style="{ fill: iconColor }" :class="['icon', $attrs.class]" aria-hidden="true">
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
    iconColor: {
      type: String,
      required: false,
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
  fill: var(--icon-color, black);
}
</style>
