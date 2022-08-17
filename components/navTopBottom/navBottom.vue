<!--
 * @Author: Cxy
 * @Date: 2021-03-23 15:50:57
 * @LastEditors: Cxy
 * @LastEditTime: 2022-07-05 08:44:19
 * @FilePath: \ehomes-admind:\giteeBlog\blogNuxt\components\navTopBottom\navBottom.vue
-->
<template>
  <div ref='navBottom' class='navBottom'>
    <div class='navBottom_T'>
      <div class='navBottom_Left'>
        <div class='navBottom_T_T'>content</div>
        <SHImage class='navBottom_Left_Img' typeImg='img' src='/logo/weixinerweima.png' />
        <p>Email: 15848856356@163.com</p>
      </div>
      <div class='navBottom_Center'>
        <div class='navBottom_Center_Img'/>
      </div>
      <div class='navBottom_Right'>
        <div class='navBottom_T_T'>menu</div>
        <span v-for='(c, i) in nav_Data' :key='i' @click='$router.push({ path: c.path }), (nav_Top_Menus_TF = false)'>
          {{ c.title }}</span>
      </div>
    </div>
    <div class='navBottom_B'>
      <div>
        © Copyright 2020-2021 备案号：<span @click='copyContent'>蒙ICP备2021000838号</span>
        SeaHappy All rights reserved.
        <a style='margin-left: 10px;' class='fa fa-openid' aria-hidden='true' href='https://www.seahappy.xyz/blogServe/siteMap.xml'>网站地图</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav_Data: [
        { title: '首页', path: '/' },
        { title: '博客', path: '/Blog' },
        { title: '时间轴', path: '/TimeLine' },
        { title: '关于', path: '/About' },
        { title: '留言', path: '/Contact' }
      ]
    }
  },
  methods: {
    copyContent() {
      // 创建一个 Input标签
      const cInput = document.createElement('input')
      cInput.value = '蒙ICP备2021000838号'
      document.body.appendChild(cInput)
      cInput.select() // 选取文本域内容;
      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
      // Input要在正常的编辑状态下原生复制方法才会生效
      document.execCommand('Copy')
      this.$Msg('备案号复制成功，即将跳转', 'success') // antd框架封装的通知,如使用别的UI框架，换掉这句
      // / 复制成功后再将构造的标签 移除
      cInput.remove()
      setTimeout(() => window.open('https://beian.miit.gov.cn/#/Integrated/index'), 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.navBottom {
  height: 230px;
  width: 100%;
  background: #000;
  color: white;
  box-sizing: border-box;
  .navBottom_T {
    width: 100%;
    height: 80%;
    display: flex;
    padding: 0 10%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    .navBottom_T_T {
      margin: 12px 0;
      font-weight: 900;
      font-family: 'Courier New', Courier, monospace;
      font-size: 22px;
    }
    .navBottom_Left {
      height: 100%;
      width: 20%;
      .navBottom_Left_Img {
        height: 80px;
        width: 80px;
        margin-bottom: 15px;
      }
      p {
        font-size: 14px;
      }
    }
    .navBottom_Center {
      width: 30%;
      height: 100%;
      min-width: 250px;
      .navBottom_Center_Img {
        height: 100%;
        width: 100%;
        background: url(/logo/logoWhite.png) no-repeat 80% 40%;
        background-size: 75%;
      }
    }
    .navBottom_Right {
      width: 22%;
      height: 100%;
      min-width: 190px;
      span {
        text-transform: capitalize;
        display: inline-block;
        line-height: 1;
        padding: 10px 15px;
        border-radius: 10px;
        margin: 0 5px 10px 0;
        background: #484848;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          background: #272727;
        }
      }
    }
  }
  .navBottom_B {
    width: 100%;
    height: 20%;
    text-align: center;
    font-size: 12px;
    border-top: 1px #ffffff59 solid;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 750px) {
  .navBottom {
    .navBottom_T_T {
      .navBottom_T_T_L {
        width: 25%;
      }
      .navBottom_T_T_R {
        width: 40%;
      }
    }
    .navBottom_T {
      .navBottom_Left {
        width: 25%;
        p {
          font-size: 10px;
        }
      }
      .navBottom_Center {
        display: none;
      }
      .navBottom_Right {
        width: 40%;
        span {
          padding: 8px 12px;
          border-radius: 6px;
          margin: 0 5px 10px 0;
          font-size: 12px;
        }
      }
    }
    .navBottom_B {
      font-size: 8px;
    }
  }
}
</style>
