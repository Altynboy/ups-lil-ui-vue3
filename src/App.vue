<script>
// import InputIIN from '@/components/Inputs/InputIIN/InputIIN.vue'
import DefaultAlert from '@/components/Other/DefaultAlert/DefaultAlert.vue'
import InputEmail from './components/Inputs/InputEmail/InputEmail.vue'

export default {
  name: 'App',
  components: {
    // InputIIN,
    InputEmail,
    DefaultAlert
  },
  data() {
    return {
      iin: '',
      isClicked: true
    }
  }
}
</script>

<template>
  <main>
    <InputEmail v-model="iin" />
    <h1>Hello world</h1>
    <button @click="isClicked = true">Show alert</button>
    <DefaultAlert
      :is-clicked="isClicked"
      :message="'This is an alert'"
      :type="'success'"
      :use-store="false"
      @update:is-clicked="isClicked = false"
    ></DefaultAlert>
  </main>
</template>

<style scoped>
body {
  width: 100%;
  height: 100vh;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
