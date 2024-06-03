<template>
  <div
    @blur="offFocus"
    @focus="onFocus"
    tabindex="0"
    ref="select"
    class="select-dropdown"
    @keyup.up="pressUp"
    @keydown.down="pressDown"
    @keyup.enter="handleEnter"
  >
    <a @click="showOrHide" class="main-a" ref="selectBody">
      <span>
        {{ chosedName }}
      </span>
      <IconBase
        v-if="options.length > 1"
        :iconId="arrowDown"
        height="8px"
        width="12px"
        :class="isClicked ? 'arr-up' : 'arr-down'"
      />
    </a>
    <template v-if="isClicked && options.length > 1">
      <div
        class="options-container"
        id="options-container"
        :class="{
          reverse: reverseOptions,
          regular: !reverseOptions
        }"
      >
        <div>
          <template v-for="(item, i) in options">
            <a
              :id="'option' + i"
              v-if="item.value != optionValue"
              v-on:click="handleChoice(item.text, item.value, i)"
              :key="i"
              value="item.value"
              :class="{ 'key-up': tabOption == i }"
            >
              <span :key="i + 'msg'">{{ item.text }} </span>
            </a>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import IconBase from '@/components/Base/IconBase/IconBase.vue'
import arrowDown from '@/assets/icons/arrow-down.svg'

export default {
  components: {
    IconBase
  },

  props: {
    options: {
      required: true
    },
    // "selectedItem",
    defaultValue: {
      required: false
    }
  },

  data() {
    return {
      isClicked: false,
      isChosed: false,
      chosedValue: null,
      // chosedName: this.selectedItem,
      chosedName: null,
      // optionValue: '',
      optionValue: null,
      icon: 'SelectArrow.svg',
      iconUp: 'Arrow-up.svg',
      isMouseLeftClick: false,
      tabOption: 1,
      windowHeight: null,
      topOffset: null,
      scrollTop: null,
      reverseOptions: false,
      chosedOptionId: 0,
      arrowDown: arrowDown
    }
  },
  methods: {
    scrollToElement(id) {
      // console.log(this.$refs["option" + element]);
      // var element = this.$refs["option" + id];
      // element.scrollIntoView({ behavior: "smooth" });
      // this.$nextTick(() =>
      //   this.$refs["option" + id].scrollIntoView({ behavior: "smooth" })
      // );
      try {
        // document.getElementById("option" + id).scrollTo({ behavior: "smooth" });
        let myElement = document.getElementById('option' + id)
        let topPos = myElement.offsetTop
        // console.log(topPos);
        document.getElementById('options-container').scrollTo({ top: topPos, behavior: 'smooth' })
        // document
        //   .getElementById("options-container")
        //   .scrollTo({ behavior: "smooth" });
      } catch (error) {
        console.log(error)
        return
      }
    },
    onResize() {
      this.windowHeight = window.innerHeight
    },
    handleScroll() {
      // console.log(window.scrollY);
      this.scrollTop = window.scrollY
    },
    handleEnter() {
      var name = this.options[this.tabOption].name
      var value = this.options[this.tabOption].value
      var id = this.tabOption
      this.handleChoice(name, value, id)
    },
    pressMouseLeft() {
      this.isMouseLeftClick = true
    },
    goUp() {
      if (this.tabOption == 0) {
        this.tabOption = this.options.length - 1
        return
      }
      if (this.tabOption - 1 == 0) {
        if (this.options[this.tabOption - 1].value == this.optionValue) {
          this.tabOption = this.options.length - 1
        } else {
          this.tabOption -= 1
        }
      } else {
        if (this.options[this.tabOption - 1].value == this.optionValue) {
          this.tabOption -= 2
        } else {
          this.tabOption -= 1
        }
      }
    },
    goDown() {
      if (this.tabOption == this.options.length - 1) {
        if (this.options[0].value == this.optionValue) {
          this.tabOption = 1
        } else {
          this.tabOption = 0
        }
        return
      }

      if (this.tabOption + 1 == this.options.length - 1) {
        if (this.options[this.tabOption + 1].value == this.optionValue) {
          this.tabOption = 0
        } else {
          this.tabOption += 1
        }
      } else {
        if (this.options[this.tabOption + 1].value == this.optionValue) {
          this.tabOption += 2
        } else {
          this.tabOption += 1
        }
      }
    },
    pressUp() {
      if (this.reverseOptions) {
        this.goDown()
      } else {
        this.goUp()
      }
    },
    pressDown() {
      if (this.reverseOptions) {
        this.goUp()
      } else {
        this.goDown()
      }
    },
    onFocus() {
      this.isClicked = true
      document.documentElement.style.overflow = 'hidden'
    },
    offFocus() {
      this.isClicked = false
      document.documentElement.style.overflow = 'auto'
    },
    showOrHide() {
      // if (this.isClicked) {
      //   this.$refs.select.focus();
      //   this.isClicked = false;
      // } else {
      //   this.$refs.select.focus();
      //   this.isClicked = true;
      // }
      // this.isClicked = !this.isClicked;
    },
    handleChoice(name, value, id) {
      this.$refs.select.blur()
      this.isChosed = false
      this.chosedName = name
      this.optionValue = value
      this.chosedOptionId = id
      this.$emit('chosed-option', this.chosedName, this.optionValue)
    },
    getPosition() {
      this.topOffset = this.$refs.select.getBoundingClientRect().top
    }
  },

  mounted() {
    this.getPosition()
  },

  computed: {
    filteredArray: function () {
      var array = []
      for (let index = 0; index < this.options.length; index++) {
        if (this.chosedName != this.options.text) array.push(this.options[index])
        // else console.log(this.options[index]);
      }
      return array
    }
  },

  watch: {
    isClicked: function () {
      if (this.isClicked) {
        if (this.chosedOptionId == 0) {
          this.tabOption = 1
        } else if (this.chosedOptionId > 0) {
          this.tabOption = 0
        }
      }
      this.getPosition()
      var relativeOffset = this.topOffset - this.scrollTop
      if (relativeOffset > this.windowHeight / 2) {
        this.reverseOptions = true
      } else {
        this.reverseOptions = false
      }
      if (this.isClicked) {
        document.documentElement.style.overflow = 'hidden'
        return
      } else {
        document.documentElement.style.overflow = 'auto'
      }
    },
    options: function () {
      if (this.options.length > 0) {
        this.optionValue = this.options[0].value
        this.chosedName = this.options[0].text
      }
    },
    tabOption: function () {
      if (this.isClicked) {
        this.scrollToElement(this.tabOption)
      }
    }
  },

  created() {
    if (this.options.length > 0) {
      this.optionValue = this.options[0].value
      this.chosedName = this.options[0].text
      // this.chosedOptionId = 1;
      // this.tabOption = 0;
      // if (this.chosedOptionId == 0) {
      //   this.tabOption = 1;
      // } else if (this.chosedOptionId > 0) {
      //   this.tabOption = 0;
      // }
      // if (this.isClicked) {
      //   this.scrollToElement(1);
      // }
    }
    this.$emit('chosed-option', this.chosedName, this.optionValue)
    window.addEventListener('scroll', this.handleScroll())
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize())
    })
  },

  unmounted() {
    window.removeEventListener('scroll', this.handleScroll())
    window.removeEventListener('resize', this.onResize())
  }
}
</script>

<style lang="sass" scoped>
.reverse
  bottom: 100%
  border: 1px solid var(--color-border, #CCCCCC)
  border-bottom: 0
  & > div
    flex-direction: column-reverse

.regular
  top: 100%
  border: 1px solid var(--color-border, #CCCCCC)
  border-top: 0
  & > div
    flex-direction: column

.select-dropdown:focus-within
    &:focus-visible
      border: 0 !important
      box-shadow: 0 0 10px var(--clr-box-shadow)
      outline: 1px solid blue
      .options-container
        box-shadow: 0 5px 10px var(--clr-box-shadow)
        outline: 1px solid blue

.select-dropdown
    display: inline-block
    margin-bottom: 0
    min-height: auto
    position: relative

    .main-a
      border: 1px solid var(--color-border, #CCCCCC)
      background: #FFFFFF
      cursor: pointer
      &:hover
        svg
          filter: brightness(0.8)
      svg
        width: 12px
        height: auto

      // &:focus-within
      //   border: 0 !important
      //   box-shadow: 0 0 10px var(--clr-box-shadow)
      //   outline: 1px solid blue

    a
      font-size: 16px
      line-height: 19px
      width: 350px
      height: 40px
      border: 0
      display: flex
      align-items: center
      justify-content: space-between
      position: relative

      span
        margin-left: 12px

      svg
        margin-right: 16px
        cursor: pointer
        :hover
          filter: brightness(0.8)

    .arr-up
      transform: rotate(180deg)
      transition: transform 0.3s
    .arr-down
      transform: rotate(0deg)
      transition: transform 0.3s

    .options-container
      max-height: 240px
      overflow-y: auto
      overflow-x: hidden
      position: absolute
      z-index: 2
      background: #F7F7F7
      width: 350px
      scroll-behavior: smooth


      & > div
        position: relative
        width: 100%
        display: flex
        a
          width: 100%
          height: 40px
          color: #AAAAAA

        a:hover
            background-color: #CCC
            width: 100%
            color: black
    span
        margin: 0


.key-up
    background-color: #CCC
    width: 100%
    height: 40px
    color: black !important

@media only screen and (max-width: 600px)
  .options-container
      position: relative

  .select-dropdown
      a
          width: 100%

  .select-dropdown, .main-a, .options-container
      width: 100%
</style>
