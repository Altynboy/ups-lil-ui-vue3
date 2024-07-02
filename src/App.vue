<script>
// import InputIIN from '@/components/Inputs/InputIIN/InputIIN.vue'
import DefaultAlert from '@/components/Other/DefaultAlert/DefaultAlert.vue'
import InputEmail from './components/Inputs/InputEmail/InputEmail.vue'
import CustomTable from './components/Other/Table/CustomTable.vue'
import TableLite from './components/Other/Table/TableLite.vue'
import closeIcon from './assets/icons/close.svg'
import ModalWindow from './components/Other/ModalWindow/ModalWindow.vue'
import CustomSelect from './components/Other/Select/CustomSelect.vue'
import InputPassword from './components/Inputs/InputPassword/InputPassword.vue'
import BaseTransition from './components/Other/Transition/BaseTransition.vue'
import SpinnerLoader from './components/Spinners/SpinnerLoader.vue'

export default {
  name: 'App',
  components: {
    // InputIIN,
    InputEmail,
    DefaultAlert,
    CustomTable,
    TableLite,
    ModalWindow,
    CustomSelect,
    InputPassword,
    BaseTransition,
    SpinnerLoader
  },

  data() {
    return {
      iin: '',
      isClicked: false,
      showModal: false,
      options: [
        {
          text: 'Option 1',
          value: 1
        },
        {
          text: 'Option 2',
          value: 2
        },
        {
          text: 'Option 3',
          value: 3
        }
      ],

      pwd: '',
      show: false
    }
  },

  methods: {
    clickAction(i, j) {
      console.log(`Clicked on row ${i} and column ${j}`)
    },
    clickIcon(i, j) {
      console.log(`Clicked on icon ${i} and column ${j}`)
    },
    handleSelect(name, value) {
      console.log(name, value)
    }
  },

  computed: {
    tableData() {
      return {
        headers: [
          'Header 1',
          'Header 2',
          'Header 3'
          // , "Actions"
        ],
        data: [
          ['Data 1', 'Data 2', 'Data 3'],
          ['Data 4', 'Data 5', 'Data 6'],
          ['Data 7', 'Data 8', 'Data 9']
        ],
        buttons: {
          data: ['Edit', 'Delete']
        },
        icons: [
          { title: 'Icon 1', icon: closeIcon },
          { title: 'Icon 2', icon: closeIcon },
          { title: 'Icon 3', icon: closeIcon }
        ]
      }
    }
  }
}
</script>

<template>
  <main>
    <SpinnerLoader></SpinnerLoader>
    <InputEmail v-model="iin" label="Email" />
    <InputPassword v-model="pwd" />
    <h1>Hello world</h1>
    <button @click="showModal = true">Show alert</button>
    <CustomSelect :options="options" @chosed-option="handleSelect" label="My select"></CustomSelect>
    <DefaultAlert
      :is-clicked="isClicked"
      :message="'This is an alert'"
      :alert-type="'error'"
      :use-store="false"
      @update:is-clicked="isClicked = false"
    ></DefaultAlert>
    <CustomTable
      :table-data="tableData"
      :checkbox="true"
      :exp-row="true"
      :bottom-row="true"
      :class="'test-table'"
      @click-btn="clickAction"
      @click-icon="clickIcon"
    >
      <!-- <template v-slot:extrabutton>
        <button>Extra button</button>
      </template> -->
      <!-- <template v-slot:content>
        <p>Some content</p>
      </template> -->
      <template v-slot:extended-item="extData">
        <p>Extended row {{ extData.item[0] }}</p>
      </template>
      <template v-slot:bottom-row>
        <p>Bottom row</p>
      </template>
    </CustomTable>

    <TableLite :tableData="tableData" @click-icon="clickIcon"></TableLite>
    <ModalWindow :show="showModal" @close="showModal = false">
      <input />
      <template v-slot:btns>
        <button @click="showModal = false">Close</button>
      </template>
    </ModalWindow>
    <Transition name="fade">
      <h1 v-if="show">Transition</h1>
    </Transition>
    <button @click="show = !show">SHOW</button>
  </main>
</template>

<style lang="sass" scoped>
:root
  --vt-c-white: #ffffff
  --vt-c-white-soft: #f8f8f8
  --vt-c-white-mute: #f2f2f2
  --vt-c-black: #181818
  --vt-c-black-soft: #222222
  --vt-c-black-mute: #282828
  --vt-c-indigo: #2c3e50
  --vt-c-divider-light-1: rgba(60, 60, 60, 0.29)
  --vt-c-divider-light-2: rgba(60, 60, 60, 0.12)
  --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65)
  --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48)
  --vt-c-text-light-1: var(--vt-c-indigo)
  --vt-c-text-light-2: rgba(60, 60, 60, 0.80)
  --vt-c-text-dark-1: var(--vt-c-white)
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.80)
  --color-border: var(--vt-c-divider-light-2)
  --color-background: var(--vt-c-black)

body
  width: 100%
  height: 100vh


header
  line-height: 1.5


.logo
  display: block
  margin: 0 auto 2rem


.test-table
  color: red
  > table
    td
      color: red
      width: 50%

.fade-enter-active, .fade-leave-active
  transition: opacity 1s ease

.fade-enter-from, .fade-leave-to
  opacity: 0


@media (min-width: 1024px)
  header
    display: flex
    place-items: center
    padding-right: calc(var(--section-gap) / 2)


  .logo
    margin: 0 2rem 0 0


  header .wrapper
    display: flex
    place-items: flex-start
    flex-wrap: wrap
</style>
