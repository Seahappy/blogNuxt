<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-11-29 14:56:52
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-10 17:58:00
 * @FilePath: \blog\blogweb\src\components\subgroups\paging\paging.vue
-->
<template>
  <div class='SHPaging'>
    <span v-if="configArran.includes('total')" class='totalClass'>共 {{ total }} 页</span>
    <SHToolTip
      v-if="configArran.includes('sizes')"
      ref='SHToolTip'
      widthAuto
      direction='top'
      ToolTipStyle='padding: 0;background: #fff;border: 1px solid #e4e7ed;'
      eventType='click'>
      <ul>
        <li
          v-for='c in pageSize'
          :key='c'
          :style="
            pageSizeCurrent === c ? 'color: #409eff;font-weight: 700;' : ''
          "
          @click='selectPageOpar(c)'>
          {{ c + "条/页" }}
        </li>
      </ul>
      <span slot='icon' class='sizesClass' @click='changeSizes'>
        <SHInput
          readonly
          :value="pageSizeCurrent + '条/页'"
          @blur='focusFlag = false'/>
        <span
          :style="{ transform: focusFlag ? 'rotate(0deg)' : 'rotate(180deg)' }"
          class='fa fa-angle-up'/>
      </span>
    </SHToolTip>
    <span
      v-if="configArran.includes('prev')"
      class='prevClass fa fa-angle-left'
      aria-hidden='true'
      :class="ActivePage === 1 ? 'pagingItemDisabled' : ''"
      @click='prevPage(1)'/>
    <div v-if="configArran.includes('pager')" class='pagerClass'>
      <span
        v-for='c in pagesNum'
        v-show="
          c === 1 ||
            c === pagesNum ||
            (ActivePage <= btnPageNum - Math.floor(btnPageNum / 2)
              ? c <= btnPageNum - 1
              : c >= ActivePage - Math.floor((btnPageNum - 2) / 2) &&
                c <= ActivePage + Math.floor((btnPageNum - 2) / 2)) ||
            (ActivePage > pagesNum - Math.floor(btnPageNum / 2)
              ? c > pagesNum - (btnPageNum - 1)
              : '')
        "
        :key='c'
        :style="ActivePage === c ? 'color: #409eff;cursor: default;' : ''">
        <strong
          v-show='
            c === pagesNum &&
              ActivePage <= pagesNum - (btnPageNum + 1) / 2 &&
              btnPageNum < pagesNum
          '
          @click='nextPage(5)'/>
        <strong @click='activePageSize(c)'>{{ c }}</strong>
        <strong
          v-show='
            c === 1 &&
              ActivePage > (btnPageNum + 1) / 2 &&
              btnPageNum < pagesNum
          '
          @click='prevPage(5)'/>
      </span>
    </div>
    <span
      v-if="configArran.includes('next')"
      class='nextClass fa fa-angle-right'
      aria-hidden='true'
      :class="ActivePage === pagesNum ? 'pagingItemDisabled' : ''"
      @click='nextPage(1)'/>
    <span class='jumperClass'>
      前往<SHInput
        v-model='jumpPageNum'
        :value='ActivePage'
        @blur='blurPage'/>页
    </span>
  </div>
</template>

<script>
export default {
  name: 'SHPaging',
  props: {
    total: {
      validator: function(value) {
        return /number|string/gi.test(typeof value)
      }
    },
    config: {
      type: String,
      default: 'prev, pager, next'
    },
    pageSize: {
      type: Array,
      default: function() {
        return [10, 15, 20]
      }
    },
    currentPage: {
      validator: function(value) {
        return /number|string/gi.test(typeof value)
      },
      default: 1
    },
    btnPageNum: {
      type: Number,
      default: 7,
      validator: function(value) {
        return value >= 3 && value <= 13 && value % 2 === 1
      }
    }
  },
  data() {
    return {
      configArran: [],
      pageSizeCurrent: this.pageSize[0],
      focusFlag: false,
      ActivePage: this.currentPage,
      jumpPageNum: this.currentPage
    }
  },
  watch: {
    currentPageData: function(newV) {
      this.jumpPageNum = newV.skip
      this.$emit('currentPageOpar', newV)
    }
  },
  computed: {
    pagesNum() {
      return Math.ceil(this.total / this.pageSizeCurrent)
    },
    currentPageData() {
      return {
        skip: this.ActivePage,
        limit: this.pageSizeCurrent
      }
    }
  },
  methods: {
    blurPage() {
      this.ActivePage = Number(this.jumpPageNum)
    },
    prevPage(c) {
      if (this.ActivePage - c <= 0) {
        this.ActivePage = 1
      } else {
        this.ActivePage -= c
      }
    },
    nextPage(c) {
      if (this.ActivePage + c >= this.pagesNum) {
        this.ActivePage = this.pagesNum
      } else {
        this.ActivePage += c
      }
    },
    activePageSize(i) {
      this.ActivePage = i
    },
    selectPageOpar(i) {
      if (this.ActivePage >= Math.ceil(this.total / i)) {
        this.ActivePage = Math.ceil(this.total / i)
      }
      this.pageSizeCurrent = i
      this.$refs.SHToolTip.SHOpertion()
    },
    changeSizes() {
      this.focusFlag = !this.focusFlag
    }
  },
  created() {
    this.configArran = this.config.replace(/\s*/g, '').split(',')
  }
}
</script>

<style lang="less" scoped>
ul {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 10%);
  li {
    color: #606266;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    line-height: 34px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    padding: 0 10px;
    &:hover {
      background: #f5f7fa;
    }
  }
}
.SHPaging {
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  .totalClass {
    margin-right: 15px;
  }
  /deep/ .toolTip {
    .sizesClass {
      display: flex;
      padding-right: 10px;
      .SHInput {
        min-width: 50px;
        line-height: 28px;
        margin-right: -20px;
        .inputUi_Input {
          user-select: none;
          input {
            height: 28px;
            width: 100px;
          }
        }
      }
      .fa-angle-up {
        line-height: 28px;
        color: #acafb4;
        transition: transform 0.3s;
      }
    }
  }
  .prevClass,
  .nextClass {
    font-weight: bold;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
  .pagingItemDisabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .prevClass {
    padding-right: 15px;
  }
  .nextClass {
    padding-left: 15px;
  }
  .pagerClass {
    display: flex;
    align-items: center;
    span {
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
      strong {
        padding: 0 10px;
        text-align: center;
        position: relative;
        &:first-child,
        &:last-child {
          &::after {
            content: "...";
            padding: 0 10px;
            position: absolute;
            top: -5px;
            left: -5px;
          }
        }
        &:first-child:hover::after {
          content: ">";
        }
        &:last-child:hover::after {
          content: "<";
        }
      }
    }
  }
  .jumperClass {
    display: flex;
    align-items: center;
    /deep/ .SHInput {
      line-height: 28px;
      margin: 0 5px;
      .inputUi_Input {
        input {
          height: 28px;
          width: 50px;
          text-align: center;
          text-indent: 0;
        }
      }
    }
  }
}
</style>
