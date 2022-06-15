<!--
 * @Author: Cxy
 * @Date: 2021-03-03 14:18:15
 * @LastEditors: Cxy
 * @LastEditTime: 2022-06-14 10:49:59
 * @FilePath: \ehomes-admind:\gitHubBlog\blogNuxt\components\navTopBottom\navTop.vue
-->
<template>
  <div ref='pronbit' class='home_Top_Nav'>
    <div class='nav_Top_Wrap'>
      <div class='nav_Top_Left'>
        <span v-if='now_Weather.text'>
          {{ current_Position }}
          <SHToolTip
            ref='SHToolTip'
            eventType='click'
            direction='bottom-start'
            :offset='[-11, 15]'
            iconColor='#fff'>
            <div class='search_City'>
              <SHInput
                v-model='city_Pinyin'
                disabled
                placeholder='搜索城市'
                @input='search_City'/>
              <i
                class='fa fa-compass'
                aria-hidden='true'
                @click='manual_Positioning'/>
              <ul v-if='Hot_City.length'>
                <li v-for='c in Hot_City' :key='c.id'>
                  <span @click='location_integration_City(c)'>{{
                    c.name + "--" + c.adm2 + "--" + c.adm1
                  }}</span>
                </li>
              </ul>
            </div>
            <span slot='icon'>
              <i class='fa fa-map-marker' aria-hidden='true' />
            </span>
          </SHToolTip>
          <a
            target='_blank'
            style='
              display: inline-block;
              margin: 0 17px 0 10px;
              cursor: pointer;
            '
            :title="'更新时间：' + now_Weather.obsTime"
            href='https://www.qweather.com'>
            {{ now_Weather.text + " " + now_Weather.temp + "℃" }}
          </a>
        </span>
        <span>
          {{ solar_Nav_Top }}
          {{
            "\xa0周" + Calendar.Solar.fromDate(new Date()).getWeekInChinese()
          }}
        </span>
      </div>
      <div class='nav_Top_Right_Wrap'>
        <div class='nav_Top_Right_Share'>
          <a class='fa fa-power-off' aria-hidden='true' @click='jump_port_Record({ routeUrl: $route.fullPath })' />
        </div>
        <div class='nav_Top_Right_Share'>
          <a href='https://weibo.com/u/2251591987' target='_blank'>
            <i class='fa fa-weibo' aria-hidden='true'/></a>
        </div>
        <div class='nav_Top_Right_Share'>
          <SHToolTip
            eventType='hover'
            direction='top'
            :offset='[0, 15]'
            iconColor='#fff'>
            <SHImage
              style='width: 80px; height: 80px'
              typeImg='img'
              src='/logo/weixinerweima.png'/>
            <i slot='icon' class='fa fa-weixin' aria-hidden='true' />
          </SHToolTip>
        </div>
        <div class='nav_Top_Right_Share'>
          <a
            target='_blank'
            :href="'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2468529643&website=www.oicqzone.com'"><i class='fa fa-qq' aria-hidden='true'/></a>
        </div>
      </div>
      <div
        class='nav_Top_Menus_Icon_Wrap'
        :class="nav_Top_Menus_TF === true ? 'nav_Top_Menus_Toggle' : ''"
        @click='nav_Top_Menus_TF = !nav_Top_Menus_TF'>
        <div class='nav_Top_Menus_Icon' />
      </div>
      <div v-if='nav_Top_Menus_TF' class='nav_Top_Menus_Wrap'>
        <div class='nav_Top_Menus_Move_Animation'>
          <div class='nav_Top_Menus'>
            <!-- $router.push跳转不刷新页面 router-link跳转会刷新页面 影响vuex使用 -->
            <ul>
              <li
                v-for='(c, i) in nav_Data'
                :key='i'
                class='reast_Active_Style'
                :class="
                  c.path === current_Router ? 'router-link-exact-active' : ''
                ">
                <span
                  @click='
                    $router.push({ path: c.path }), (nav_Top_Menus_TF = false)
                  '>{{ c.title }}</span>
              </li>
            </ul>
            <!-- <router-link
              v-for="(c, i) in nav_Data"
              :key="i"
              :to="'/' + c.path"
              v-slot="{ href, isActive, isExactActive }"
              custom
            >
              <div
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active',
                ]"
                class="reast_Active_Style"
              >
                <a :href="href">{{ c.title }}</a>
              </div>
            </router-link> -->
            <div class='nav_Top_Menus_Top' />
            <div class='nav_Top_Menus_Bottom'>
              <div class='nav_Top_Right_Share'>
                <a
                  :href="'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2468529643&website=www.oicqzone.com'">
                  <i class='fa fa-qq' aria-hidden='true' />
                </a>
              </div>
              <div class='nav_Top_Right_Share'>
                <SHToolTip
                  eventType='click'
                  iconColor='#fff'
                  direction='top'
                  :offset='[0, 20]'>
                  <SHImage
                    style='width: 50px; height: 50px'
                    src='/logo/weixinerweima.png'/>
                  <i slot='icon' class='fa fa-weixin' aria-hidden='true' />
                </SHToolTip>
              </div>
              <div class='nav_Top_Right_Share'>
                <a href='https://weibo.com/u/2251591987' target='_blank'>
                  <i class='fa fa-weibo' aria-hidden='true' />
                </a>
              </div>
              <div class='nav_Top_Right_Share'>
                <i class='fa fa-power-off' aria-hidden='true' @click='jump_port_Record({ routeUrl: $route.fullPath })' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class='nav_wrap'
      :class="nav_height_Flag === true ? 'nav_height_Flag' : ''"
      :style="{
        background:
          nav_height_Flag === false
            ? nav_Background_Flag === true
              ? '#00000000'
              : 'black'
            : '',
      }">
      <div class='nav_Logo' />
      <div class='nav_Router_Wrap'>
        <div class='nav_Router'>
          <ul>
            <li
              v-for='(c, i) in nav_Data'
              :key='i'
              class='reast_Active_Style'
              :class="
                c.path === current_Router ? 'router-link-exact-active' : ''
              ">
              <span @click='$router.push({ path: c.path })'>{{ c.title }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if='!$route.query.remainingTime'
        class='nav_Search'
        @click='nav_Search_Flag = !nav_Search_Flag'>
        <i class='fa fa-search' aria-hidden='true' />
      </div>
    </div>
    <div
      class='nav_Search_Flag'
      :style="{ top: nav_height_Flag === true ? '50px' : '90px' }"
      :class="nav_Search_Flag === true ? 'nav_Search_Flag_Move' : ''">
      <div
        class='nav_Search_Wrap'
        :style="
          search_Data.length
            ? 'transform: translate3d(0, 0, 0);width: 100%;'
            : 'transform: translate3d(20%, 65%, 0);width: 74%;'
        ">
        <p v-if='!search_Data.length' class='nav_Search_font'>search</p>
        <div class='nav_Search_Ipt_Wrap'>
          <input
            v-model='search_Val'
            type='text'
            class='nav_Search_Ipt'
            placeholder='搜索Node VsCode'
            @keydown.enter='search'>
          <span class='nav_Search_Btn' @click='search'>
            <i class='fa fa-search' aria-hidden='true' />
          </span>
        </div>
        <div class='nav_Search_Example'>
          <p>建议关键字：</p>
          <p>
            <span
              v-for="c in Article_Tag_Total.filter((c) => c._id !== '未分类')"
              :key='c._id'
              @click='search_Val = c.Tag_Name'>{{ c.Tag_Name }}</span>
          </p>
        </div>
      </div>
      <div
        class='nav_Search_Content'
        :style="{
          transform: search_Data.length
            ? 'scale3d(1, 1, 1)'
            : 'scale3d(0, 0, 0)',
        }">
        <div
          v-for='c in search_Data'
          :key='c._id'
          class='nav_Search_Content_Item'>
          <h3>{{ c.title_Article }}</h3>
          <div
            class='
              nav_Search_Content_Item_Html
              markdown-body markdown-body-none-img
            '
            @click='
              jump_info_Blog({
                id_Article: c.id_Article,
                currentPageJump: true,
              })
            '
            v-html="c.html_Article.replace(/<(?!\/?br\/?.+?>)[^<>]*>/gm, '')"/>
        </div>
      </div>
    </div>
    <div ref='scrollProgress' class='scroll_progress' />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { article_Search_Fuzzy } from '@/http/model/article.js'
export default {
  data() {
    return {
      current_Router: '', // 选中后样式
      solar_Nav_Top: '', // 日历显示
      nav_Search_Flag: false, // 搜索显示
      nav_Top_Menus_TF: false, // 小屏设备下导航显隐
      nav_height_Flag: false, // 页面滚动导航变化
      nav_Background_Flag: false, // 首页添加透明背景
      search_Val: '', // 搜索内容
      search_Data: [], // 搜索结果
      city_Pinyin: '',
      search_City_Timer: null,
      nav_Data: [
        { title: '首页', path: '/' },
        { title: '博客', path: '/Blog' },
        { title: '直播', path: '/Live' },
        { title: '时间轴', path: '/TimeLine' },
        { title: '关于', path: '/About' },
        { title: '留言', path: '/Contact' }
      ]
    }
  },
  computed: {
    ...mapState('article', ['Article_Tag_Total']),
    ...mapState(['app_Background_Url']),
    ...mapState('mixed', ['current_Position', 'now_Weather', 'Hot_City'])
  },
  created() {
    const L = this.Calendar.Lunar.fromDate(new Date())
    this.solar_Nav_Top = L.getMonthInChinese() + '月' + L.getDayInChinese()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScrollx, true)
    this.get_geographical_Position()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScrollx, true)
  },
  methods: {
    ...mapMutations(['jump_info_Blog', 'jump_port_Record']),
    ...mapMutations('mixed', ['set_Hot_City']),
    ...mapActions('mixed', [
      'get_geographical_Position',
      'location_integration'
    ]),
    ...mapActions('article', ['Article_Tag_Find']),
    manual_Positioning() {
      if (this.search_City_Timer) clearTimeout(this.search_City_Timer)
      this.search_City_Timer = setTimeout((_) => {
        this.$Msg('正在定位请稍后', 'success')
        this.$refs.SHToolTip.SHOpertion()
        this.get_geographical_Position()
        this.city_Pinyin = ''
      }, 1000)
    },
    location_integration_City(c) {
      this.$refs.SHToolTip.SHOpertion()
      this.location_integration({
        position: { R: Number(c.lon), Q: Number(c.lat) },
        addressComponent: { district: c.name, city: c.adm2, province: c.adm1 }
      })
    },
    search_City() {
      const { city_Pinyin } = this
      if (this.search_City_Timer) clearTimeout(this.search_City_Timer)
      this.search_City_Timer = setTimeout((_) => {
        fetch(
          'https://geoapi.qweather.com/v2/city/lookup?location=' +
            city_Pinyin +
            '&key=d2ae781d61744d65a2ef2156eef2cb64'
        )
          .then((response) => response.json())
          .then((res) => {
            const { code, location } = res
            if (code === '200') {
              this.set_Hot_City(location)
              this.search_City_Timer = null
            } else {
              this.set_Hot_City([])
            }
          })
          .catch((err) => {
            throw new Error(err)
          })
      }, 1000)
    },
    handleScrollx() {
      const height =
        document.getElementById('app').scrollHeight -
        document.documentElement.clientHeight
      const scrollTop = document.getElementById('app').scrollTop
      this.$refs.scrollProgress.style.width = `${(scrollTop / height) * 100}%`
      const top = this.$refs.pronbit.parentElement.scrollTop
      if (top > 5 && this.nav_height_Flag !== true) {
        this.nav_height_Flag = true
      } else if (top === 0 && this.nav_height_Flag !== false) {
        this.nav_height_Flag = false
      }
    },
    search() {
      const { search_Val } = this
      if (this.search_City_Timer) clearTimeout(this.search_City_Timer)
      this.search_City_Timer = setTimeout((_) => {
        article_Search_Fuzzy({ search_Val }).then((res) => {
          const { code, data, massage } = res.data
          if (code === 200) {
            this.search_Data = data.data || []
            if (!this.search_Data.length) this.$Msg('未搜索到相关词条', 'wran')
          } else if (code === 403) {
            this.$Msg(massage, 'wran')
          }
        })
      }, 1000)
    }
  },
  watch: {
    $route: {
      handler(newV) {
        this.current_Router = newV.path
        this.nav_Background_Flag = newV.path === '/'
        this.search_Val = ''
        this.nav_Search_Flag === false ? '' : (this.nav_Search_Flag = false) // 跳转页面搜索隐藏
      },
      immediate: true
    },
    nav_Search_Flag: function(newV) {
      const body = document.getElementById('app')
      if (newV) {
        if (!this.Article_Tag_Total.length) this.Article_Tag_Find()
        body.style.cssText =
          this.app_Background_Url + 'width: 100%; height: 100%; position: fixed; left: 0; overflow: hidden;'
      } else {
        body.style.cssText = this.app_Background_Url
        // body.removeAttribute('style')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search_City {
  /deep/ .SHInput {
    margin-right: 0;
    width: 250px;
    background: #fff;
    border-radius: 5px;
    .inputUi_Input {
      input {
        text-indent: 10px;
      }
    }
  }
  i {
    position: absolute;
    top: 14px;
    right: 22px;
    color: #565656;
    font-size: 18px;
    cursor: pointer;
    border-left: solid 1px #ccc;
    padding-left: 10px;
    line-height: 28px;
  }
  ul {
    padding-top: 10px;
    li {
      padding-left: 10px;
      line-height: 30px;
      &:hover {
        background: #4d4d4d;
      }
      span {
        cursor: pointer;
      }
    }
  }
}
.home_Top_Nav {
  width: 100%;
  font-weight: 600;
  position: sticky;
  top: -30px;
  z-index: 100;
  .nav_Top_Wrap {
    width: 100%;
    line-height: 30px;
    display: flex;
    box-sizing: border-box;
    background: black;
    color: white;
    padding: 0 5.5%;
    justify-content: center;
    align-items: center;
    position: relative;
    .nav_Top_Left {
      font-size: 12px;
      flex: 1;
    }
    .nav_Top_Right_Wrap {
      width: 50%;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      .nav_Top_Right_Share {
        width: 22px;
        height: 30px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        float: right;
        transition: 0.3s transform;
        a {
          color: #fff;
        }
        &:hover {
          transform: scale(1.2) translate3d(0, 2px, 0);
          color: #b79764;
          a {
            color: #b79764;
          }
        }
      }
    }
    .nav_Top_Menus_Icon_Wrap {
      position: absolute;
      right: 25px;
      width: 32px;
      height: 32px;
      z-index: 1;
      .nav_Top_Menus_Icon {
        position: absolute;
        right: 0;
        top: 14px;
        width: 28px;
        height: 4px;
        background-color: white;
        border-radius: 2px;
        transition-duration: 0.3s;
        &::after,
        &::before {
          width: 31px;
          height: 4px;
          background-color: white;
          border-radius: 2px;
          content: "";
          position: absolute;
          right: 0;
          transition-duration: 0.5s;
        }
        &::before {
          top: -7px;
        }
        &::after {
          width: 25px;
          top: 7px;
        }
      }
    }
    .nav_Top_Menus_Wrap {
      position: absolute;
      top: 29px;
      left: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      /* 去除双击选中出现蓝色背景 */
      user-select: none;
      .nav_Top_Menus_Move_Animation {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        background: #000;
        animation: nav_Top_Menus_Move 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        @keyframes nav_Top_Menus_Move {
          0% {
            transform: translate3d(100%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .nav_Top_Menus {
          margin-top: 15vh;
          .reast_Active_Style {
            display: flex;
            justify-content: center;
            span {
              text-decoration: none;
              color: white;
              font-size: 18px;
              border-bottom: solid 2px rgba(255, 255, 255, 0);
              display: inline-block;
              font-weight: 500;
              text-decoration: none;
              letter-spacing: 2px;
              margin-top: 5px;
            }
          }
          .router-link-exact-active {
            span {
              border-bottom: solid 2px #b79764;
            }
          }
          .nav_Top_Menus_Top {
            width: 100%;
            height: 25vh;
            background: url(/logo/businessCard.png);
            background-size: cover;
          }
          .nav_Top_Menus_Bottom {
            margin-top: 5vh;
            .nav_Top_Right_Share {
              display: inline-block;
              width: 50px;
              height: 30px;
              font-size: 24px;
              text-align: center;
              a {
                display: inline-block;
                color: white;
              }
            }
          }
        }
      }
    }
    .nav_Top_Menus_Toggle {
      .nav_Top_Menus_Icon {
        width: 0;
        &::after {
          width: 30px;
          transform: translateY(-7px) rotate(-45deg);
        }
        &::before {
          width: 30px;
          transform: translateY(7px) rotate(45deg);
        }
      }
    }
  }
  .nav_wrap {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 0 5%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    background: #000;
    .nav_Logo {
      height: 100%;
      width: 150px;
      background: url(/logo/logoWhite.png) no-repeat 0 43%;
      background-size: cover;
    }
    .nav_Router_Wrap {
      flex: 1;
      .nav_Router {
        width: 100%;
        .reast_Active_Style {
          display: inline-block;
          padding-left: 4%;
          span {
            cursor: pointer;
            display: inline-block;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
            color: rgb(255, 255, 255);
            letter-spacing: 2px;
            padding-bottom: 3px;
            position: relative;
            border-bottom: solid 3px rgba(255, 255, 255, 0);
            &::after {
              content: "";
              position: absolute;
              bottom: -3px;
              left: 50%;
              width: 0;
              border-bottom: solid 3px rgb(255, 255, 255);
              transition: all 0.3s;
            }
          }
          span:hover {
            &::after {
              width: 100%;
              left: 0;
            }
          }
        }
        .router-link-exact-active {
          span {
            border-bottom: solid 3px #b79764;
          }
        }
      }
    }
    .nav_Search {
      padding: 3px;
      border-radius: 50%;
      background: #b79764;
      transition: all 0.8s;
      cursor: pointer;
      width: 25px;
      height: 25px;
      color: white;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background: #00000060;
        transform: translate3d(0, 4px, 0);
      }
    }
  }
  .nav_Search_Flag {
    position: fixed;
    height: calc(~"100vh - 50px");
    width: 66%;
    transform: scaleY(0);
    background: rgb(0, 0, 0);
    transition: all 0.4s;
    padding: 0 17%;
    .nav_Search_Wrap {
      transition: transform 0.8s, width 0.8s;
      margin-top: 50px;
      .nav_Search_font {
        font-size: 96px;
        text-align: center;
        color: white;
      }
      .nav_Search_Ipt_Wrap {
        width: 100%;
        height: 6vh;
        background: rgb(255, 255, 255);
        border-radius: 5px;
        padding: 2px;
        display: flex;
        align-items: center;
        margin-bottom: 2%;
        .nav_Search_Ipt {
          border: none;
          outline: none;
          width: 93%;
          text-indent: 20px;
          height: 90%;
          font-size: 16px;
        }
        .nav_Search_Btn {
          width: 25px;
          height: 25px;
          cursor: pointer;
          line-height: 25px;
          text-align: center;
          i {
            font-size: 25px;
          }
        }
      }
      .nav_Search_Example {
        color: #bebebe;
        font-size: 16px;
        p {
          display: flex;
          flex-wrap: wrap;
          margin-top: 5px;
          span {
            margin-right: 10px;
            margin-top: 5px;
            cursor: pointer;
          }
        }
      }
    }
    .nav_Search_Content {
      width: 100%;
      transition: transform 0.8s;
      margin-top: 40px;
      max-height: 61%;
      color: #fff;
      overflow-y: scroll;
      padding-right: 20px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 3px; /*对垂直流动条有效*/
      }
      /*定义滑块颜色、内阴影及圆角*/
      &::-webkit-scrollbar-thumb {
        box-shadow: 0px 0px 20px 20px rgb(255, 255, 255);
        background-color: #ffffff;
      }
      &::-webkit-scrollbar-track {
        background-color: #484848;
      }
      .nav_Search_Content_Item {
        width: 100%;
        margin-bottom: 10px;
        border-bottom: solid 1px #ffffff63;
        padding-bottom: 10px;
        h3 {
          margin-bottom: 8px;
          font-family: monospace;
          font-size: 20px;
        }
        .nav_Search_Content_Item_Html {
          font-size: 14px;
          font-weight: 500;
          color: #8f8f8f;
          position: relative;
          line-height: 1.4em;
          /*设置容器高度为3倍行高就是显示3行*/
          height: 6.8em;
          overflow: hidden;
          cursor: pointer;
          /deep/ pre {
            background: rgba(0, 0, 0, 0);
          }
          &::after {
            content: "...";
            font-weight: bold;
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 0 20px 1px 35px;
            /*可加可不加，就是在省略号之前加模糊，效果图为没加*/
            background: linear-gradient(to right, transparent, #000000 55%);
          }
        }
      }
    }
  }
  .nav_Search_Flag_Move {
    transform: scaleY(1);
  }
  .nav_height_Flag {
    background: white;
    height: 50px;
    border-bottom: 1px solid rgba(140, 140, 140, 25%);
    animation-name: nav_Tran;
    animation-duration: 0.4s;
    @keyframes nav_Tran {
      0% {
        transform: translateY(-60px);
      }
      100% {
        transform: translateY(0);
      }
    }
    .nav_Logo {
      background: url(/logo/logoBlock.png) no-repeat 0 43%;
      background-size: cover;
      width: 110px;
    }
    .nav_Router_Wrap {
      .nav_Router {
        .reast_Active_Style {
          span {
            font-size: 14px;
            color: rgb(0, 0, 0);
            &::after {
              border-bottom: solid 3px rgb(0, 0, 0);
            }
          }
        }
      }
    }
  }
  .scroll_progress {
    position: fixed;
    top: 0;
    width: 0%;
    height: 3px;
    background: #000000;
    z-index: 10000;
  }
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgb(90, 90, 90);
  font-size: 16px;
}

@media screen and (max-width: 750px) {
  .home_Top_Nav {
    top: 0;
    .nav_wrap {
      height: 60px;
      .nav_Logo {
        width: 120px;
      }
    }
    .nav_Search_Flag {
      top: 90px !important;
      width: 90%;
      padding: 0 5%;
      .nav_Search_Wrap {
        margin-top: 50px;
        .nav_Search_font {
          font-size: 45px;
        }
        .nav_Search_Ipt_Wrap {
          height: 4vh;
          .nav_Search_Ipt {
            width: 85%;
          }
        }
      }
    }
  }
  .nav_Top_Right_Wrap,
  .nav_Router_Wrap {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
@media screen and (min-width: 750px) {
  .nav_Top_Menus_Icon_Wrap,
  .nav_Top_Menus_Wrap {
    display: none;
  }
}
</style>
