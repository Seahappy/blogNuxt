<!--
 * @Author: Cxy
 * @Date: 2021-05-18 19:18:37
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 19:35:18
 * @FilePath: \blog\blogweb\src\components\subgroups\from\button.vue
-->
<template>
  <button class='SHButton' type='button' :class="
    (disabled === true ? '_disabled disStyle' : '') +
      ' ' +
      (icon !== undefined ? 'icon' : '') + ' ' +
      type
  " @click='handleClick'>
    <i v-if='icon' class='fa' :class='icon' aria-hidden='true'/>
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'SHButton',
  props: {
    type: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    icon: {
      type: String
    }
  },
  methods: {
    handleClick(e) {
      if (this.disabled) {
        return
      }
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less" scoped>
.SHButton {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: rgba(255, 255, 255, 0);
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    background-color: #c4e0ff;
    color: #2e93ff;
  }
}
.fa {
  margin-right: 10px;
}
.disStyle {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  &:hover {
    background-color: #6ab4ff;
    color: #fff;
    border-color: #6ab4ff;
  }
}
.primary_disabled {
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}
.danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
  &:hover {
    background-color: #ee8f8f;
    color: #fff;
    border-color: #ee8f8f;
  }
}
.danger_disabled {
  color: #fff;
  background-color: #fab6b6;
  border-color: #fab6b6;
}
.warn {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
  &:hover {
    background-color: #e7b466;
    color: #fff;
    border-color: #e7b466;
  }
}
.warn_disabled {
  color: #fff;
  background-color: #f3d19e;
  border-color: #f3d19e;
}
.success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
  &:hover {
    color: #fff;
    background-color: #76d149;
    border-color: #76d149;
  }
}
.success_disabled {
  color: #fff;
  background-color: #93cc76;
  border-color: #93cc76;
}
</style>
