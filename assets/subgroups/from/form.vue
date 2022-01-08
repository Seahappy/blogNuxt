<!--
 * @Author: Cxy
 * @Date: 2021-06-24 17:50:00
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 19:35:14
 * @FilePath: \blog\blogweb\src\components\subgroups\from\form.vue
-->
<template>
  <form class='SHForm'>
    <slot/>
  </form>
</template>

<script>
export default {
  name: 'SHForm',
  provide() {
    return {
      form: this
    }
  },
  props: {
    rules: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      iptAll: []
    }
  },
  methods: {
    /**
     * @description: 表单校验
     * @param {*} callback  回调
     * @param {*} propT  单独校验某一项
     * @return {*}
     */
    validate(callback, propT) {
      const iptFilter = this.iptAll.filter((c) => {
        if (!propT) return
        if (c.prop === propT) {
          return c
        }
      })
      const iptExecute = (iptFilter.length === 0 ? this.iptAll : iptFilter).map(
        (c) => c.verify(c.value)
      )
      const result = iptExecute.every((c) => c === undefined)
      callback(result)
    },
    resetFields() {
      this.iptAll.forEach((c) => c.clearCheck())
    }
  },
  created() {
    this.$on('inputDom', (ipt) => {
      this.iptAll.push(ipt)
    })
  }
}
</script>
