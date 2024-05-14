<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  name: "UserDevider",

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="sass" scoped>
div
  display: flex
  align-items: center
  width: 100%
  font-size: 14px
  box-sizing: border-box
  margin-block: 20px
  &::before, &::after
      content: ""
      flex: 1 1 0%
      height: 0.0625rem
      border-top: 0.0625rem solid rgb(206, 212, 218)
      margin-inline: 0.625rem
</style>
