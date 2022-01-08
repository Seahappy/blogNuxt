<!--
 * @Author: Cxy
 * @Date: 2021-04-12 10:02:09
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:36:41
 * @FilePath: \blog\blogNuxt\pages\infoBlog.vue
-->

<template>
  <div class='infoBlog'>
    <div class='article_Wrap'>
      <div class='article_Views_like_Title_Tag'>
        <div class='article_Title'>
          <h4>{{ infoData.title_Article }}</h4>
        </div>
        <ul class='article_Data_Tag'>
          <li class='article_Data'>
            <span>{{ infoData.created_At | dateFilter }}</span>
            <span style='margin-left: 20px'>{{ infoData.word_Number }}字</span>
          </li>
          <li>
            <span v-for='c in infoData.label_Article' :key='c._id' class='article_Tag'>{{ c.Tag_Name }}</span>
          </li>
        </ul>
      </div>
      <div class='article_Content markdown-body markdown-body-none-img' v-html='infoData.html_Article'/>
      <div class='article_Views_like'>
        <i class='fa fa-folder-open' aria-hidden='true'/>
        {{ infoData.Views_Article }}
        <i class='fa fa-star' aria-hidden='true' style='color: #676767' @click='jump_port_Record({ routeUrl: $route.fullPath })' />
        {{ infoData.like_Article }}
        <SHToolTip v-if='My_Reward_Wx || My_Reward_Zfb' eventType='click' direction='bottom'>
          <SHImage style='width: 80px;height: 80px;' :src='My_Reward_Wx ? My_Reward_Wx : My_Reward_Zfb ? My_Reward_Zfb : ""' :src-list='[My_Reward_Wx, My_Reward_Zfb]' />
          <span slot='icon' style='margin-left: 12px;font-weight: bold;'>打赏</span>
        </SHToolTip>
      </div>
      <div class='article_Share'>
        <span class='words_Share'>分享:</span>
        <div class='article_Share_Unified' @click="share_Blog('QQ')">
          <i class='fa fa-qq' aria-hidden='true'/>
        </div>
        <div class='article_Share_Unified' @click="share_Blog('QZ')">
          <i class='fa fa-pinterest-square' aria-hidden='true'/>
        </div>
        <div class='article_Share_Unified'>
          <SHToolTip eventType='hover' direction='top' :offset='[0, 20]'>
            <div>
              <div ref='qrCode'/>
              <div style='width: 22px;height: 22px;background-size: cover;background-position: center;background-repeat: no-repeat;border: solid 2px #fff;position: absolute;
              top: 50%;left: 50%;transform: translate(-50%, -50%);border-radius: 3px;' :style="{ backgroundImage: 'url(' + (infoData.cover_Article || Article_Default_BG) + ')' }" />
            </div>
            <i slot='icon' class='fa fa-weixin' aria-hidden='true'/>
          </SHToolTip>
        </div>
        <div class='article_Share_Unified' @click="share_Blog('WB')">
          <i class='fa fa-weibo' aria-hidden='true'/>
        </div>
        <div class='article_Share_Unified' @click="share_Blog('RR')">
          <i class='fa fa-renren' aria-hidden='true'/>
        </div>
        <div class='article_Share_Unified' @click="share_Blog('IN')">
          <i class='fa fa-linkedin-square' aria-hidden='true'/>
        </div>
      </div>
      <div v-if='infoData.users' class='article_Author'>
        <SHImage v-if='infoData.users[0].head_Portrait' class='head_Portrait_Img' :src='infoData.users[0].head_Portrait' />
        <i v-else class='fa fa-user-circle' aria-hidden='true'/>
        <h2>
          {{ infoData.users[0].nick_Name || infoData.users[0].admin_Code }}
        </h2>
        <a target='_blank' class='fa fa-qq' aria-hidden='true' :href="'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=' + infoData.users[0].My_Qq + '&website=www.oicqzone.com'"/>
        <SHToolTip eventType='hover' direction='bottom'>
          <SHImage style='width: 80px;height: 80px;' :src='infoData.users[0].My_Wx' />
          <span slot='icon' style='color: #000;margin: 0px 5px 10px;' class='fa fa-weixin' aria-hidden='true'/>
        </SHToolTip>
        <a target='_blank' class='fa fa-weibo' aria-hidden='true' :href='infoData.users[0].My_Wb'/>
        <p>
          {{ infoData.users[0].brief_Introduction || "作者很懒什么也没留下" }}
        </p>
      </div>
      <div class='article_Content_nav'>
        <div class='prev_Article_Content'>
          <span class='prev_Next_Article_Content_Bg' @click="prev_Next_Article('prev')">＜</span>
        </div>
        <div class='next_article_Content'>
          <span class='prev_Next_Article_Content_Bg' @click="prev_Next_Article('next')">＞</span>
        </div>
      </div>
      <div v-if='lovelyData.length' class='article_Relevant'>
        <h2>猜你喜欢</h2>
        <div class='article_Relevant_Content'>
          <div v-for='c in lovelyData' :key='c._id' class='article_Relevant_Content_Item'>
            <div :style="{
              backgroundImage:
                'url(' + (c.cover_Article || Article_Default_BG) + ')',
            }" class='article_Relevant_Item_BG_Img'/>
            <p @click='article_Info_Data(c.id_Article)'>
              {{ c.title_Article }}
            </p>
          </div>
        </div>
      </div>
      <div class='comment_Wrap'>
        <div class='comment'>
          <i class='fa fa-user-circle' aria-hidden='true'/>
          <div class='comment_Write'>
            <textarea v-model='comment_Content' placeholder='写下你的评论...' @click='comment_Btn_Flag = comment_Btn_Flag ? true : true'/>
            <div class='comment_Release' :style="
              comment_Btn_Flag
                ? 'height: 36px;transform: translate3d(0, 0, 0);'
                : ''
            ">
              <SHButton type='primary' :disabled="comment_Content === ''" @click='(comment_Btn_Flag = false), jump_port_Record({routeUrl: $route.fullPath})'>发表</SHButton>
              <SHButton @click='(comment_Btn_Flag = false), cancel_Rest()'>取消</SHButton>
            </div>
          </div>
        </div>
        <div class='comment_List_Wrap'>
          <p v-if='comment_Article_Data'>
            <i class='fa fa-comments' aria-hidden='true' style='margin-right: 10px'/>
            全部评论 {{ comment_Article_Data.length }}
          </p>
          <ul class='comment_List'>
            <li v-for='(c, i) in comment_Article_Data' :key='c._id'>
              <SHImage v-if="c.head_Portrait !== ''" class='head_Portrait_Img' :src='c.head_Portrait' />
              <i v-else class='fa fa-user-circle' aria-hidden='true'/>
              <div class='comment_Person_Contents'>
                <p>{{ c.nick_Name ? c.nick_Name : c.admin_Code }}</p>
                <p>
                  <span>{{ i + 1 }}楼 </span>
                  <span style='margin-left: 8px'>{{ $options.filters.dateFilter(c.comment_Time).slice(5) }}</span>
                </p>
                <div class='comment_Contents'>{{ c.comment_Content }}</div>
                <div class='comment_Opartion' :style="
                  'height:' +
                    (comment_Replay_Dom_Id === c._id ? 145 : 15) +
                    'px;'
                ">
                  <span @click='comment_replay($event, c)'>
                    <i class='fa fa-comment' aria-hidden='true'/>回复
                  </span>
                  <span style='color: #b0b0b0'>
                    <i class='fa fa-thumbs-up' aria-hidden='true'/>
                    {{ c.like_Comment.length }}
                  </span>
                </div>
                <ul class='comment_List comment_List_Reply'>
                  <li v-for='(cc, ii) in c.reply_List' :key='cc._id'>
                    <SHImage v-if="cc.head_Portrait !== ''" class='head_Portrait_Img' :src='cc.head_Portrait' />
                    <i v-else class='fa fa-user-circle' aria-hidden='true'/>
                    <div class='comment_Person_Contents'>
                      <p>
                        {{ cc.nick_Name ? cc.nick_Name : cc.admin_Code }}
                        <i class='fa fa-caret-right' aria-hidden='true'/>
                        {{ cc.nick_Name_Reply ? cc.nick_Name_Reply : cc.admin_Code_Reply }}
                      </p>
                      <p>
                        <span>{{ i + 1 + "-" + (ii + 1) }}楼 </span>
                        <span style='margin-left: 8px'>{{ $options.filters.dateFilter(cc.comment_Time).slice(5) }}</span>
                      </p>
                      <div class='comment_Contents'>
                        {{ cc.comment_Content }}
                      </div>
                      <div class='comment_Opartion' :style="
                        'height:' +
                          (comment_Replay_Dom_Id === cc._id ? 145 : 15) +
                          'px;'
                      ">
                        <span @click='comment_replay($event, c, cc)'>
                          <i class='fa fa-comment' aria-hidden='true'/>回复
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div v-show='comment_Replay_OffsetTop !== 0' class='comment comment_Replay' :style="'top:' + (comment_Replay_OffsetTop + 30) + 'px;'">
            <i class='fa fa-user-circle' aria-hidden='true'/>
            <div class='comment_Write'>
              <textarea v-model='comment_Replay_Content' placeholder='写下你的评论...'/>
              <div class='comment_Release' style='height: 36px; transform: translate3d(0, 0, 0)'>
                <SHButton type='primary' :disabled="comment_Replay_Content === ''" @click='jump_port_Record({ routeUrl: $route.fullPath })'>发表</SHButton>
                <SHButton @click='(comment_Replay_OffsetTop = 0), cancel_Rest()'>取消</SHButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'assets/css/vs2015.min.css'
import 'assets/css/github-markdown.min.css'
import {
  Article_Prev_Next,
  Guess_You_Like,
  article_View_Page,
  comment_Get_Article
} from '@/http/model/article'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      infoData: '',
      lovelyData: [], // 喜欢文章数据
      comment_Article_Data: [], // 评论数据
      comment_Btn_Flag: false, // 评论按钮显示隐藏
      comment_Content: '', // 评论内容
      comment_Replay_OffsetTop: 0,
      comment_Replay_Dom_Id: '', // 回复评论的Dom _id
      comment_Replay_Id: '', // 回复评论的_Id
      comment_Replay_admin_Code: '', // 回复人的昵称
      comment_Replay_Content: '', // 回复人的昵称
      share_Blog_Img: '',
      like_Blog_Timer: null
    }
  },
  computed: {
    ...mapState('article', ['Article_Default_BG']),
    My_Reward_Wx: function() {
      return this.infoData.users ? this.infoData.users[0].My_Reward_Wx === '' ? false : this.infoData.users[0].My_Reward_Wx : false
    },
    My_Reward_Zfb: function() {
      return this.infoData.users ? this.infoData.users[0].My_Reward_Zfb === '' ? false : this.infoData.users[0].My_Reward_Zfb : false
    }
  },
  methods: {
    // 分享
    ...mapMutations(['jump_port_Record']),
    share_Blog(type) {
      const { infoData: { title_Article, cover_Article }, Article_Default_BG } = this
      const cover_Share = cover_Article || Article_Default_BG
      const href_Share = window.location.href.split(/=|-/)[0]
      const parameter_Share = window.location.href.split(/=|-/)[1]
      switch (type) {
        case 'QZ':
          window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + href_Share + '-' + parameter_Share + '=?sharesource=qzone&title=' + title_Article + '&pics=' + cover_Share + '&summary=来自 -- 源·Sea博客分享')
          break
        case 'WB':
          window.open('http://service.weibo.com/share/share.php?url=' + href_Share + '=' + parameter_Share + '&title=' + title_Article + '&pic=' + cover_Share)
          break
        case 'RR':
          window.open('http://share.renren.com/share/buttonshare?link=' + href_Share + '=' + parameter_Share)
          break
        case 'IN':
          window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + href_Share + '-' + parameter_Share)
          break
        default:
          window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + href_Share + '=' + parameter_Share)
          break
      }
    },
    // 评论关闭重置
    cancel_Rest() {
      this.comment_Replay_Dom_Id = ''
      this.comment_Replay_Content = ''
      this.comment_Content = ''
      this.comment_Replay_OffsetTop = 0
    },
    // 评论赋值、动画
    comment_replay(ev, c, cc) {
      const e = ev || window.event
      const target = e.target || e.srcElement
      this.comment_Replay_Dom_Id = cc ? cc._id : c._id
      this.comment_Replay_Id = c._id
      this.comment_Replay_admin_Code = cc ? cc.admin_Code : c.admin_Code
      this.comment_Replay_nick_Name = cc ? cc.nick_Name : c.nick_Name
      this.$nextTick(_ => {
        this.comment_Replay_OffsetTop = target.offsetTop
      })
    },
    // 文章下一篇
    prev_Next_Article(c) {
      Article_Prev_Next({
        articleTag: JSON.stringify(this.infoData.label_Article),
        flipPage: c,
        articleId: this.infoData.id_Article
      }).then((res) => {
        const { code, data, massage } = res.data
        if (code === 200) {
          document.getElementById('app').scrollTop = 0
          this.infoData = data.data[0]
          this.$nextTick(_ => {
            this.mavon_Editor_Copy()
          })
          // 浏览器地址赋值但不会刷新页面
          history.pushState(
            '',
            '',
            '/infoBlog?id_Article=' + this.infoData.id_Article
          )
          this.article_Find_Lovely()
        } else {
          this.$Msg(massage, 'wran')
        }
      })
    },
    // 猜你喜欢
    article_Find_Lovely() {
      Guess_You_Like({
        label_Article: this.infoData.label_Article.map((c) => c.Tag_Name)
      }).then((res) => {
        const { code, data, massage } = res.data
        if (code === 200) {
          this.lovelyData = data.data
        } else if (code === 403) {
          this.$Msg(massage, 'wran')
        }
      })
    },
    // 获取文章
    async article_Info_Data(id_Article) {
      const res = await article_View_Page({ id_Article })
      const { code, massage, data } = res.data
      if (code === 200) {
        document.getElementById('app').scrollTop = 0
        this.infoData = data.data[0]
        this.article_Comment_Data()
        this.article_Find_Lovely()
        this.$nextTick(_ => {
          this.mavon_Editor_Copy()
        })
      } else if (code === 403) {
        this.$Msg(massage, 'wran')
      }
    },
    // 文章评论
    article_Comment_Data() {
      comment_Get_Article({ _id: this.infoData._id }).then((res) => {
        const { code, data, massage } = res.data
        if (code === 200) {
          this.comment_Article_Data = data.data[0].comment_Article
        } else {
          this.$Msg(massage, 'wran')
        }
      })
    },
    mavon_Editor_Copy() {
      const copyFatHtml = document.querySelectorAll('pre code')
      const that = this
      copyFatHtml.forEach(c => {
        const copyIconHtml = document.createElement('i')
        copyIconHtml.classList.add('fa', 'fa-clipboard')
        c.parentElement.appendChild(copyIconHtml)
        copyIconHtml.onclick = function() {
          const prevSiblingText = this.previousElementSibling.innerText
          const copyConContainer = document.createElement('textarea')
          copyConContainer.innerHTML = prevSiblingText
          document.body.appendChild(copyConContainer)
          copyConContainer.select()
          document.execCommand('Copy')
          copyConContainer.remove()
          that.$Msg('复制成功', 'success')
        }
      })
    },
    copyDefaultOpar(event) {
      const clipboardData = event.clipboardData || window.clipboardData
      if (!clipboardData) return
      const copyText = window.getSelection().toString()
      if (copyText) {
        event.preventDefault()
        clipboardData.setData('text/plain', copyText + '\n来自：' + window.location.href + ' 博客网站\n作者：' + (this.infoData.users[0].nick_Name || this.infoData.users[0].admin_Code) + '\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。')
      }
    }
  },
  async asyncData({ query: { id_Article }}) {
    const artic_ViPa_Res = await article_View_Page({ id_Article: Number(id_Article) })
    const Guss_YoLi_Res = await Guess_You_Like({
      label_Article: artic_ViPa_Res.data.data.data[0].label_Article.map((c) => c.Tag_Name)
    })
    return {
      infoData: artic_ViPa_Res.data.data.data[0],
      lovelyData: Guss_YoLi_Res.data.data.data
    }
  },
  head() {
    return {
      title: this.infoData.title_Article,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.infoData.html_Article.replace(/<(?!\/?br\/?.+?>)[^<>]*>/gm, '').slice(0, 50)
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.infoData.label_Article.map(c => c.Tag_Name)
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(_ => {
      document.getElementById('app').scrollTop = 0
      const qrcode = new this.$QRCode(this.$refs.qrCode, { width: 80, height: 80 })
      qrcode.makeCode(window.location.href)
      this.mavon_Editor_Copy()
    })
    window.addEventListener('copy', this.copyDefaultOpar, true)
  },
  beforeDestroy() {
    window.removeEventListener('copy', this.copyDefaultOpar, true)
  },
  watch: {
    // 搜索时通过监听路由变化获取文章详情
    $route: function({ query: { id_Article }, params: { currentPageJump }}) {
      if (currentPageJump) this.article_Info_Data(Number(id_Article))
    }
  }
}
</script>

<style lang="less" scoped>
.infoBlog {
  width: 100%;
  background: #d0d0d029;
  display: flex;
  padding: 0 0 0 10%;
  position: relative;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 25%;
    height: 200px;
    background: #b69663;
    min-width: 280px;
  }
  &::after {
    content: '详情';
    position: absolute;
    top: 60px;
    left: 9%;
    color: #fff;
    font-size: 50px;
    font-weight: 900;
  }
  .article_Wrap {
    min-height: 68vh;
    background: rgb(255, 255, 255);
    width: 90%;
    color: #000;
    box-sizing: border-box;
    border-radius: 0 0 20px 20px;
    margin-bottom: 10vh;
    padding: 0 5%;
    .article_Views_like_Title_Tag {
      width: 84%;
      margin-left: 16%;
      .article_Title {
        text-align: center;
        font-size: 48px;
        font-family: 'Roboto Slab', serif;
        font-weight: 900;
        line-height: 1.556;
        margin: 30px 60px 20px 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .article_Data_Tag {
        max-width: 750px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 45px;
        list-style-type: none;
        text-align: center;
        color: #646464;
        min-height: 76px;
        .article_Data {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
      }
      .article_Tag {
        padding-right: 20px;
      }
    }
    .article_Content {
      font-weight: 500;
      font-size: 16px;
      line-height: 1.6;
      color: #3d3d3d;
    }
    /*pre定义滚动条的轨道颜色、内阴影及圆角*/
    .markdown-body ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
      background-color: #2d2d2d;
    }
    .markdown-body ::-webkit-scrollbar {
      width: 0px;
      height: 8px;
    }
    /* pre定义滑块颜色、内阴影及圆角 */
    .markdown-body ::-webkit-scrollbar-thumb {
      background-color: #ffffff;
    }
    /deep/ .markdown-body {
      pre {
        padding: 5px;
        padding-bottom: 10px;
        background: #1e1e1e;
        .fa-clipboard {
          position: absolute;
          top: 10px;
          right: 10px;
          border-radius: 4px;
          background: #fff;
          color: rgb(46, 46, 46);
          font-size: 12px;
          padding: 4px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    .article_Views_like {
      height: 20px;
      line-height: 20px;
      margin-top: 50px;
      text-align: right;
      user-select: none;
      font-size: 16px;
      color: #676767;
      i {
        cursor: pointer;
      }
      .fa-star {
        margin-left: 12px;
      }
    }
    .startFive {
      margin: 50px 0;
      position: relative;
      display: block;
      color: red;
      width: 0px;
      height: 0px;
      border-right: 100px solid transparent;
      border-bottom: 70px solid red;
      border-left: 100px solid transparent;
      transform: rotate(35deg) scale(0.1);
      &:before {
        border-bottom: 80px solid red;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        position: absolute;
        height: 0;
        width: 0;
        top: -45px;
        left: -65px;
        display: block;
        content: '';
        transform: rotate(-35deg);
      }
      &:after {
        position: absolute;
        display: block;
        color: red;
        top: 3px;
        left: -105px;
        width: 0px;
        height: 0px;
        border-right: 100px solid transparent;
        border-bottom: 70px solid red;
        border-left: 100px solid transparent;
        transform: rotate(-70deg);
        content: '';
      }
    }
    .article_Share {
      display: flex;
      justify-content: center;
      line-height: 30px;
      margin-top: 30px;
      .words_Share {
        font-size: 16px;
        font-weight: 700;
        font-family: 'Roboto Slab', serif;
        margin-right: 10px;
      }
      .article_Share_Unified {
        width: 30px;
        height: 30px;
        margin-left: 10px;
        background: #000;
        border-radius: 50%;
        border: solid 1px #000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-out 0s;
        i {
          color: white;
        }
        &:hover {
          background: rgb(255, 255, 255);
          i {
            color: #000;
          }
        }
      }
    }
    .article_Author {
      text-align: center;
      margin: 60px auto;
      .head_Portrait_Img {
        width: 75px;
        height: 75px;
        display: inline-block;
        vertical-align: middle;
        /deep/ .preview_Img {
          border-radius: 50%;
        }
      }
      i:nth-child(1) {
        font-size: 75px;
      }
      a {
        color: #000;
      }
      h2 {
        font-size: 20px;
        margin: 10px 0 3px;
      }
    }
    .article_Content_nav {
      line-height: 50px;
      padding: 25px 100px;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .prev_Next_Article_Content_Bg {
        display: inline-block;
        height: 50px;
        width: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        font-size: 18px;
        color: #fff;
        background-color: #000;
        border: 1px solid #000;
        transition: all 0.3s ease-out 0s;
        margin-right: 20px;
        position: relative;
        cursor: pointer;
        &:hover {
          background-color: #fff;
          color: #3d3d3d;
        }
      }
      .prev_Article_Content {
        position: relative;
        &::after {
          content: '上一篇';
          font-size: 16px;
          font-weight: 900;
          color: #3d3d3d;
          position: absolute;
          left: 80px;
          width: 100%;
        }
      }
      .next_article_Content {
        position: relative;
        &::before {
          content: '下一篇';
          font-size: 16px;
          font-weight: 900;
          color: #3d3d3d;
          position: absolute;
          right: 80px;
          width: 100%;
        }
      }
    }
    .article_Relevant {
      padding: 60px 100px 30px;
      height: 410px;
      h2 {
        font-size: 25px;
        margin-bottom: 30px;
      }
      .article_Relevant_Content {
        display: flex;
        justify-content: space-between;
        height: calc(~'100% - 60px');
        .article_Relevant_Content_Item {
          flex: 0 0 45%;
          max-height: 350px;
          height: 100%;
          border-radius: 4px;
          transition: all 0.5s cubic-bezier(0.25, 0.7, 0.25, 1);
          border: 1px solid #e1e1e1;
          transform: translate3d(0, 0, 0);
          &:hover {
            box-shadow: 0 2px 12px 0 rgba(0 ,0 ,0 , 10%);
            transform: translate3d(0px, -4px, 0px);
          }
          .article_Relevant_Item_BG_Img {
            width: 100%;
            height: calc(~'100% - 66px');
            margin-bottom: 10px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          p {
            height: 2.8em;
            font-size: 20px;
            text-align: center;
            padding: 0 20px;
            line-height: 1.4em;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            cursor: pointer;
          }
        }
      }
    }
    .comment_Wrap {
      padding: 50px 100px 30px;
      border-top: 1px solid #e5e5e5;
      .comment_List_Wrap {
        width: 100%;
        padding: 20px 0;
        position: relative;
        & > p:first-child {
          font-size: 22px;
          font-weight: bold;
          color: #404040;
        }
        .comment_List {
          width: 100%;
          color: #404040;
          margin-top: 20px;
          li {
            padding: 10px 0;
            display: flex;
            .fa-user-circle {
              font-size: 50px;
              vertical-align: middle;
              margin-top: 4px;
            }
            .head_Portrait_Img {
              width: 50px;
              height: 50px;
              display: inline-block;
              vertical-align: middle;
              /deep/ .preview_Img {
                border-radius: 50%;
              }
            }
            .comment_Person_Contents {
              flex: 1;
              margin-left: 15px;
              p {
                line-height: 20px;
                font-size: 14px;
                color: #727272;
                i {
                  margin: 0 5px;
                  font-weight: bold;
                }
              }
              p + p {
                color: #969696;
                font-size: 12px;
              }
              .comment_Contents {
                margin-top: 6px;
                font-size: 16px;
                line-height: 1.5;
                word-break: break-word;
              }
              .comment_Opartion {
                color: #b0b0b0;
                font-size: 14px;
                line-height: 14px;
                margin-top: 7px;
                a {
                  width: 40px;
                  height: 40px;
                }
                i {
                  margin-right: 10px;
                }
                span {
                  cursor: pointer;
                  margin-right: 15px;
                }
                .delete_comment_replay_Dom {
                  display: none;
                }
                &:hover {
                  .delete_comment_replay_Dom {
                    display: inline-block;
                  }
                }
              }
            }
            .comment_List_Reply {
              a {
                width: 35px;
                height: 35px;
              }
              .fa-user-circle {
                font-size: 35px;
              }
            }
          }
        }
      }
    }
  }
  .comment {
    width: 100%;
    display: flex;
    i {
      font-size: 50px;
      vertical-align: middle;
      margin-top: 4px;
      color: #404040;
    }
    .head_Portrait_Img {
      width: 50px;
      height: 50px;
      display: inline-block;
      vertical-align: middle;
      /deep/ .preview_Img {
        border-radius: 50%;
      }
    }
    .comment_Write {
      flex: 1;
      margin-left: 20px;
      textarea {
        padding: 12px 16px;
        width: 100%;
        height: 90px;
        font-size: 13px;
        border: 1px solid #eee;
        border-radius: 4px;
        background-color: #fafafa;
        resize: none;
        display: inline-block;
        vertical-align: top;
        outline-style: none;
        box-sizing: border-box;
        z-index: 10;
        position: relative;
      }
      .comment_Release {
        width: 100%;
        text-align: right;
        margin-top: 16px;
        transition: all 0.5s;
        height: 0;
        transform: translate3d(0, -52px, 0);
        .SHButton {
          padding: 10px 15px;
          border-radius: 10px;
          margin-left: 15px;
        }
      }
    }
  }
  .comment_Replay {
    position: absolute;
    box-sizing: border-box;
    width: calc(~'100% - 67px');
    left: 67px;
  }
}

@media screen and (max-width: 750px) {
  .infoBlog {
    background: #fff;
    padding: 2vh 0 0 5%;
    &::before {
      min-width: 0px;
      width: 0;
    }
    &::after {
      content: '';
    }
    .article_Wrap {
      width: 95%;
      padding: 0 2%;
      border-radius: 10px;
      margin-bottom: 2vh;
      .article_Views_like_Title_Tag {
        width: 100%;
        margin-left: 0;
        .article_Title {
          margin: 30px 0 40px 0;
          font-size: 35px;
        }
        .article_Data_Tag {
          max-width: 330px;
        }
      }
      .article_Share {
        .article_Share_Unified {
          width: 25px;
          height: 25px;
        }
      }
      .article_Content_nav {
        line-height: 25px;
        padding: 25px 20px;
        justify-content: space-between;
        .prev_Next_Article_Content_Bg {
          height: 25px;
          width: 25px;
          font-size: 12px;
          line-height: 25px;
        }
        .prev_Article_Content {
          position: relative;
          &::after {
            font-size: 12px;
            left: 50px;
          }
        }
        .next_article_Content {
          position: relative;
          &::before {
            font-size: 12px;
            right: 50px;
          }
        }
      }
      .article_Relevant {
        padding: 60px 20px 20px;
        height: 240px;
        h2 {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .article_Relevant_Content {
          height: calc(100% - 32px);
          .article_Relevant_Content_Item {
            .article_Relevant_Item_BG_Img {
              height: calc(100% - 45px);
            }
            p {
              font-size: 12px;
              height: 3em;
              line-height: 1.5em;
            }
          }
        }
      }
      .comment_Wrap {
        padding: 50px 0 0;
        .comment {
          .head_Portrait_Img {
            width: 32px;
            height: 32px;
          }
          .fa-user-circle {
            font-size: 32px;
          }
        }
        .comment_List_Wrap {
          & > p:first-child {
            font-size: 18px;
          }
          .comment_List {
            li {
              padding: 0;
              .fa-user-circle {
                font-size: 26px;
              }
              .head_Portrait_Img {
                width: 26px;
                height: 26px;
              }
              .comment_Person_Contents {
                p {
                  line-height: 16px;
                  font-size: 14px;
                }
                p + p {
                  font-size: 10px;
                }
                .comment_Contents {
                  margin-top: 4px;
                  font-size: 16px;
                }
                .comment_List_Reply {
                  a {
                    width: 25px;
                    height: 25px;
                  }
                  .fa-user-circle {
                    font-size: 25px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .comment_Replay {
      position: absolute;
      box-sizing: border-box;
      width: calc(~'100% - 40px');
      left: 40px;
      .SHButton {
        padding: 5px 10px;
      }
    }
    .comment {
      .fa-user-circle {
        font-size: 26px;
      }
      .head_Portrait_Img {
        width: 26px;
        height: 26px;
      }
      .comment_Write {
        .comment_Release {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
