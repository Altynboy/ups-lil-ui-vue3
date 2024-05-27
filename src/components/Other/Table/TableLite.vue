<template>
  <div :class="['table-section-iLS', customClass]">
    <span v-if="!tableData">No data</span>
    <table v-else class="table-iLS">
      <thead>
        <tr>
          <th v-for="(item, i) in tableData.headers" :key="i">{{ item }}</th>
          <slot name="header"></slot>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, i) in tableData.data" :key="i">
          <tr>
            <td v-for="(item_td, j_td) in item" :key="j_td">
              <div class="table-td-flex-container">
                {{ item_td }}
                <template v-if="j_td == item.length - 1">
                  <slot name="extrabutton"> </slot>
                </template>
              </div>
            </td>
            <template v-if="'icons' in tableData">
              <td v-for="(item, j) in tableData.icons" :key="item.title">
                <div @click="clickIcon(i, j)" class="icons">
                  <IconBase :iconId="item.icon" :class="'icons'"></IconBase>
                </div>
              </td>
            </template>
            <slot name="content"> </slot>
          </tr>
          <template v-if="bottomRow">
            <tr :key="i + 'slt'">
              <td :colspan="item.length">
                <slot name="bottom-row" class="bottom-row" :index="i"></slot>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import IconBase from '../../Base/IconBase/IconBase.vue'

export default {
  name: 'CustomTable',

  components: {
    IconBase
  },

  props: {
    tableData: {
      type: Object,
      default: () => {}
    },
    'bottom-row': {
      type: Boolean,
      default: false
    },
    'custom-class': {
      type: String,
      default: ''
    }
  },

  data() {
    return {}
  },

  methods: {
    clickIcon(i, j) {
      this.$emit('click-icon', i, j)
    }
  }
}
</script>

<style lang="sass" scoped>
@use "./table-style.sass"

.bottom-row
  width: 100px

.icons
  cursor: pointer

tr:hover
  background-color: #eeeeee

.table-td-flex-container
  display: flex
  flex-direction: row
  justify-content: center


.table-section-iLS
  overflow-x: auto
  width: 100%

@media screen and (max-width: 1200px)
  table
    width: 1200px
</style>
