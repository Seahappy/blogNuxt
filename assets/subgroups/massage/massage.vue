<!--
 * @Author: Cxy
 * @Date: 2021-03-02 11:48:13
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 20:50:16
 * @FilePath: \blog\blogweb\src\components\subgroups\massage\massage.vue
-->
<template>
  <div
    class='mssage_Style'
    :class="[
      msg_Type,
      msg_Anima_Hide === true ? 'mssage_Style_Show' : 'mssage_Style_Hide',
    ]"
    :style="'top:' + (10 + msg_Height_Index * 6) + '%'">
    <i class='fa' :class='icon_Object[msg_Type]' aria-hidden='true'/>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      //  Msg类型
      msg_Type: 'wran',
      //  助力动画开始结束
      msg_Anima_Hide: true,
      //  动画出现位置
      msg_Height_Index: 1,
      icon_Object: {
        wran: 'fa-exclamation-triangle',
        info: 'fa-info-circle',
        faild: 'fa-times-circle',
        success: 'fa-check-circle'
      }
    }
  },
  methods: {
    destroy_Dom() {
      // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。触发 beforeDestroy 和destroyed 的钩子。
      this.$destroy()
    }
  }
}
</script>

<style lang="less" scoped>
.mssage_Style {
  box-sizing: border-box;
  border-radius: 4px;
  position: fixed;
  right: 1%;
  top: 10%;
  overflow: hidden;
  padding: 8px 10px 8px 15px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #87898e;
  border: 1px solid #ebeef5;
  background-color: #edf2fc;
  z-index: 1000000;
  i {
    margin-right: 10px;
    font-size: 16px;
  }
}
.mssage_Style_Show {
  animation: web_Move_Show 0.5s;
  @keyframes web_Move_Show {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
}
.mssage_Style_Hide {
  animation: web_Move_Hide 0.5s;
  @keyframes web_Move_Hide {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(120%);
    }
  }
}
.success {
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.wran {
  color: #e6a23c;
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.faild {
  color: #f56565;
  background-color: #fef0f0;
  border-color: #fde2e2;
}
// 区分设备展示提示信息不同位置及动画
@media screen and (max-width: 650px) {
  .mssage_Style {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .mssage_Style_Show {
    animation: phone_Move_Show 0.5s;
    @keyframes phone_Move_Show {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .mssage_Style_Hide {
    animation: phone_Move_Hide 0.5s;
    @keyframes phone_Move_Hide {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        top: 0;
      }
    }
  }
}
</style>
