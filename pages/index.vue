<!--
 * @Author: Cxy
 * @Date: 2021-12-27 17:47:35
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-06 17:25:51
 * @FilePath: \blog\blogNuxt\pages\index.vue
-->
<template>
  <div class='home_Wrap'>
    <div class='home_Swiper'>
      <div class='home_Swiper_Mask' />
      <div class='home_Swiper_Label_Wrap'>
        <div class='home_Welcome_Txt'>
          <p>欢迎到来</p>
          <p>{{ home_Poetry }}</p>
        </div>
        <div class='home_Swiper_Article'>
          <h2>热门文章</h2>
          <ul>
            <li
              v-for='(c, i) in home_Show_Data'
              :key='i'
              @click='jump_info_Blog(c.id_Article)'>
              <div
                :class="
                  c.cover_Article || Article_Default_BG ? '' : 'skeleton_Screen'
                "
                :style="{
                  backgroundImage:
                    'url(' + (c.cover_Article || Article_Default_BG) + ')',
                }"/>
              <div>
                <p :class="c.title_Article ? '' : 'skeleton_Screen'">
                  {{ c.title_Article }}
                </p>
                <p :class="c.id_Article ? '' : 'skeleton_Screen'">
                  {{ c.id_Article | dateFilter }}
                </p>
                <span :class="c.title_type ? '' : 'skeleton_Screen'">{{
                  c.title_type
                }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <p style='text-align: center'>
        <i
          class='fa fa-angle-double-down'
          aria-hidden='true'
          @click='scroll_One_Screen'/>
      </p>
    </div>
    <div class='home_Content_Wrap'>
      <div class='home_Administration'>
        <div class='home_Content_Title'>
          <h2>网站概览</h2>
          <span>展示网站当前刷新页面时的一些基本的概况，登录成功后会以实时的情景进行展示</span>
        </div>
        <div class='Administration_Lander_Wrap'>
          <div
            v-for='(c, i) in Lander_Data_Copy'
            :key='i'
            class='Administration_Right_Lander_Item'>
            <i class='fa' :class='c.icon' aria-hidden='true' />
            <p>{{ website_Data[c.code] }}+</p>
            <span>{{ c.txt }}</span>
          </div>
        </div>
      </div>
      <div class='home_Article_About'>
        <div class='home_Article'>
          <div class='home_Content_Title home_Content_Title_Dark'>
            <h2>文章速递</h2>
            <span>根据可选条件随机展示网站部分文章及内容</span>
          </div>
          <div class='home_Article_Con_Wrap'>
            <div class='home_Article_Con_Left'>
              <SHTab v-model='active_Tab' @tabClick='tabClick'>
                <SHTabPane name='_id'>最新的</SHTabPane>
                <SHTabPane name='Views_Article'>观看最多</SHTabPane>
                <SHTabPane name='like_Article'>喜欢最多</SHTabPane>
                <SHTabPane name='sample'>站长推荐</SHTabPane>
              </SHTab>
              <div
                :style="{ backgroundImage: 'url(' + (active_Data.cover_Article || Article_Default_BG) + ')' }"
                class='home_Article_Con_Left_Bg'>
                <div class='home_Article_Con_Left_Bg_Show'>
                  <p>{{ active_Data.title_Article }}</p>
                  <p v-if='Article_Tag_Total.length'>
                    <span
                      v-for='cc in active_Data.label_Article'
                      :key='cc._id'
                      :style='{backgroundColor: get_Tag_Color(cc)}'>
                      {{ cc.Tag_Name }}
                    </span>
                  </p>
                  <p>{{ $options.filters.dateFilter(active_Data.created_At) }}</p>
                </div>
                <div class='home_Article_Con_Left_Bg_Hide' v-html='active_Data.html_Article'/>
              </div>
            </div>
            <div class='home_Article_Con_Right'>
              <div
                v-for='c in article_Like_New_Data'
                :key='c._id'
                class='home_Article_Con_Right_Item'
                :class="
                  c._id === active_Id
                    ? 'home_Article_Con_Right_Item_Sel'
                    : ''
                "
                @mouseenter='hover_Select_Article(c)'
                @click='jump_info_Blog(c.id_Article)'>
                <div
                  :style="{ backgroundImage: 'url(' + (c.cover_Article || Article_Default_BG) + ')' }"
                  class='home_Article_Con_Right_Item_Bg'/>
                <div class='home_Article_Con_Right_Item_Con'>
                  <div>{{ c.title_Article }}</div>
                  <div>
                    <p v-if='Article_Tag_Total.length'>
                      <span
                        v-for='cc in c.label_Article'
                        :key='cc._id'
                        :style='{backgroundColor: get_Tag_Color(cc)}'>
                        {{ cc.Tag_Name }}
                      </span>
                    </p>
                    <p>{{ $options.filters.dateFilter(c.created_At) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='home_About'>
          <div class='home_Content_Title home_Content_Title_Dark'>
            <h2>本站简介</h2>
            <span>本站基本情况</span>
          </div>
          <div class='home_About_Con_Wrap'>
            <div class='home_About_Con'>
              <h3>初衷</h3>
              <p>网站旨在供小伙伴们可以通过此平台发布交流学习的平台</p>
              <div class='home_About_Con_Bg'/>
              <h3>功能</h3>
              <p>本站可通过用户注册账号后，在此站点上发布个人文章</p>
            </div>
          </div>
        </div>
      </div>
      <div class='home_Label_Weather'>
        <div class='home_Label'>
          <div class='home_Content_Title home_Content_Title_Dark'>
            <h2>标签预览</h2>
            <span>根据标签的囊括文章数量及标签的访问量展示</span>
          </div>
          <div class='home_Label_Con_Wrap'>
            <div ref='home_Label_Con' class='home_Label_Con' />
          </div>
        </div>
        <div class='home_Weather'>
          <div class='home_Content_Title home_Content_Title_Dark'>
            <h2>本地天气</h2>
            <span>根据定位信息展现本地天气亦可选择其他地区</span>
          </div>
          <div class='home_Weather_Con_Wrap'>
            <div v-if='now_Weather' class='home_Weather_Con'>
              <div class='weather_Current_Conditions'>
                <div class='home_Weather_City'>
                  <p>
                    <span>{{ current_Position }}</span>
                    <span>{{ now_Weather.text }}</span>
                  </p>
                  <i
                    class='fa fa-street-view'
                    aria-hidden='true'
                    @click="window.open('https://www.qweather.com')"/>
                </div>
                <div class='home_Weather_Temp'>
                  <s :class="'qi-' + now_Weather.icon + '-fill'" />
                  <p>
                    <span>{{ now_Weather.temp }}</span>
                    <span>℃</span>
                  </p>
                  <p v-if='FiveDay_Weather[0]'>
                    <span>
                      <i class='fa fa-angle-double-up' aria-hidden='true' />
                      {{ FiveDay_Weather[0].tempMax }}
                    </span>
                    <span>
                      <i class='fa fa-angle-double-down' aria-hidden='true' />
                      {{ FiveDay_Weather[0].tempMin }}
                    </span>
                  </p>
                </div>
                <div style='border-bottom: solid 1px rgba(121, 121, 121, 0.416);'/>
                <div class='home_Weather_other'>
                  <span>
                    <i class='fa fa-tint' aria-hidden='true' />{{
                      now_Weather.humidity + "%"
                    }}
                  </span>
                  <span>
                    <i class='fa fa-flag' aria-hidden='true' />
                    {{ now_Weather.windScale + "kmh" }}
                  </span>
                  <span>
                    <i class='fa fa-cloud' aria-hidden='true' />{{
                      now_Weather.cloud + "%"
                    }}
                  </span>
                </div>
              </div>
              <div class='home_Weather_Summary'>
                <div v-if='FiveDay_Weather[0]' class='sun_Rise_Set'>
                  <div class='sun_Rise_Set_Item'>
                    <div class='sun_Rise' />
                    <span>{{ FiveDay_Weather[0].sunrise }}</span>
                  </div>
                  <div class='sun_Rise_Set_Item'>
                    <div class='sun_Set' />
                    <span>{{ FiveDay_Weather[0].sunset }}</span>
                  </div>
                  <div class='sun_Rise_Set_Item'>
                    <i class='fa fa-leaf' aria-hidden='true' />
                    <span>{{ now_Weather.category }}</span>
                  </div>
                  <div class='sun_Rise_Set_Item'>
                    <i class='fa fa-umbrella' aria-hidden='true' />
                    <span>{{ FiveDay_Weather[0].uvIndex }}</span>
                  </div>
                </div>
                <div style='border-bottom: solid 1px rgba(121, 121, 121, 0.416);'/>
                <ul v-if='FiveDay_Weather' class='home_Weather_FiveDay'>
                  <li
                    v-for='(c, i) in FiveDay_Weather.filter((c, i) => i !== 0)'
                    :key='i'>
                    <span>{{ c.tempMin + "°/" + c.tempMax + "°" }}</span>
                    <div class='home_Weather_FiveDay_Icon'>
                      <s :class="'qi-' + c.iconDay + '-fill'" />
                      <s :class="'qi-' + c.iconNight + '-fill'" />
                    </div>
                    <span>{{ c.fxDate.slice(-5) }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import {
  article_Find_New_Like,
  home_Page_Statistics,
  home_Page_Statistics_Num,
  random_To_Articles
} from '@/http/model/article.js'
export default {
  data() {
    return {
      home_Show_Data: [],
      article_Like_New_Data: [],
      Lander_Data_Copy: [],
      website_Data: {
        ON_LINE: 0, // 在线人数
        VISITS: 0, // 网站访问量
        ARTICLE_COUNT: 0 // 文章总数
      },
      active_Tab: '_id',
      active_Data: {},
      active_Id: '',
      myChartGra: null
    }
  },
  methods: {
    ...mapActions('article', ['Article_Tag_Find']),
    ...mapMutations(['jump_info_Blog']),
    hover_Select_Article(c) {
      this.active_Data = c
      this.active_Id = c._id
    },
    scroll_One_Screen() {
      /**
       * @description: VUE自带锚点移动方法
       * @param {*} behavior 定义过渡动画
       * @param {*} block  定义垂直对齐
       * @param {*} inline  定义水平对齐方式
       */
      document.querySelector('.home_Content_Title').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      })
    },
    async tabClick(name) {
      if (this.active_Tab === name) return
      this.active_Tab = name
      let data = []
      if (name === 'sample') {
        data = await this.get_Element_Blog_Data()
      } else {
        data = await this.article_Find_New_Like_Data(name)
      }
      this.article_Like_New_Data = data
      this.active_Data = data[0]
      this.active_Id = data[0]._id
    },
    home_Page_Statistics_Opar() {
      home_Page_Statistics_Num().then((res) => {
        const { code, massage, data } = res.data
        if (code === 200) {
          this.call_Move_Num_Plus(data.data || [])
        } else {
          this.$Msg(massage, 'faild')
        }
      })
    },
    call_Move_Num_Plus(data) {
      const iconData = ['fa-dribbble', 'fa-book', 'fa-laptop']
      const txtData = ['在线人数', '文章总数', '网站浏览量']
      data.forEach((c, i) => {
        c.icon = iconData[i]
        c.txt = txtData[i]
        this.Move_Num_Plus(c.countNum, c.code)
      })
      this.Lander_Data_Copy = data
    },
    Move_Num_Plus(totle, code) {
      this[code + 'timer'] = setInterval(
        () => {
          if (this.website_Data[code] < totle) {
            this.website_Data[code] +=
              totle >= 300 ? Math.floor(totle / 300) : 1
          } else {
            this.website_Data[code] = totle
            clearInterval(this[code + 'timer'])
          }
        },
        totle >= 300 ? 10 : Math.floor(3000 / totle)
      )
    },
    article_Find_New_Like_Data(name) {
      return new Promise((resolve, reject) => {
        article_Find_New_Like({ name, size: 4, type: true }).then((res) => {
          const { code, massage, data } = res.data
          if (code === 200) {
            resolve(data.data)
          } else {
            this.$Msg(massage, 'faild')
            reject(massage)
          }
        })
      })
    },
    get_Element_Blog_Data() {
      return new Promise((resolve, reject) => {
        const params = { size: 3, type: true }
        random_To_Articles(JSON.stringify(params)).then((res) => {
          const { code, massage, data } = res.data
          if (code === 200) {
            resolve(data.data)
          } else {
            this.$Msg(massage, 'faild')
            reject(massage)
          }
        })
      })
    },
    opation_Gra_Echarts() {
      const { myChartGra, Article_Tag_Total } = this
      const optionChart = {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(50,50,50,0.7)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '文章标签',
            type: 'wordCloud',
            left: 'center',
            top: 'center',
            width: '90%',
            height: '90%',
            rotationRange: [0, 0],
            gridSize: 20,
            sizeRange: [16, 90],
            data: Article_Tag_Total.map((c) => {
              c.name = c.Tag_Name
              c.value = c.sort_ArticelTag
              return c
            }),
            textStyle: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: function({ data: { tag_Color }}) {
                return tag_Color
              },
              shadowBlur: 10,
              shadowColor: '#000'
            },
            emphasis: {
              // focus: 'self',
              textStyle: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            }
          }
        ]
      }
      myChartGra.setOption(optionChart)
    }
  },
  computed: {
    ...mapState('article', ['Article_Tag_Total', 'Article_Default_BG']),
    ...mapState('mixed', [
      'current_Position',
      'FiveDay_Weather',
      'now_Weather_Day_Night',
      'now_Weather',
      'air_Weather',
      'home_Poetry'
    ]),
    get_Tag_Color() {
      return (cc) => {
        return (
          this.Article_Tag_Total.find((i) => i.Tag_Name === cc.Tag_Name)
            ?.tag_Color || ''
        )
      }
    }
  },
  async asyncData() {
    const home_Stati_Res = await home_Page_Statistics()
    const home_NeLi_Res = await article_Find_New_Like({ name: '_id', size: 4, type: true })
    const home_NeLi_Data = home_NeLi_Res.data.data.data || []
    return {
      home_Show_Data: home_Stati_Res.data.data.data,
      article_Like_New_Data: home_NeLi_Data,
      active_Data: home_NeLi_Data[0],
      active_Id: home_NeLi_Data[0]?._id
    }
  },
  async mounted() {
    this.home_Page_Statistics_Opar()
    await this.Article_Tag_Find()
    this.myChartGra = this.$echarts.init(this.$refs.home_Label_Con)
    this.opation_Gra_Echarts()
    this.myChartGra.on('click', ({ data: { Tag_Name }}) => {
      this.$router.push({ name: 'Blog', params: { Tag_Name }})
    })
  }
}
</script>

<style lang="less" scoped>
.home_Wrap {
  width: 100%;
  margin-top: -61px;
  .home_Swiper {
    width: 100%;
    height: calc(~"100vh - 30px");
    position: relative;
    color: #fff;
    .home_Swiper_Mask {
      height: 61px;
      width: 100%;
      backdrop-filter: blur(23px);
      background: #00000052;
    }
    .home_Swiper_Label_Wrap {
      width: 82%;
      height: calc(100vh - 140px);
      margin: 0 9%;
      padding: 14vh 0 10vh 0;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      font-size: 14px;
      .home_Welcome_Txt {
        flex: 1;
        margin-right: 180px;
        align-self: flex-end;
        p {
          font-size: 40px;
          line-height: 60px;
        }
      }
      .home_Swiper_Article {
        width: 27%;
        height: 360px;
        backdrop-filter: blur(4px);
        background: rgba(0, 0, 0, 0.13);
        padding: 20px;
        display: flex;
        flex-direction: column;
        h2 {
          margin-bottom: 20px;
        }
        ul {
          flex: 1;
          display: flex;
          flex-direction: column;
          li {
            display: flex;
            flex: 1;
            margin-bottom: 20px;
            background: #0000004d;
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
            }
            div:first-child {
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              width: 35%;
              height: 100%;
              margin-right: 20px;
            }
            div:last-child {
              flex: 1;
              position: relative;
              padding: 10px 0;
              p:first-child {
                line-height: 1.4;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                width: 97%;
                height: 40px;
                & + p {
                  font-size: 10px;
                  position: absolute;
                  bottom: 10px;
                  height: 12px;
                }
              }
              span {
                font-size: 10px;
                position: absolute;
                right: 0;
                bottom: 0;
                background: #b8986549;
                padding: 2px 5px;
                border-radius: 5px 0 0 0;
              }
            }
          }
          li:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    i {
      font-size: 40px;
      animation-name: home_Swiper_i;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      cursor: pointer;
      @keyframes home_Swiper_i {
        0% {
          transform: translateY(0) scaleX(1.2);
        }
        100% {
          transform: translateY(8px) scaleX(1.5);
        }
      }
    }
  }
  .home_Content_Wrap {
    width: 100%;
    .home_Content_Title {
      padding: 30px 0;
      letter-spacing: 2px;
      font-weight: 500;
      color: #595959;
      text-align: center;
      font-size: 22px;
      span {
        font-size: 12px;
        padding-top: 15px;
        display: block;
      }
    }
    .home_Administration {
      background: #fff;
      padding: 3vh 0 6vh 0;
      .Administration_Lander_Wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 160px;
        padding: 0 2%;
        box-sizing: border-box;
        .Administration_Right_Lander_Item {
          width: 30%;
          text-align: center;
          position: relative;
          font-family: "Lucida Console", "Courier New", monospace;
          &::before {
            position: absolute;
            content: "";
            right: -25px;
            top: 0px;
            width: 1px;
            height: 100%;
            border-right: 1px dashed rgba(64, 64, 64, 0.5);
          }
          i {
            font-size: 84px;
            color: #979797;
          }
          p {
            font-size: 45px;
            color: #32297b;
          }
          span {
            color: #222222;
            font-size: 18px;
            text-transform: uppercase;
            font-weight: 500;
          }
        }
        div:last-child {
          &::before {
            border: 0;
          }
        }
      }
    }
    .home_Article_About {
      height: 80vh;
      display: flex;
      .home_Article, .home_About {
        display: flex;
        flex-direction: column;
        .home_Article_Con_Wrap, .home_About_Con_Wrap {
          background: #fff;
          flex: 1;
          display: flex;
          align-items: center;
        }
      }
      .home_Article {
        width: 70%;
        .home_Content_Title_Dark {
          h2, span {
            margin-left: 13%;
            width: 80%;
          }
        }
        .home_Article_Con_Wrap {
          .home_Article_Con_Left {
            width: 45%;
            height: 80%;
            display: flex;
            flex-direction: column;
            margin-left: 13%;
            .TabsUi {
              font-size: 0;
              width: 100%;
              margin-bottom: 20px;
              .TabPaneUi {
                margin: 0 5%;
                font-size: 16px;
              }
            }
            .home_Article_Con_Left_Bg {
              flex: 1;
              background-position: center;
              background-size: cover;
              padding: 8%;
              color: #fff;
              overflow: hidden;
              border-radius: 5px;
              position: relative;
              .home_Article_Con_Left_Bg_Show {
                transition: 0.5s all;
                position: absolute;
                width: 84%;
                height: 84%;
                p {
                  font-size: 12px;
                }
                p:first-child {
                  font-size: 24px;
                  font-weight: bold;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                p:nth-child(2) {
                  margin: 5% 0 3% 0;
                  span {
                    border-radius: 5px;
                    padding: 2px 6px;
                    margin-right: 5px;
                  }
                }
              }
              .home_Article_Con_Left_Bg_Hide {
                position: absolute;
                transition: 0.5s all;
                width: 84%;
                height: 84%;
                transform: translate3d(110%, 0%, 0);
                background: rgba(0, 0, 0, 0.402);
                opacity: 0;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 5px;
                font-size: 14px;
                line-height: 20px;
                overflow: hidden;
              }
              &:hover {
                .home_Article_Con_Left_Bg_Show {
                  transform: translate3d(-110%, 0, 0);
                }
                .home_Article_Con_Left_Bg_Hide {
                  transform: translate3d(0, 0, 0);
                  opacity: 1;
                }
              }
            }
          }
          .home_Article_Con_Right {
            margin: 0 3% 0 2%;
            width: 55%;
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .home_Article_Con_Right_Item {
              height: 26%;
              padding: 2%;
              border-radius: 5px;
              display: flex;
              border: 1px solid #f0f0f0;
              transition: 0.4s box-shadow;
              cursor: pointer;
              .home_Article_Con_Right_Item_Bg {
                border-radius: 5px;
                height: 100%;
                width: 35%;
                background-position: center;
                background-size: cover;
              }
              .home_Article_Con_Right_Item_Con {
                width: 60%;
                margin-left: 5%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                div:first-child {
                  font-size: 16px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
                div:last-child {
                  font-size: 12px;
                  display: flex;
                  flex-direction: column;
                  p:first-child {
                    margin-bottom: 6px;
                    span {
                      border-radius: 5px;
                      padding: 2px 6px;
                      color: #fff;
                      margin-right: 5px;
                    }
                  }
                }
              }
            }
            .home_Article_Con_Right_Item_Sel {
              box-shadow: 1px 1px 5px 0px #00000032;
              background: aliceblue;
            }
          }
        }
      }
      .home_About {
        width: 30%;
        .home_Content_Title_Dark {
          h2, span {
            margin-right: 37%;
          }
        }
        .home_About_Con_Wrap {
          .home_About_Con {
            margin-right: 37%;
            border: 1px solid #f0f0f0;
            padding: 5%;
            box-sizing: border-box;
            height: 80%;
            &:hover {
              box-shadow: 1px 1px 5px 0px #00000032;
              background: aliceblue;
            }
            p {
              font-size: 14px;
              line-height: 26px;
            }
            .home_About_Con_Bg {
              height: 45%;
              width: 100%;
              background: url(/logo/businessCard.png) no-repeat center;
              background-size: cover;
            }
          }
        }
      }
    }
    .home_Label_Weather {
      height: 65vh;
      display: flex;
      .home_Label, .home_Weather {
        display: flex;
        flex-direction: column;
        .home_Label_Con_Wrap, .home_Weather_Con_Wrap {
          background: #fff;
          flex: 1;
          display: flex;
          align-items: center;
        }
      }
      .home_Label {
        width: 62%;
        .home_Content_Title_Dark {
          h2, span {
            margin-left: 16%;
            width: 80%;
          }
        }
        .home_Label_Con_Wrap {
          .home_Label_Con {
            width: 80%;
            height: 76%;
            margin-left: 16%;
            border: 1px solid #f0f0f0;
            border-radius: 10px;
            &:hover {
              background: aliceblue;
              box-shadow: 1px 1px 5px 0px #00000014;
            }
          }
        }
      }
      .home_Weather {
        width: 38%;
        .home_Content_Title_Dark {
          h2, span {
            margin-right: 26%;
          }
        }
        .home_Weather_Con_Wrap {
          .home_Weather_Con {
            color: #606060;
            height: 76%;
            width: 82%;
            overflow: hidden;
            position: relative;
            border: 1px solid #f0f0f0;
            border-radius: 10px;
            font-size: 14px;
            margin-right: 26%;
            &:hover {
              background: aliceblue;
              box-shadow: 1px 1px 5px 0px #00000014;
            }
            .weather_Current_Conditions {
              width: 100%;
              height: 100%;
              padding: 25px;
              box-sizing: border-box;
              position: absolute;
              top: 0;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              animation: Current_Conditions 8s cubic-bezier(0.9, 0.01, 0.01, 0.9)
                infinite;
              @keyframes Current_Conditions {
                0% {
                  top: 0;
                }
                12.5% {
                  top: -100%;
                  opacity: 1;
                }
                13.5% {
                  top: -100%;
                  opacity: 0;
                }
                14.5% {
                  top: 100%;
                  opacity: 0;
                }
                50% {
                  top: 100%;
                  opacity: 1;
                }
                62.5% {
                  top: 0;
                }
                100% {
                  top: 0;
                }
              }
              .home_Weather_City {
                display: flex;
                justify-content: space-between;
                p {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  span:first-child {
                    font-size: 22px;
                    font-weight: bold;
                    color: rgb(0, 0, 0);
                  }
                  span:last-child {
                    margin-top: 6px;
                    font-size: 14px;
                  }
                }
                i {
                  font-size: 16px;
                  cursor: pointer;
                }
              }
              .home_Weather_Temp {
                display: flex;
                justify-content: space-between;
                align-items: center;
                s {
                  font-size: 60px;
                  color: #ffd371;
                }
                s + p {
                  display: flex;
                  align-items: center;
                  height: 40px;
                  span:first-child {
                    font-size: 60px;
                    color: #000;
                    font-weight: bold;
                  }
                  span:last-child {
                    align-self: flex-start;
                    font-size: 16px;
                  }
                }
                p:last-child {
                  display: flex;
                  justify-content: space-between;
                  flex-direction: column;
                  height: 100%;
                  font-size: 16px;
                }
              }
              .home_Weather_other {
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                margin-top: 10px;
                i {
                  margin-right: 10px;
                }
              }
            }
            .home_Weather_Summary {
              width: 100%;
              height: 100%;
              padding: 25px;
              box-sizing: border-box;
              position: absolute;
              top: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              animation: Weather_FiveDay 8s cubic-bezier(0.9, 0.01, 0.01, 0.9)
                infinite;
              @keyframes Weather_FiveDay {
                0% {
                  top: 100%;
                }
                12.5% {
                  top: 0;
                }
                50% {
                  top: 0;
                }
                62.5% {
                  top: -100%;
                  opacity: 1;
                }
                63.5% {
                  top: -100%;
                  opacity: 0;
                }
                100% {
                  top: 100%;
                  opacity: 0;
                }
              }
              .sun_Rise_Set {
                display: flex;
                justify-content: space-around;
                margin: 0 10px 0px;
                .sun_Rise_Set_Item {
                  display: flex;
                  align-items: center;
                  .sun_Rise,
                  .sun_Set {
                    width: 34px;
                    height: 34px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    margin-right: 10px;
                  }
                  .sun_Rise {
                    background-image: url(/logo/sunrise.svg);
                  }
                  .sun_Set {
                    background-image: url(/logo/sunset.svg);
                  }
                  i {
                    margin-right: 10px;
                    font-size: 24px;
                  }
                }
              }
              .home_Weather_FiveDay {
                display: flex;
                justify-content: space-between;
                text-align: center;
                align-items: center;
                margin: 0 10px;
                .home_Weather_FiveDay_Icon {
                  s {
                    font-size: 24px;
                    margin: 10px 2px;
                    color: #ffd371;
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
      }
    }
    .home_Content_Title_Dark {
      color: #fff;
      background: #000000bd;
    }
  }
}

@media screen and (max-width: 750px) {
  .home_Wrap {
    .home_Swiper {
      .home_Swiper_Label_Wrap {
        width: 90%;
        margin: 0 5%;
        .home_Welcome_Txt {
          display: none;
        }
        .home_Swiper_Article {
          width: 100%;
        }
      }
    }
    .home_Content_Wrap {
      .home_Content_Title {
        padding: 20px 0;
        h2 {
          font-size: 26px;
          width: 100%;
          margin: 0;
        }
        span {
          width: 100%;
          margin: 0;
        }
      }
      .home_Administration {
        .Administration_Lander_Wrap {
          .Administration_Right_Lander_Item {
            width: 33%;
            &::before {
            right: 0;
            }
            i {
              font-size: 50px;
            }
            p {
              font-size: 25px;
            }
            span {
              font-size: 12px;
            }
          }
        }
      }
      .home_Article_About {
        flex-direction: column;
        height: 100vh;
        .home_Article, .home_About {
          .home_Article_Con_Wrap, .home_About_Con_Wrap {
            flex-direction: column;
          }
        }
        .home_Article {
          width: 100%;
          height: 70%;
          .home_Content_Title_Dark {
            h2, span {
              margin-left: 0;
              width: 100%;
            }
          }
          .home_Article_Con_Wrap {
            .home_Article_Con_Left {
              width: 95%;
              margin-left: 5%;
              height: 55px;
              .TabsUi {
                .TabPaneUi {
                  margin: 0 3%;
                }
              }
              .home_Article_Con_Left_Bg {
                display: none;
              }
            }
            .home_Article_Con_Right {
              width: 90%;
            }
          }
        }
        .home_About {
          width: 100%;
          flex: 1;
          .home_About_Con_Wrap {
            .home_About_Con {
              margin-right: 0;
              height: 100%;
              width: 90%;
              border: 1px solid #f0f0f000;
              .home_About_Con_Bg {
                display: none;
              }
            }
          }
        }
      }
      .home_Label_Weather {
        flex-direction: column;
        height: 90vh;
        .home_Label, .home_Weather {
          height: 50%;
          width: 100%;
          .home_Label_Con_Wrap, .home_Weather_Con_Wrap {
            .home_Label_Con, .home_Weather_Con {
              width: 90%;
              margin-left: 5%;
              margin-right: 0;
              height: 85%;
            }
          }
          .home_Content_Title_Dark {
            h2, span {
              margin-left: 0;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
