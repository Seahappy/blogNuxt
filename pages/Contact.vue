<!--
 * @Author: Cxy
 * @Date: 2021-02-27 23:04:28
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:36:07
 * @FilePath: \blog\blogNuxt\pages\Contact.vue
-->
<template>
  <div class='content'>
    <div class='content_Wrap'>
      <div class='content_Write'>
        <h3>联系我们</h3>
        <p class=''>
          来都来了，留下你的足迹吧 <br >有什么建议，也可以写下来呦，不吝赐教
        </p>
        <textarea v-model='message_Content' placeholder='写下你的留言...' @click='content_Btn_Flag = true'/>
        <div class='content_Release' :style="
          content_Btn_Flag
            ? 'height: 36px;transform: translate3d(0, 0, 0);'
            : ''
        ">
          <SHButton type='primary' :disabled='message_Content.length < 5' @click='(content_Btn_Flag = false), content_Article()'>发表</SHButton>
          <SHButton @click='(content_Btn_Flag = false), cancel_Rest()'>取消</SHButton>
        </div>
        <ul class='comment_List'>
          <li v-for='c in content_Article_Data' :key='c._id'>
            <SHImage v-if="c.head_Portrait !== ''" :src='c.head_Portrait' />
            <i v-else class='fa fa-user-circle' aria-hidden='true'/>
            <div class='comment_Person_Contents'>
              <p>
                {{ c.nick_Name ? c.nick_Name : c.admin_Code }}
                <span>{{ $options.filters.dateFilter(c.content_Time).slice(5) }}</span>
              </p>
              <div class='comment_Contents'>{{ c.message_Content }}</div>
              <div class='comment_Opartion' :style="
                'height:' + (content_Replay_Dom_Id === c._id ? 145 : 15) + 'px;'
              ">
                <span @click='content_replay($event, c)'>
                  <i class='fa fa-comment' aria-hidden='true'/>回复
                </span>
              </div>
              <ul class='comment_List comment_List_Reply'>
                <li v-for='cc in c.reply_List' :key='cc._id'>
                  <SHImage v-if="cc.head_Portrait !== ''" :src='cc.head_Portrait' />
                  <i v-else class='fa fa-user-circle' aria-hidden='true'/>
                  <div class='comment_Person_Contents'>
                    <p>
                      {{ cc.nick_Name ? cc.nick_Name : cc.admin_Code }}
                      <i class='fa fa-caret-right' aria-hidden='true'/>
                      {{ cc.nick_Name_Reply ? cc.nick_Name_Reply : cc.admin_Code_Reply }}
                      <span>{{ $options.filters.dateFilter(cc.content_Time).slice(5) }}</span>
                    </p>
                    <div class='comment_Contents'>
                      {{ cc.message_Content }}
                    </div>
                    <div class='comment_Opartion' :style="
                      'height:' +
                        (content_Replay_Dom_Id === cc._id ? 145 : 15) +
                        'px;'
                    ">
                      <span @click='content_replay($event, c, cc)'>
                        <i class='fa fa-comment' aria-hidden='true'/>回复
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div v-show='content_Replay_OffsetTop !== 0' class='comment_Replay' :style="'top:' + (content_Replay_OffsetTop + 22) + 'px;'">
          <textarea v-model='message_Content_Replay' placeholder='写下你的留言...'/>
          <div class='content_Release' style='height: 36px; transform: translate3d(0, 0, 0)'>
            <SHButton type='primary' :disabled="message_Content_Replay === ''" @click="content_Article('replay')">发表</SHButton>
            <SHButton @click='(content_Replay_OffsetTop = 0), cancel_Rest()'>取消</SHButton>
          </div>
        </div>
      </div>
      <div class='content_Write_Bg'/>
    </div>
  </div>
</template>

<script>
import {
  Website_Message,
  Get_Website_Message,
  delete_Website_Message
} from '@/http/model/other.js'
export default {
  data() {
    return {
      message_Content: '',
      message_Content_Replay: '',
      content_Btn_Flag: false,
      content_Article_Data: [],
      content_Replay_Dom_Id: '', // 回复评论id
      content_Replay_OffsetTop: 0
    }
  },
  methods: {
    delete_Website_Message_Opraction(c, cc) {
      const { _id: comment_id } = c
      const { _id: comment_Reply_id } = cc || { _id: undefined }
      const params = {
        comment_id,
        comment_Reply_id
      }
      delete_Website_Message(params).then((res) => {
        const { code, massage } = res.data
        if (code === 200) {
          this.Website_Message_Data()
        } else {
          this.$Msg(massage, 'wran')
        }
      })
    },
    content_Article(PublicType) {
      let params = {}
      const { message_Content } = this
      if (PublicType) {
        const {
          content_Replay_Id,
          content_Replay_admin_Code,
          content_Replay_nick_Name,
          message_Content_Replay
        } = this
        params = {
          admin_Code: (new Date().getTime() + '匿名').slice(-7),
          content_id: content_Replay_Id,
          message_Content: message_Content_Replay,
          admin_Code_Reply: content_Replay_admin_Code
        }
        if (content_Replay_nick_Name) { params.nick_Name_Reply = content_Replay_nick_Name }
      } else {
        params = {
          admin_Code: (new Date().getTime() + '匿名').slice(-7),
          message_Content
        }
      }
      Website_Message(params).then((res) => {
        const { code, massage } = res.data
        if (code === 200) {
          this.Website_Message_Data()
          this.cancel_Rest()
        } else {
          this.$Msg(massage, 'wran')
        }
      })
    },
    Website_Message_Data() {
      Get_Website_Message().then((res) => {
        const { code, massage, data } = res.data
        if (code === 200) {
          this.content_Article_Data = (data.data || [])[0]?.website_Message
        } else {
          this.$Msg(massage, 'wran')
        }
      })
    },
    content_replay(ev, c, cc) {
      const e = ev || window.event
      const target = e.target || e.srcElement
      this.content_Replay_Dom_Id = cc ? cc._id : c._id
      this.content_Replay_Id = c._id
      this.content_Replay_admin_Code = cc ? cc.admin_Code : c.admin_Code
      this.content_Replay_nick_Name = cc ? cc.nick_Name : c.nick_Name
      this.$nextTick(_ => {
        this.content_Replay_OffsetTop = target.offsetTop
      })
    },
    // 评论关闭重置
    cancel_Rest() {
      this.content_Replay_Dom_Id = ''
      this.message_Content = ''
      this.message_Content_Replay = ''
      this.content_Replay_OffsetTop = 0
    }
  },
  async asyncData() {
    const { data } = await Get_Website_Message()
    return {
      content_Article_Data: (data.data.data || [])[0]?.website_Message
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  background: rgba(0, 0, 0, 0.411);
  display: flex;
  padding: 90px 0 0 90px;
  position: relative;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: -80px;
    width: 350px;
    height: 75px;
    background: #0000009a;
    backdrop-filter: blur(4px);
    transform: rotate3d(0, 0, 1, -45deg);
    z-index: 1;
  }
  &::after {
    content: '留言';
    position: absolute;
    left: 40px;
    top: 60px;
    color: #fff;
    font-size: 45px;
    font-weight: 900;
    transform: rotate3d(0, 0, 1, -45deg);
    z-index: 1;
  }
  .content_Wrap {
    width: calc(~'100% - 130px');
    background: #eee;
    position: relative;
    padding: 20px 20px 40px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
    .content_Write {
      flex: 1;
      margin-left: 20px;
      box-sizing: border-box;
      margin-right: 50px;
      position: relative;
      h3 {
        font-size: 2em;
        & + p {
          font-size: 1em;
          line-height: 1.5em;
          margin: 20px 0 10px 0;
          color: #5c5c5c;
        }
      }
      textarea {
        padding: 12px 16px;
        width: 100%;
        height: 120px;
        font-size: 20px;
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
        color: #6d6d6d;
        line-height: 1.5;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 10%);
      }
      .content_Release {
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
      .comment_List {
        width: 100%;
        color: #404040;
        li {
          display: flex;
          padding: 6px 0;
          .fa-user-circle {
            font-size: 50px;
            vertical-align: middle;
            margin-top: 4px;
          }
          /deep/ .preview_Img {
            width: 50px;
            height: 50px;
            display: inline-block;
            vertical-align: middle;
            border-radius: 50%;
          }
          .comment_Person_Contents {
            flex: 1;
            margin-left: 15px;
            p {
              line-height: 20px;
              font-size: 14px;
              color: #727272;
              i {
                margin: 0 10px;
                font-weight: bold;
              }
              span {
                font-size: 12px;
                display: block;
              }
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
        }
      }
      .comment_List_Reply {
        li {
          /deep/ .preview_Img {
            width: 35px;
            height: 35px;
            display: inline-block;
            vertical-align: middle;
            border-radius: 50%;
          }
          .fa-user-circle {
            font-size: 35px;
          }
        }
      }
      .comment_Replay {
        position: absolute;
        box-sizing: border-box;
        width: calc(~'100% - 67px');
        left: 67px;
        text-align: right;
        textarea {
          height: 100px;
        }
        .content_Release {
          margin-top: 10px;
        }
      }
    }
    .content_Write_Bg {
      width: 353px;
      max-height: 500px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-image: url(https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=353&q=80);
    }
  }
}
@media screen and (max-width: 750px) {
  .content {
    padding: 30px 0 0 30px;
    background: #fff;
    &::before {
      top: 25px;
      left: -70px;
      width: 210px;
      height: 50px;
    }
    &::after {
      left: 20px;
      top: 28px;
      font-size: 26px;
    }
    .content_Wrap {
      width: calc(~'100% - 25px');
      background: #fff;
      padding: 20px 0px 40px;
      margin-bottom: 0;
      .content_Write {
        flex: 1;
        margin-left: 0;
        margin-right: 0;
        .comment_List {
          li {
            .fa-user-circle {
              font-size: 30px;
            }
            .preview_Img {
              width: 30px;
              height: 30px;
            }
            .comment_Person_Contents {
              p {
                line-height: 16px;
                font-size: 12px;
                span {
                  font-size: 10px;
                }
              }
              .comment_Opartion {
                font-size: 12px;
                line-height: 12px;
                margin-top: 5px;
              }
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
        .comment_Replay {
          width: calc(100% - 65px);
          left: 45px;
          textarea {
            height: 85px;
          }
          .content_Release {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
