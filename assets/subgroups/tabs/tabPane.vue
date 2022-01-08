<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-08-17 20:03:32
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:58:21
 * @FilePath: \blog\blogNuxt\assets\subgroups\tabs\tabPane.vue
-->
<template>
  <div class='TabPaneUi' :class="active ? 'activeTabPane' : ''" @click='changeTab'>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'SHTabPane',
  inject: ['tabs', 'type'],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      active: false
    }
  },
  methods: {
    changeTab() {
      this.tabs.$emit('changeTab', this.name)
    }
  },
  mounted() {
    this.tabs.$emit('tabPaneDom', this)
  }
}
</script>
<style lang="less">
.TabPaneUi {
  margin: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  position: relative;
  cursor: pointer;
  z-index: 1;
  letter-spacing: 1px;
  &:hover {
    color: #409eff;
  }
}
.activeTabPane {
  color: #409eff;
}
</style>
