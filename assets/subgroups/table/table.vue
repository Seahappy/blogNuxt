<!--
 * @Author: Cxy
 * @Date: 2021-05-17 20:40:34
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-14 17:21:25
 * @FilePath: \blog\blogweb\src\components\subgroups\table\table.vue
-->

<template>
  <div class='SHTable'>
    <table>
      <thead>
        <tr>
          <th width='60'><div class='thTdItem'>序号</div></th>
          <th
            v-for='(c, i) in tab_Title'
            :key='i'
            :style="{ width: c.width + 'px' }">
            <div class='thTdItem'>{{ c.title }}</div>
          </th>
          <slot name='thead_Operation' />
        </tr>
      </thead>
    </table>
    <div class='tbody'>
      <table>
        <tbody>
          <tr v-if='showHD' ref='showHD_Dom' class='tbody_infor_Active clickTr'>
            <td :colspan='tab_Title.length + 2'>
              <slot name='tbody_infor' :row='clickData' />
            </td>
          </tr>
          <tr
            v-for='(c, i) in tab_Data'
            :key='c._id'
            :class="clickTable === i ? 'clickTr' : ''"
            @click='selectColum({ ...c, i })'>
            <td width='60' class='orderNum'>
              <i
                v-if='type'
                class='fa fa-angle-right'
                aria-hidden='true'
                @click='taggle($event, { ...c, i })'/>
              <span>{{ i + 1 }}</span>
            </td>
            <td
              v-for='(cc, ii) in tab_Title'
              :key='ii'
              :title="
                cc.prop === 'created_At'
                  ? $options.filters.dateFilter(c[cc.prop])
                  : c[cc.prop] || '----'
              "
              :style="{ width: cc.width + 'px' }">
              <SHInput v-if='c.edit && cc.edit' v-model='c[cc.prop]' />
              <div v-else class='thTdItem'>
                {{
                  cc.prop === "created_At"
                    ? $options.filters.dateFilter(c[cc.prop])
                    : c[cc.prop] || "----"
                }}
              </div>
            </td>
            <slot name='tbody_Operation' :row='{ ...c, i }' />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SHTable',
  props: {
    tab_Title: {
      type: Array,
      required: true
    },
    tab_Data: {
      type: Array,
      required: true
    },
    type: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      clickTable: '',
      showHD: false,
      clickData: {},
      last_Dom: null,
      last_ClickData: {}
    }
  },
  watch: {
    tab_Data: function() {
      if (!this.type) return
      if (this.last_Dom) this.last_Dom.style.transform = 'rotate(0deg)'
      this.showHD = false
      this.last_Dom = null
      this.clickData = {}
    }
  },
  methods: {
    selectColum(c) {
      this.clickTable = c.i
      this.$emit('rowClick', c)
    },
    taggle(e, c) {
      this.showHD = true
      this.clickData = c
      const target = e.target || e.srcElement
      this.$nextTick(() => {
        const newNode = this.$refs.showHD_Dom
        target.style.transform = 'rotate(90deg)'
        const nodeList = target.parentNode.parentNode
        nodeList.after(newNode)
        if (this.last_Dom && c._id === this.last_ClickData._id) {
          this.showHD = false
          target.style.transform = 'rotate(0deg)'
          this.last_Dom = null
        } else {
          if (this.last_Dom) this.last_Dom.style.transform = 'rotate(0deg)'
          this.last_Dom = target
          this.last_ClickData = c
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.SHTable {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: #606266;
    tr {
      background: linear-gradient(#fff, #b6b6b6 100%, transparent 100%) bottom /
        100% 1px no-repeat;
      transition: background-color 0.25s ease;
      &:not(thead > tr):hover {
        background: #edeff3;
      }
      .orderNum {
        i,
        span {
          padding: 0 10px;
        }
      }
    }
    .tbody_infor_Active {
      td {
        background: linear-gradient(#fff, #b6b6b6 100%, transparent 100%) top/
            100% 1px no-repeat,
          linear-gradient(#fff, #b6b6b6 100%, transparent 100%) bottom/ 100% 1px
            no-repeat;
      }
    }
    .clickTr {
      background: #f5f7fa;
    }
    th,
    td {
      text-align: left;
      padding: 8px 0;
      min-width: 0;
      box-sizing: border-box;
      vertical-align: middle;
      position: relative;
      text-align: left;
      .fa-angle-right {
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
      }
      .SHButton {
        padding: 8px 18px;
      }
      .thTdItem {
        padding: 0 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    th {
      user-select: none;
    }
    thead {
      color: #909399;
    }
  }
  .tbody {
    overflow: auto;
  }
}
</style>
