<!--
 * @Author: Cxy
 * @Date: 2021-02-27 23:02:14
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-30 15:23:24
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
                <img class='Unsplash' src='https://unsplash.com/assets/core/logo-white-8962708214629a3e8f9fbf5b87b70c3ace41c4175cbcc267f7fbb8449ac45bdd.svg' alt='Unsplash' >
              </a>
              <span>Unsplash</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://www.canva.cn'>
                <img class='Canva' src='/assets/logo/canva.svg' alt='Canva' >
              </a>
              <span>Canva</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://www.qweather.com'>
                <img class='QWeather' src='https://dev.qweather.com/assets/images/logo-s-light.png' alt='QWeather' >
              </a>
              <span>QWeather</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='http://6tail.cn/calendar/api.html#overview.html'>
                <img class='Canva' src='/logo/lunar.png' alt='lunar' >
              </a>
              <span>lunar</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://markdown.com.cn'>
                <img class='Markdown' src='https://markdown.com.cn/hero.png' alt='Markdown' style='background: white' >
              </a>
              <span>Markdown</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://socketio.bootcss.com'>
                <img class='QWeather' src='https://socketio.bootcss.com/images/favicon.png' alt='Socket.IO' style='background: white' >
              </a>
              <span>Socket.IO</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='http://www.fontawesome.com.cn'>
                <i class='fa fa-flag' aria-hidden='true'/>
              </a>
              <span>Font<br > Awesome</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://popper.js.org/'>
                <img class='QWeather' src='https://popper.js.org/static/popper-logo-outlined-fb38d0b34a253d52fc74cd9c4f3dcec3.svg' alt='Popper' style='background: white' >
              </a>
              <span>Popper</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='http://expressjs.com/'>
                Express
              </a>
              <span>Express</span>
            </div>
            <div class='font_Content_Item'>
              <a target='_blank' href='https://www.mongodb.com/zh-cn'>
                <img class='mongodb' src='https://www.mongodb.org.cn/Application/Home/View/Public/img/mongodb-logo-white.png' >
              </a>
              <span>MongoDb</span>
            </div>
            <div class='font_Content_Item'><a/></div>
            <div class='font_Content_Item'><a/></div>
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
        z-index: 1;
        border-radius: 10px;
      }
      &::after {
        content: '';
        position: absolute;
        left: 140px;
        bottom: 0;
        width: calc(100% - 140px);
        height: 75%;
        background: rgba(0, 0, 0, 0.705);
        backdrop-filter: blur(4px);
        border-radius: 10px;
      }
      .About_Content_Item {
        width: 59%;
        height: 75%;
        position: absolute; // 不写盖不住上层伪类
        right: 0;
        top: 25%;
        z-index: 1;
        color: #fff;
        p {
          height: 22px;
          margin: 20px 0 20px 10px;
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
            a {
              margin-bottom: 20px;
              margin: 10px;
              width: 100px;
              height: 40px;
              font-size: 24px;
              color: #fff;
              .Unsplash {
                width: 35px;
              }
              .Canva {
                width: 90px;
              }
              .QWeather {
                width: 40px;
              }
              .Markdown {
                width: 60px;
              }
              i {
                font-size: 40px;
              }
              .mongodb {
                width: 84px;
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
          p {
            margin: 12px 0 12px 10px;
            border-left: solid 3px #fff;
            font-size: 18px;
          }
          .font_content {
            font-size: 14px;
            justify-content: space-between;
            .font_Content_Item {
              display: flex;
              flex-direction: column;
              text-align: center;
              margin-bottom: 10px;
              a {
                width: 50px;
                height: 35px;
                font-size: 14px;
                .Unsplash {
                  width: 30px;
                }
                .Canva {
                  width: 50px;
                }
                .QWeather {
                  width: 32px;
                }
                .Markdown {
                  width: 36px;
                }
                i {
                  font-size: 28px;
                }
                .mongodb {
                  width: 56px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
