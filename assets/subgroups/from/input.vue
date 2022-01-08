<!--
 * @Author: Cxy
 * @Date: 2021-06-07 14:27:59
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-30 18:02:51
 * @FilePath: \blog\blogweb\src\components\subgroups\from\input.vue
-->
<template>
  <div class='SHInput'>
    <label v-if="label && form !== 'NoInput'">{{ label + "：" }}</label>
    <div class='inputUi_Input'>
      <input
        v-if="type !== 'textarea'"
        :oninput='oninput'
        :min='min'
        :max='max'
        :step='step'
        :value='value'
        :readonly='readonly'
        :type='type'
        :class="SHideCopy ? 'faildIpt' : ''"
        :placeholder='placeholder'
        :autocomplete='autocomplete'
        @input='changeIpt'
        @keydown.enter='handlekeydownenter'
        @focus='focusIpt'
        @blur='blurIpt'
        @click='handleClick'>
      <textarea
        v-else
        :class="SHideCopy ? 'faildIpt' : ''"
        :placeholder='placeholder'
        :value='value'
        @input='changeIpt'/>
      <span
        :style="{
          transform: SHideCopy
            ? 'rotate3d(1, 0, 0, 0deg)'
            : 'rotate3d(1, 0, 0, 90deg)',
        }">{{ massageCopy }}</span>
    </div>
  </div>
</template>

<script>
import { getBLen } from '@/until'
export default {
  name: 'SHInput',
  inject: {
    form: {
      default: 'NoInput'
    }
  },
  props: {
    value: {
      require: true,
      validator: function(value) {
        return /number|string/gi.test(typeof value)
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      require: true
    },
    prop: String,
    placeholder: String,
    autocomplete: String,
    min: String,
    max: String,
    step: String,
    oninput: String,
    readonly: String
  },
  data() {
    return {
      SHideCopy: false,
      massageCopy: '',
      iptVal: ''
    }
  },
  methods: {
    blurIpt(e) {
      this.$emit('blur', e)
    },
    focusIpt(e) {
      this.$emit('focus', e)
    },
    handlekeydownenter(e) {
      this.$emit('keydownenter', e)
    },
    changeIpt(event) {
      this.$emit('input', event.target.value)
      this.iptVal = event.target.value
    },
    validatorMeth(massage) {
      if (massage) {
        this.SHideCopy = true
        this.massageCopy = massage
        return
      }
    },
    verify(value = this.iptVal === '' ? this.value : this.iptVal) {
      this.SHideCopy = false
      if (!this.prop) return
      if (this.form.rules[this.prop]['require'] && value.length === 0) {
        this.SHideCopy = true
        this.massageCopy = this.form.rules[this.prop]['require']['massage']
        return false
      }
      if (this.form.rules[this.prop]['validator']) {
        this.form.rules[this.prop]['validator'].meth(value, this.validatorMeth)
        if (this.SHideCopy) {
          return false
        }
      }
      if (
        this.form.rules[this.prop]['minLen'] &&
        getBLen(value) < this.form.rules[this.prop]['minLen']['numLen'] &&
        value.length !== 0
      ) {
        this.SHideCopy = true
        this.massageCopy = this.form.rules[this.prop]['minLen']['massage']
        return false
      }
      if (
        this.form.rules[this.prop]['maxLen'] &&
        getBLen(value) > this.form.rules[this.prop]['maxLen']['numLen']
      ) {
        this.SHideCopy = true
        this.massageCopy = this.form.rules[this.prop]['maxLen']['massage']
        return false
      }
    },
    clearCheck() {
      this.SHideCopy = false
    },
    handleClick(e) {
      this.$emit('click', e)
    }
  },
  mounted() {
    if (this.form !== 'NoInput') this.form.$emit('inputDom', this)
  },
  watch: {
    value: function(newV) {
      this.verify(newV)
    }
  }
}
</script>

<style lang="less" scoped>
.SHInput {
  display: flex;
  line-height: 35px;
  margin-right: 15px;
  color: #606266;
  .inputUi_Input {
    position: relative;
    flex: 1;
    font-size: 12px;
    input {
      width: 100%;
      height: 35px;
      border-style: solid;
      border-width: 1px;
      border-radius: 4px;
      border-color: #dcdfe6;
      outline: 0;
      text-indent: 5px;
      transition: border-color 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
      box-sizing: border-box;
      background: #40a0ff00;
      cursor: pointer;
      &:focus {
        border-color: #409eff;
      }
    }
    .faildIpt {
      border-color: #f56c6c !important;
    }
    span {
      position: absolute;
      line-height: 1;
      font-size: 12px;
      bottom: -14px;
      left: 0px;
      color: #f56c6c;
      transition: transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
      white-space: nowrap;
    }
    textarea {
      display: block;
      resize: vertical;
      padding: 5px 5px;
      line-height: 1.5;
      box-sizing: border-box;
      width: 100%;
      color: #606266;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      outline: none;
      cursor: pointer;
      &:focus {
        border-color: #409eff;
      }
    }
  }
}
</style>
