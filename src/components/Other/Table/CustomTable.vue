<template>
  <div
    :class="['table-section-iLS', $attrs.class]"
    v-if="tableData && Object.keys(tableData).length > 0"
  >
    <h1 v-if="name">{{ name }}</h1>
    <slot name="filters"></slot>
    <span v-if="!tableData">No data</span>
    <table v-show="!hideTable" class="table-iLS" v-else>
      <thead>
        <tr>
          <th v-for="(item, i) in tableData.headers" :key="i" :style="thStyle">{{ item }}</th>
          <slot name="header"></slot>
          <template v-if="'buttons' in tableData">
            <th :style="thStyle">{{ tableData.buttons.header }}</th>
          </template>
          <slot name="last-header"></slot>
          <template v-if="last">
            <th :style="thStyle">Подробнее</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, i) in tableData.data" :key="i">
          <tr class="table__row">
            <slot name="content"></slot>
            <template v-if="'icons' in tableData">
              <td v-for="(icon, j) in tableData.icons" :key="icon.title">
                <div @click="clickIcon(i, j)" class="icons">
                  <IconBase :iconId="icon.icon" :class="'table-icon'"></IconBase>
                </div>
              </td>
            </template>
            <template v-if="'parsingErrors' in tableData">
              <td>{{ tableData.parsingErrors[i].msg }}</td>
            </template>
            <template
              v-else-if="
                tableData.parsingErrors !== undefined && tableData.parsingErrors.length < 1
              "
            >
              <td>Ok</td>
            </template>
            <template v-if="'errors' in tableData">
              <template v-for="(item_td, j_td) in item" :key="j_td">
                <td
                  :class="{
                    warning:
                      item_td == '' && tableData.errors[i].length > 0 && j_td == tableData.errors[i]
                  }"
                >
                  {{ item_td }}
                </td>
              </template>
            </template>
            <template v-else>
              <td v-if="checkbox && specificCheckbox && specificCheckbox[i]">
                <div class="clm-flex">
                  <label class="checkbox__container">
                    <input v-model="checkboxList[i]" tabindex="-1" type="checkbox" />
                    <span
                      class="checkmark"
                      tabindex="0"
                      @keyup.enter="handleEnterCheckbox(i)"
                    ></span>
                  </label>
                </div>
              </td>
              <!-- <td v-else-if="checkbox"></td> -->
              <td @click="expandRow(i)" v-for="(item_td, j_td) in item" :key="j_td">
                <div
                  :class="{
                    'clm-start': justifyStart && j_td == 'Name',
                    'clm-flex': j_td != 'Name'
                  }"
                >
                  <template v-if="justifyStart && j_td == 'Name'">
                    <IconBase :iconName="item_td"></IconBase>
                  </template>
                  <div>{{ item_td }}</div>
                </div>
              </td>
            </template>
            <template v-if="'buttons' in tableData">
              <td>
                <template v-if="!customBtn">
                  <a
                    :style="actionStyle"
                    class="btn underline"
                    @keyup.enter="clickAction(i, j)"
                    @click="clickAction(i, j)"
                    v-for="(button, j) in tableData.buttons.data"
                    :key="j"
                    >{{ button }}</a
                  >
                </template>
                <template v-else>
                  <span v-if="!specificBtn">Нельзя отменить!</span>
                  <a
                    v-else
                    :style="actionStyle"
                    class="btn underline"
                    @click="clickAction(i, j)"
                    v-for="(button, j) in tableData.buttons.data"
                    :key="j"
                    >{{ button }}</a
                  >
                </template>
              </td>
            </template>
            <template v-if="last">
              <td @click="expandRow(i)">
                <IconBase
                  :class="{
                    'rotate-up': !isRowExpanded[i],
                    'rotate-down': isRowExpanded[i]
                  }"
                  :iconName="blueArrow ? 'blue-arrow' : 'subtract'"
                ></IconBase>
              </td>
            </template>
          </tr>
          <transition name="table">
            <template v-if="isRowExpanded[i]">
              <tr :key="-(i + 1)">
                <slot name="extended-item" :item="item"></slot>
              </tr>
            </template>
          </transition>
        </template>
        <template v-if="bottomRow">
          <tr>
            <td>
              <slot name="bottom-row" class="bottom-row"></slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import IconBase from '@/components/Base/IconBase/IconBase.vue'

export default {
  name: 'CustomTable',

  components: {
    IconBase
  },

  props: {
    name: {
      type: String
    },
    'table-data': {
      type: Object
    },
    'hide-table': {
      default: false,
      required: false
    },
    checkbox: {
      default: false
    },
    'specific-checkbox': {
      required: false,
      default: () => []
    },
    'specific-btn': {
      default: false,
      required: false
    },
    'custom-btn': {
      default: false
    },
    'exp-row': {
      required: false,
      type: Boolean,
      default: false
    },
    'bottom-row': {
      default: false
    },
    'close-all': {
      required: false
    },
    last: {
      type: Boolean
    },
    'blue-arrow': {
      type: Boolean,
      default: true
    },
    'justify-start': {
      type: Boolean
    },
    'th-style': {
      type: Object
    },
    'action-style': {
      type: Object
    }
  },

  data() {
    return {
      state: [],
      isRowExpanded: [],
      checkboxList: []
    }
  },

  created() {
    let i = 0
    for (i; i < this.tableData?.data.length; i++) {
      this.state.push(false)
      this.isRowExpanded.push(false)
      if (this.checkbox) {
        this.checkboxList.push(false)
      }
    }
    if (this.expRow) {
      this.isRowExpanded[this.expRow] = true
    }
  },

  methods: {
    handleEnterCheckbox(i) {
      this.checkboxList[i] = !this.checkboxList[i]
    },
    clickIcon(i, j) {
      this.$emit('click-icon', i, j, this.state)
    },
    clickAction(i, j) {
      this.state[i] = !this.state[i]
      if (!this.state[i]) {
        let k = 0
        for (k; k < this.state.length; k++) {
          this.state[k] = false
        }
      } else {
        let k = 0
        for (k; k < this.state.length; k++) {
          if (k != i) this.state[k] = false
        }
      }
      this.$emit('click-btn', i, j, this.state)
    },
    expandRow(index) {
      this.isRowExpanded[index] = !this.isRowExpanded[index]
      this.$emit('expandedRow', index)
    }
  },

  // computed: {
  //   showErr: function () {},
  // },

  watch: {
    checkboxList: {
      deep: true,
      handler(val) {
        this.$emit('checkbox-list', val)
      }
    },
    tableData: {
      deep: true,
      handler() {
        if (this.checkbox) {
          this.checkboxList = []
          for (let i; i < this.tableData.data.length; i++) {
            this.checkboxList.push(false)
          }
        }
      }
    },
    closeAll: function (value) {
      if (value)
        for (let i; i < this.tableData.data.length; i++) {
          this.state.push(false)
          this.isRowExpanded.push(false)
        }
    }
  }
}
</script>

<style lang="sass" scoped>
@use "./table-style.sass"
@use "@/sass/underline.sass"
// @import @/sass/custom-styles/square-checkbox

.table-iLS
  a:focus-visible
    outline: none
    color: #409EFF

  tr:focus-within
    border: 0 !important
    box-shadow: 0 0 10px var(--color-box-shadow, #71a1ce)
    outline: 1px solid blue
    td
      color: var(--color-text, #666666)

.service-icon
  margin-right: 0.5rem
  margin-left: 1rem
.clm-start
  display: flex
  align-items: center
  justify-content: flex-start

td
  text-align: center

h1
  font-size: 2rem
  color: var(--color-text, #666666)
  margin-top: 1.5rem
  margin-bottom: 1rem

tr.table__row:hover
  background-color: var(--color-table-hover, #eeeeee)

.table-section-iLS
  overflow-x: auto
  width: 100%
  .warning
    color: red
    background-color: #fc3503
  .btn
    margin-left: 1rem
    font-size: var(--font-size-table, 1.5rem)
    height: 100%
    border: none
    cursor: pointer
    color: var(--color-text)

.rotate-up
  transform: rotate(0deg)
  transition: transform 0.25s linear

.rotate-down
  transform: rotate(180deg)
  transition: transform 0.25s linear

.clm-flex
  display: flex
  align-items: center
  justify-content: center

.toggle
  // margin: 0 25px 0 10px

.table-enter-active
  transition: all .3s ease

.table-leave-active
  transition: all .3s ease

.table-enter, .table-leave-to
  transform: translateY(10px)
  opacity: 0

.table-icon
  cursor: pointer

@media screen and (max-width: 1200px)
  table
    width: 1200px
</style>
