<!--
 * @Author: Cxy
 * @Date: 2021-02-27 23:02:14
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-11 17:35:57
 * @FilePath: \blog\blogNuxt\pages\About.vue
-->
<template>
  <div class='About'>
    <div class='About_Content'>
      <div class='About_Content_Item_Bg'>
        <div class='About_Content_Item'>
          <p>关于作者</p>
          <div class='font_content'>半路出家，从入门到放弃</div>
          <p>关于本站</p>
          <div class='font_content'>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://unsplash.com'>
                <img src='/logo/About/unsplash.svg' alt='Unsplash' >
              </a>
              <span>Unsplash</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://www.canva.cn'>
                <img src='/logo/About/canva.svg' alt='Canva' >
              </a>
              <span>Canva</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://www.qweather.com'>
                <img src='/logo/About/qweather.svg' alt='QWeather' >
              </a>
              <span>QWeather</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='http://6tail.cn/calendar/api.html#overview.html'>
                <img src='/logo/About/lunar.svg' alt='lunar' >
              </a>
              <span>lunar</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://markdown.com.cn'>
                <img src='/logo/About/markdown.svg' alt='Markdown'>
              </a>
              <span>Markdown</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://socketio.bootcss.com'>
                <img src='/logo/About/socketIo.svg' alt='Socket.IO'>
              </a>
              <span>Socket.IO</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='http://www.fontawesome.com.cn'>
                <img src='/logo/About/fontAwesome.svg' alt='fontAwesome'>
              </a>
              <span>Awesome</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://popper.js.org/'>
                <img src='/logo/About/popper.svg' alt='Popper'>
              </a>
              <span>Popper</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://nodejs.org/zh-cn/'>
                <img src='/logo/About/node.svg' alt='node'>
              </a>
              <span>Node</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://www.mongodb.com/zh-cn'>
                <img src='/logo/About/mongodb.svg' alt='mongo'>
              </a>
              <span>MongoDb</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://nuxtjs.org/'>
                <img src='/logo/About/nuxt.svg' alt='nuxt'>
              </a>
              <span>Nuxt</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://echarts.apache.org/zh/index.html'>
                <img src='/logo/About/echarts.svg' alt='echarts'>
              </a>
              <span>Echarts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.About {
  width: 100%;
  display: flex;
  position: relative;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.411);
  font-family: fa5-proxima-nova,"Helvetica Neue",Helvetica,Arial,sans-serif;
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    width: 50%;
    height: 22vh;
    background: rgba(0, 0, 0, 0.705);
    backdrop-filter: blur(4px);
    right: 0;
    border-radius: 10px;
  }
  &::after {
    content: '关 于';
    position: absolute;
    right: 0%;
    width: 50%;
    line-height: 22vh;
    color: #fff;
    font-size: 55px;
    font-weight: 900;
    text-align: center;
  }
  .About_Content {
    width: 100%;
    height: 70vh;
    margin: 12vh 0 8vh;
    padding: 0px 20% 0 10%;
    .About_Content_Item_Bg {
      width: 100%;
      height: 100%;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 40%;
        height: 90%;
        background-image: url(https://images.unsplash.com/photo-1505748407-2ad5f4c22d35?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80%20975w);
        background-size: cover;
        background-repeat: no-repeat;
        z-index: 2;
        border-radius: 10px;
      }
      .About_Content_Item {
        width: 60%;
        height: 75%;
        position: absolute; // 不写盖不住上层伪类
        right: 0;
        top: 25%;
        z-index: 1;
        color: #fff;
        background: rgba(0, 0, 0, 0.705);
        backdrop-filter: blur(4px);
        border-radius: 10px;
        padding-left: 35%;
        p {
          height: 22px;
          margin: 20px 0 15px 10px;
          border-left: solid 5px #fff;
          font-size: 22px;
          line-height: 22px;
          padding-left: 20px;
          box-sizing: border-box;
          font-weight: bold;
        }
        .font_content {
          color: #c9c9c9;
          font-size: 16px;
          padding-left: 15px;
          display: flex;
          flex-wrap: wrap;
          margin: 0 10px;
          .font_Content_Item {
            display: flex;
            flex-direction: column;
            text-align: center;
            margin-bottom: 10px;
            width: 20%;
            a {
              margin: 10px;
              width: calc(~'100% - 20%');
              height: 36px;
              font-size: 24px;
              color: #fff;
              img {
                width: 100%;
                height: 90%;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .About {
    &::before {
      width: 60%;
      height: 10vh;
    }
    &::after {
      width: 60%;
      line-height: 10vh;
      font-size: 35px;
    }
    .About_Content {
      width: 100%;
      height: 55vh;
      margin: 12vh 0 8vh;
      padding: 0 6%;
      .About_Content_Item_Bg {
        width: 100%;
        height: 100%;
        position: relative;
        &::before {
          height: 0;
        }
        &::after {
          left: 0;
          width: 100%;
          height: 95%;
        }
        .About_Content_Item {
          width: 100%;
          height: 95%;
          top: 5%;
          padding-left: 0;
          p {
            margin: 12px 0 12px 10px;
            border-left: solid 3px #fff;
            font-size: 18px;
          }
          .font_content {
            font-size: 14px;
            margin: 0 15px;
            &:last-child {
              padding-left: 0;
            }
          }
        }
      }
    }
  }
}
</style>
