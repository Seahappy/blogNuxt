<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-08-18 15:46:30
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-30 17:27:58
 * @FilePath: \blog\blogNuxt\components\backtotop.vue
-->
<template>
  <div :class="backTopSH ? 'showBackTo' : 'hideBackTo'" class='backtotop' @click='back_To_Top'>
    <i class='fa fa-caret-square-o-up' aria-hidden='true'/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backTopSH: false
    }
  },
  methods: {
    back_To_Top() {
      document.querySelector('#anchor_Point').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      })
    },
    scrollEvent(e) {
      const ev = e || window.event
      const target = ev.target || ev.srcElement
      if (target.scrollTop > 900) {
        if (!this.backTopSH) this.backTopSH = true
      } else {
        if (this.backTopSH) this.backTopSH = false
      }
    }
  },
  mounted() {
    document
      .getElementById('app')
      .addEventListener('scroll', this.scrollEvent, false)
  },
  beforeDestroy() {
    document
      .getElementById('app')
      .removeEventListener('scroll', this.scrollEvent, false)
  }
}
</script>
<style lang="less" scoped>
.backtotop {
  position: fixed;
  bottom: 50px;
  right: 70px;
  width: 50px;
  height: 50px;
  background: #b79764;
  color: #fff;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  font-size: 18px;
  border: solid 2px #b79764;
  transition: background 0.8s;
  cursor: pointer;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  &:hover {
    background: #fff;
    i {
      color: #b79764;
    }
  }
}
.showBackTo {
  animation-name: showBackTo;
  @keyframes showBackTo {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
}
.hideBackTo {
  animation-name: hideBackTo;
  @keyframes hideBackTo {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
}
@media screen and (max-width: 750px) {
  .backtotop {
    width: 35px;
    height: 35px;
    right: 5%;
    bottom: 50px;
    line-height: 35px;
    i {
      font-size: 10px;
    }
  }
}
</style>
