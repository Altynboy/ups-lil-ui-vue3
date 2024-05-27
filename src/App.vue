<script>
// import InputIIN from '@/components/Inputs/InputIIN/InputIIN.vue'
import DefaultAlert from '@/components/Other/DefaultAlert/DefaultAlert.vue'
import InputEmail from './components/Inputs/InputEmail/InputEmail.vue'
import CustomTable from './components/Other/Table/CustomTable.vue'
import TableLite from './components/Other/Table/TableLite.vue'
import closeIcon from './assets/icons/close.svg'

export default {
  name: 'App',
  components: {
    // InputIIN,
    InputEmail,
    DefaultAlert,
    CustomTable,
    TableLite
  },

  data() {
    return {
      iin: '',
      isClicked: true
    }
  },

  methods: {
    clickAction(i, j) {
      console.log(`Clicked on row ${i} and column ${j}`)
    },
    clickIcon(i, j) {
      console.log(`Clicked on icon ${i} and column ${j}`)
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
    <InputEmail v-model="iin" />
    <h1>Hello world</h1>
    <button @click="isClicked = true">Show alert</button>
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
  </main>
</template>

<style lang="sass" scoped>

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
