<!--
 * @Author: Cxy
 * @Date: 2021-03-06 21:49:59
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 20:50:25
 * @FilePath: \blog\blogweb\src\components\subgroups\messageBox\messageBox.vue
-->
<template>
  <div class='diaLog' :style="{ display: diaLog_SH ? 'block' : 'none' }">
    <div role='dialog' aria-modal='true' aria-label='提示' class='el_dialog'>
      <div class='el_dialog_header'>
        <span class='el_dialog_title'>提示</span>
      </div>
      <div class='el_dialog_body'>
        <i class='fa' :class='icon_Object[dia_Type]' aria-hidden='true'/>
        <span>{{ msg }}</span>
      </div>
      <div class='el_dialog_footer'>
        <span class='dialog_footer'>
          <button
            type='button'
            class='el_button el_button_default'
            @click='cancel(), (diaLog_SH = false)'>
            <span>取 消</span>
          </button>
          <button
            type='button'
            class='el_button el_button_primary'
            @click='confirm(), (diaLog_SH = false)'>
            <span>确 定</span>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '此操作将永久删除该文件, 是否继续?',
      dia_Type: 'wran',
      diaLog_SH: true,
      reject: '',
      resolve: '',
      icon_Object: {
        wran: 'fa-exclamation-triangle',
        info: 'fa-info-circle',
        faild: 'fa-times-circle',
        success: 'fa-check-circle'
      }
    }
  },
  methods: {
    cancel() {
      this.reject('cancel')
      this.remove()
    },
    confirm() {
      this.resolve('confirm')
      this.remove()
    },
    diaLog_return() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    remove() {
      setTimeout(() => {
        this.diaLog_destory()
      }, 300)
    },
    diaLog_destory() {
      this.$destroy()
      document.body.removeChild(this.$el)
    }
  }
}
</script>

<style lang="less" scoped>
.diaLog {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.267);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  .el_dialog {
    width: 30%;
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    text-align: center;
    .el_dialog_header {
      padding: 20px 20px 10px;
      .el_dialog_title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .el-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
      }
    }
    .el_dialog_body {
      color: #606266;
      font-size: 14px;
      word-break: break-all;
      text-align: initial;
      padding: 25px 25px 30px;
      .fa {
        color: #87898e;
        margin-right: 10px;
      }
      .fa-check-circle {
        color: #67c23a;
      }
      .fa-exclamation-triangle {
        color: #e6a23c;
      }
      .fa-times-circle {
        color: #f56565;
      }
    }
    .el_dialog_footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      .dialog_footer {
        .el_button {
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          background: #fff;
          border: 1px solid #dcdfe6;
          color: #606266;
          -webkit-appearance: none;
          text-align: center;
          box-sizing: border-box;
          outline: none;
          margin: 0;
          transition: 0.1s;
          font-weight: 500;
          padding: 8px 18px;
          font-size: 14px;
          border-radius: 4px;
        }
        .el_button_default {
          &:hover {
            background-color: #ddeeff;
            border-color: #c7d0e4;
            color: #409eff;
          }
        }
        .el_button_primary {
          color: #fff;
          background-color: #409eff;
          border-color: #409eff;
          margin-left: 20px;
          &:hover {
            background-color: #67aff8;
            border-color: #67aff8;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .diaLog {
    .el_dialog {
      width: 65%;
      margin-top: 50vh;
      transform: translateY(-50%);
    }
  }
}
</style>
