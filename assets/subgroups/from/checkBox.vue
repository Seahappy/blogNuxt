<!--
 * @Author: Cxy
 * @Date: 2021-05-29 15:05:43
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 19:35:15
 * @FilePath: \blog\blogweb\src\components\subgroups\from\checkBox.vue
-->
<template>
  <label class='el-checkbox' @click.stop>
    <span class='el-checkbox__input' :class="checkAll ? 'is-checked' : checkSemi ? 'is-semi' : ''">
      <span class='el-checkbox__inner'/>
      <input type='checkbox' aria-hidden='false' class='el-checkbox__original' @change='change' >
    </span>
    <slot/>
  </label>
</template>

<script>
export default {
  name: 'SHCheckBox',
  props: {
    checkAll: Boolean,
    checkSemi: Boolean
  },
  data() {
    return {}
  },
  methods: {
    change() {
      this.$emit('change')
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.el-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  .el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
    &:after {
      box-sizing: content-box;
      content: '';
      border: 1px solid #fff;
      border-left: 0;
      border-top: 0;
      height: 7px;
      left: 4px;
      position: absolute;
      top: 1px;
      transform: rotate(45deg) scaleY(0);
      width: 3px;
      transition: transform 0.15s ease-in 0.05s;
      transform-origin: center;
    }
  }
  .el-checkbox__original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }
  .is-checked {
    .el-checkbox__inner {
      background-color: #409eff;
      border-color: #409eff;
      &::after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }
  .is-semi {
    .el-checkbox__inner {
      background-color: #409eff;
      border-color: #409eff;
      &:before {
        content: '';
        position: absolute;
        display: block;
        background-color: #fff;
        height: 2px;
        transform: scale(0.5);
        left: 0;
        right: 0;
        top: 5px;
      }
    }
  }
}
</style>
