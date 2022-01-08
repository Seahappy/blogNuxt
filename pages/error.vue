<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-03-20 19:27:38
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-29 20:56:36
 * @FilePath: \blog\blogNuxt\layouts\error.vue
-->
<template>
  <div class='No_Found'>
    <div v-if='$route.query.remainingTime' >
      <p>{{ massage }}</p>
      <p v-if='Number($route.query.remainingTime) !== 1'>{{ hour + ':' + minute + ':' + second }}</p>
    </div>
    <div v-else >路径未找到哦！！！</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      second: '00',
      minute: '00',
      hour: '00',
      massage: this.$route.query.massage
    }
  },
  mounted() {
    const resSec = this.$route.query.remainingTime
    if (!resSec || resSec === 1) return
    let remainingTime = Math.ceil(resSec / 1000)
    this.timer = setInterval(() => {
      remainingTime -= 1
      if (remainingTime < 0) {
        this.$router.go(-1)
      } else {
        this.hour = String(Math.floor(remainingTime / 60 / 60)).padStart(2, '0')
        this.minute = String(Math.floor(remainingTime % 3600 / 60)).padStart(2, '0')
        this.second = String(Math.floor(remainingTime % 60)).padStart(2, '0')
      }
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.No_Found {
  display: table-cell;
  vertical-align: middle;
  width: 100vw;
  height: calc(~"100vh - 90px");
  color: white;
  font-size: 50px;
  font-weight: 900;
  text-align: center;
}
</style>
