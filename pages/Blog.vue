<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-12-28 10:18:05
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 18:00:42
 * @FilePath: \blog\blogNuxt\pages\Blog.vue
-->
<template>
  <div class='blog'>
    <div class='blog_Content'>
      <div v-for='c in Article_Data_Total_Dom' :key='c._id' class='blog_Content_Item' :style="{ left: c.img_Left + '%', top: c.img_Top + 'px' }">
        <div class='blog_Content_Item_BG' :class="c.title_Article ? '' : 'skeleton_Screen'" :style="{
          height: c.img_Height + 'px',
          backgroundImage:
            'url(' + (c.cover_Article || Article_Default_BG) + ')',
        }">
          <div :class="c.label_Article ? '' : 'skeleton_Screen'" class='blog_Content_Item_Content_Label'>
            <span v-for='cc in c.label_Article' :key='cc._id' class='blog_Content_Item_Content_Label_Item' :style='{
              backgroundColor:Article_Tag_Total.find((i) => i.Tag_Name === cc.Tag_Name).tag_Color}'>
              {{ cc.Tag_Name.toUpperCase() }}
            </span>
            <i class='fa fa-newspaper-o' aria-hidden='true' @click='jump_info_Blog(c.id_Article)'/>
          </div>
          <div class='blog_Content_Item_Content_Time'>
            <span>
              {{ $options.filters.dateFilter(c.created_At).slice(8, 10) }}
            </span>
            <span>
              {{
                $options.filters
                  .dateFilter(c.created_At)
                  .slice(5, 7)
                  .replace(/\b(0+)/gi, "") + "月"
              }}
            </span>
          </div>
        </div>
        <div class='blog_Content_Item_Content'>
          <div class='author' :class="c.html_Article ? '' : 'skeleton_Screen'">
            <span>
              作者：
              <span style='color: #000; margin-right: 20px'>{{
                c.users[0].nick_Name ? c.users[0].nick_Name : c.admin_Code
              }}</span>
            </span>
            <span>
              浏览量：{{ c.Views_Article + "\xa0\xa0" }}
              收藏：{{ c.like_Article }}</span>
          </div>
          <p :title='c.title_Article' :class="c.html_Article ? '' : 'skeleton_Screen'">
            {{ c.title_Article }}
          </p>
          <div :class="c.html_Article ? '' : 'skeleton_Screen'" class='blog_Content_Item_Content_Txt markdown-body' v-html='c.html_Article' />
        </div>
      </div>
      <div class='blog_Content_Item_Clear' :style="{ height: blog_Content_Item_Clear + 'px' }"/>
      <SHLoading v-if='loading_F' />
      <div v-if='skip_Page_Query.page === Math.ceil((countNum || 8)/8) && Article_Data_Total_Dom.length' style='text-align: center;'>没有更多内容了</div>
      <div v-if='!loading_F && Article_Data_Total_Dom.length === 0' class='no_Fount'><img src='/logo/empty.png' alt=''></div>
    </div>
    <div class='blog_lable'>
      <SHTab ref='TabsUi' v-model='tag_Default' type='back' @tabClick='tabClick'>
        <SHTabPane name='_id'>最新的</SHTabPane>
        <SHTabPane name='like_Article'>喜欢最多</SHTabPane>
        <SHTabPane name='Views_Article'> 观看最多</SHTabPane>
      </SHTab>
      <h2>文章标签 <span @click='reset_Oper'>重置</span> </h2>
      <div class='blog_lable_Tag'>
        <span v-for='c in Article_Tag_Total' :key='c._id' :class="skip_Page_Query.label_Article === c.Tag_Name ? 'active_Tag_Name' : ''" :style="'border-color:' + c.tag_Color + ';background:' + c.tag_Color" @click='get_Element_Blog_Tag(c)'>
          {{ c.Tag_Name }}
          <i>{{ c.sort_ArticelTag }}</i>
        </span>
      </div>
      <Calendar @countNumOpertion='countNumOpertion' @selectDayOpar='selectDayOpar' />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { article_Find, article_Statistics } from '@/http/model/article.js'
import Calendar from '~/components/calendar'
export default {
  data() {
    return {
      tag_Default: '_id',
      Article_Data_Total_Dom: [], // 文章数据及dom数据
      Article_columns_Num: 2, // 文章列数
      Article_columns_Height: [], // 文章高度
      blog_Content_Item_Clear: 0, // 撑起盒子数据
      countNum: 0, // 数据总条数
      Article_Dom_Index: 0, // 拼接数据Dom时使用下表
      scroll_Flag: true,
      skip_Page_Query: {
        limit: 8,
        page: 1,
        label_Article: '', // 文章标签
        sortTag: '',
        strEndTime: 0
      },
      articleNum: [],
      loading_F: true
    }
  },
  components: { Calendar },
  methods: {
    ...mapMutations(['jump_info_Blog']),
    ...mapActions('article', ['Article_Tag_Find']),
    reset_Oper() {
      this.skip_Page_Query = {
        limit: 8,
        page: 1,
        label_Article: '', // 文章标签
        sortTag: '_id',
        strEndTime: 0
      }
      this.$refs.TabsUi.changeTab('_id')
      this.get_Element_Blog_Initialization()
    },
    async tabClick(name) {
      if (this.skip_Page_Query.sortTag === name) return
      this.skip_Page_Query.sortTag = name
      this.get_Element_Blog_Initialization()
    },
    async get_Element_Blog_Initialization() {
      document.getElementById('app').scrollTop = 0
      const { skip_Page_Query } = this
      this.skip_Page_Query.limit = 8
      this.skip_Page_Query.page = 1
      this.Article_Data_Total_Dom = []
      this.Article_columns_Height = []
      this.blog_Content_Item_Clear = 0
      this.Article_Dom_Index = 0
      const data = await this.Article_Data_Find(
        JSON.stringify({
          ...skip_Page_Query
        })
      )
      this.get_Element_Blog_Dom(data.data || [])
    },
    get_Element_Blog_Dom(article_Data) {
      const Article_Data_Total_Dom = article_Data.map((c, i) => {
        c.img_Height = Math.floor(Math.random(0, 1) * 90 + 150)
        this.get_Element_Blog_Dom_Position(c, i + this.Article_Dom_Index)
        return c
      })
      this.Article_Data_Total_Dom = this.Article_Data_Total_Dom.concat(
        Article_Data_Total_Dom
      )
      this.Article_Dom_Index = this.Article_Data_Total_Dom.length
      this.blog_Content_Item_Clear =
        Math.max(...this.Article_columns_Height) + 20
    },
    get_Element_Blog_Dom_Position(c, i) {
      if (i < this.Article_columns_Num) {
        const columns_Index = i % this.Article_columns_Num
        c.img_Left = columns_Index * 52
        c.img_Top = 0
        this.Article_columns_Height[columns_Index] = c.img_Height + 195
      } else {
        const minH = Math.min(...this.Article_columns_Height)
        const minI = this.Article_columns_Height.indexOf(minH)
        c.img_Top = minH
        c.img_Left = minI * 52
        this.Article_columns_Height[minI] += c.img_Height + 195
      }
      return c
    },
    async scrollEvent(e) {
      const {
        countNum,
        skip_Page_Query: { limit, page }
      } = this
      if (
        e.path[0].scrollTop + e.path[0].clientHeight + 1 >
        e.path[0].scrollHeight
      ) {
        if (this.scroll_Flag) {
          this.scroll_Flag = false
          const timer = setTimeout(() => {
            this.scroll_Flag = true
            clearTimeout(timer)
          }, 800)
          if (Math.ceil((countNum || 8) / limit) <= page) return
          const data = await this.Article_Data_Find(
            JSON.stringify(
              Object.assign(
                { ...this.skip_Page_Query },
                { page: (this.skip_Page_Query.page += 1) }
              )
            )
          )
          this.get_Element_Blog_Dom(data.data)
        }
      }
    },
    get_Element_Blog_Tag(c) {
      if (this.skip_Page_Query.label_Article === c.Tag_Name) return
      this.skip_Page_Query.label_Article = c.Tag_Name
      this.get_Element_Blog_Initialization()
    },
    Article_Data_Find(params) {
      this.loading_F = true
      return new Promise((reslove, reject) => {
        article_Find(params)
          .then((res) => {
            this.loading_F = false
            const { code, data, massage } = res.data
            if (code === 200) {
              this.countNum = data?.countNum || 0
              reslove(data)
            } else {
              this.$Msg(massage, 'faild')
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async countNumOpertion(artCount) {
      if (!this.articleNum.length) await this.get_Article_Statistics()
      const articleNumMap = this.articleNum?.reduce((prev, cur) => {
        prev[cur._id] = cur.count
        return prev
      }, {})
      artCount.forEach(c => {
        const curData = c.getYear() + '-' + ('' + c.getMonth()).padStart(2, 0) + '-' + ('' + c.getDay()).padStart(2, 0)
        if (articleNumMap) this.$set(c, 'todayNum', articleNumMap[curData])
      })
    },
    selectDayOpar(c) {
      if (this.skip_Page_Query.strEndTime === c.getYear() + '-' + c.getMonth() + '-' + c.getDay()) return
      this.skip_Page_Query.strEndTime = c.getYear() + '-' + c.getMonth() + '-' + c.getDay()
      this.get_Element_Blog_Initialization()
    },
    get_Article_Statistics() {
      return new Promise((reslove) => {
        article_Statistics().then(res => {
          const { code, data, massage } = res.data
          if (code === 200) {
            this.articleNum = data.data
            reslove()
          } else {
            this.$Msg(massage, 'faild')
          }
        })
      })
    }
  },
  computed: {
    ...mapState('article', ['Article_Tag_Total', 'Article_Default_BG'])
  },
  async mounted() {
    this.skip_Page_Query.label_Article = this.$route.params.Tag_Name || ''
    document
      .getElementById('app')
      .addEventListener('scroll', this.scrollEvent, false)
    await this.Article_Tag_Find()
  },
  beforeDestroy() {
    document
      .getElementById('app')
      .removeEventListener('scroll', this.scrollEvent, false)
  }
}
</script>

<style lang="less" scoped>
.blog {
  width: 84%;
  background: #f5f5f5;
  display: flex;
  padding: 30px 8% 50px 8%;
  position: relative;
  .blog_Content {
    width: 70%;
    position: relative;
    .blog_Content_Item {
      width: 48%;
      background: #fff;
      border-radius: 10px;
      position: absolute;
      overflow: hidden;
      color: #aaa;
      font-size: 12px;
      margin: 20px 0;
      box-shadow: #0000001a 0px 0px 5px 0;
      &:hover {
        .blog_Content_Item_BG {
          .blog_Content_Item_Content_Label {
            opacity: 1;
          }
        }
        .blog_Content_Item_Content {
          p {
            color: #b69663;
          }
        }
      }
      .blog_Content_Item_BG {
        width: 100%;
        height: 100%;
        background-size: 101%;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        .blog_Content_Item_Content_Label {
          width: 100%;
          color: #fff;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          height: 100%;
          position: relative;
          background-color: rgba(46, 47, 54, 0.45);
          box-sizing: border-box;
          z-index: 99;
          .blog_Content_Item_Content_Label_Item {
            line-height: 18px;
            border-radius: 5px;
            margin: 10px 0 0 10px;
            position: relative;
            display: inline-block;
            padding: 0 6px 0 20px;
            &::before {
              content: '';
              width: 8px;
              height: 8px;
              border-radius: 50%;
              border: solid 2px #fff;
              position: absolute;
              left: 7px;
              top: 5px;
              box-sizing: border-box;
            }
          }
          .fa-newspaper-o {
            font-size: 45px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-60%, -50%);
            cursor: pointer;
          }
        }
        .blog_Content_Item_Content_Time {
          color: #fff;
          border-radius: 0 10px 0 0;
          font-size: 22px;
          font-weight: 600;
          padding: 4px 12px;
          position: absolute;
          bottom: 0;
          text-align: center;
          background: #c38d37;
          display: flex;
          flex-direction: column;
          span:last-child {
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
      .blog_Content_Item_Content {
        width: 100%;
        height: 162px;
        padding: 8px 15px 10px 15px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        color: #676767;
        .author {
          color: #889097;
          span:last-child {
            i {
              margin: 0 2px 0 15px;
            }
          }
        }
        p {
          font-size: 22px;
          font-weight: 900;
          color: #152035;
          margin: 8px 0;
          height: 22px;
          line-height: 22px;
          font-family: 'Roboto Slab', serif;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .blog_Content_Item_Content_Txt {
          width: 100%;
          height: 8em;
          line-height: 1.6em;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
          color: #676767;
          font-size: 12px;
        }
      }
      .blog_Content_Item_Content_Time_skeleton_Screen {
        position: absolute;
        bottom: 10px;
        padding-left: 20px;
        height: 14px;
        width: calc(~'100% - 50px');
      }
    }
    .LoadingUi {
      width: 100%;
      height: 615px;
    }
    .no_Fount {
      width: 100%;
      text-align: center;
      img {
        width: 70%;
      }
    }
  }
  .blog_lable {
    width: 25%;
    height: 77vh;
    position: sticky;
    right: 50px;
    top: 100px;
    color: #fff;
    margin: 20px 0 0 5%;
    box-shadow: 1px 1px 7px 0px #00000014;
    background: #fff;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    .TabsUi {
      font-size: 0;
    }
    h2 {
      height: 55px;
      color: #6c4200;
      display: flex;
      align-items: center;
      letter-spacing: 2px;
      justify-content: space-between;
      span {
        color: #000000;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
      }
    }
    .blog_lable_Tag {
      overflow-y: scroll;
      flex: 1;
      &::-webkit-scrollbar {
        width: 5px; /*对垂直流动条有效*/
        height: 0px; /*对水平流动条有效*/
      }
      span {
        cursor: pointer;
        display: inline-block;
        margin-bottom: 15px;
        padding: 8px 16px;
        margin-right: 30px;
        border-radius: 5px;
        margin: 8px 15px 8px 0;
        font-size: 12px;
        position: relative;
        border-style: solid;
        border-width: 2px;
        font-weight: 800;
        i {
          color: #fff;
          background: #000000;
          position: absolute;
          right: -8px;
          top: -6px;
          border-radius: 20% 20% 50% 50%;
          font-size: 12px;
          width: 20px;
          text-align: center;
          font-style: inherit;
          line-height: 18px;
          height: 20px;
        }
      }
      .active_Tag_Name {
        background: #fff !important;
        color: #000000;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .blog {
    width: 90%;
    flex-direction: column-reverse;
    padding: 10px 5% 50px 5%;
    .blog_Content {
      width: 100%;
      .blog_Content_Item {
        width: 100%;
        position: initial;
      }
      .blog_Content_Item_Clear {
        display: none;
      }
      .no_Fount {
        img {
          width: 100%;
        }
      }
    }
    .blog_lable {
      position: initial;
      width: 100%;
      margin: 20px 0 0 0%;
      box-sizing: border-box;
      max-height: 220px;
      .calendar_Table {
        display: none;
      }
    }
  }
}
</style>
