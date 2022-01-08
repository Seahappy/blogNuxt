<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-08-17 20:03:21
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:58:18
 * @FilePath: \blog\blogNuxt\assets\subgroups\tabs\tab.vue
-->
<template>
  <div class='TabsUi'>
    <span class='active_TabsUi' :class="type === 'line' ? '' : 'backGround'" :style='lineBackGr'/>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'SHTab',
  provide() {
    return {
      tabs: this,
      type: this.type
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'line'
    }
  },
  data() {
    return {
      active_TransFormX: 0,
      tabPaneDom: [],
      allDomWidth: [],
      activeDomIndex: 0,
      lineBackGr: {}
    }
  },
  methods: {
    changeTab(name) {
      let activwidth = 0
      this.tabPaneDom.map((c) => (c.active = false))
      this.tabPaneDom.some((c, i) => {
        activwidth +=
          parseFloat(window.getComputedStyle(c.$el).marginLeft) +
          parseFloat(window.getComputedStyle(c.$el).marginRight) +
          (i === 0 ? 0 : this.allDomWidth[i - 1])
        if (c.name === name) {
          c.active = true
          this.active_TransFormX =
            activwidth -
            (i === this.tabPaneDom.length - 1
              ? 0
              : parseFloat(
                window.getComputedStyle(this.tabPaneDom[0].$el).marginRight
              ))
          this.activeDomIndex = i
          return true
        }
      })
      this.$emit('tabClick', name)
      this.changeStyle()
    },
    changeStyle() {
      const { allDomWidth, activeDomIndex, active_TransFormX, type } = this
      if (type === 'line') {
        this.lineBackGr = {
          width: (allDomWidth[activeDomIndex] + 15) + 'px',
          transform: 'translateX(' + (active_TransFormX - 10) + 'px)'
        }
      } else {
        this.lineBackGr = {
          width: allDomWidth[activeDomIndex] + 'px',
          transform: 'translateX(' + (active_TransFormX - 11) + 'px)',
          height: '100%',
          padding: '0 10px'
        }
      }
    }
  },
  created() {
    this.$on('tabPaneDom', (pane) => this.tabPaneDom.push(pane))
    this.$on('changeTab', (name) => this.changeTab(name))
  },
  mounted() {
    this.allDomWidth = this.tabPaneDom.map((c, i) => {
      if (i === 0) c.$el.style.marginLeft = '10px'
      if (i === this.tabPaneDom.length - 1) c.$el.style.marginRight = 0
      return c.$el.offsetWidth
    })
    this.changeTab(this.value)
  }
}
</script>
<style lang="less">
.TabsUi {
  // width: 100%;
  font-size: 20px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
  }
  .active_TabsUi {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #409eff;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 5px;
  }
  .backGround {
    background-color: #ecf5ff;
  }
}
</style>
