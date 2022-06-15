<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2022-06-04 14:02:35
 * @LastEditors: Cxy
 * @LastEditTime: 2022-06-15 16:47:48
 * @FilePath: \ehomes-admind:\gitHubBlog\blogNuxt\pages\LiveUserRou.vue
-->
<template>
  <div class='live'>
    <div class='live_Left'>
      <div class='live_User'>
        <SHImage
          v-if='live_User.head_Portrait'
          class='live_User_headPortrait'
          :src='live_User.head_Portrait'/>
        <i
          v-else
          class='fa fa-user live_User_headPortrait'
          aria-hidden='true'/>
        <div class='live_User_Content'>
          <p class='live_User_Code'>
            <span>{{ live_User.nick_Name || live_User.admin_Code }}</span>
            <span>{{ resolving_Power[resolving_Power_Code] }}</span>
          </p>
          <p class='live_User_Des'>
            <span>
              <i class='fa fa-address-card' aria-hidden='true' />
              <span>{{ live_User.room_Description || "主播没有写" }}</span>
            </span>
            <span style='display: flex'>
              <svg width='24px' version='1.1' viewBox='0 0 752 752'>
                <path
                  d='m453.11 249.49c-4.0391-1.8984-8.7148-1.793-12.668 0.25391-3.9414 2.0703-6.6875 5.8633-7.4219 10.262-3.1914 19.176-11.375 38.711-24.402 58.301-25.113-66.77-47.203-118.96-98.203-140.13-3.9258-1.625-8.3555-1.4062-12.113 0.57812-3.7461 1.9844-6.4141 5.5391-7.2539 9.6914-9.9883 48.664-32.801 84.152-54.875 118.45-23.07 35.883-44.871 69.762-44.871 111.72 0 52.57 18.48 99.125 59.938 150.95 3.6094 4.5 9.5312 6.375 15.098 4.7656 5.5234-1.625 9.5312-6.418 10.129-12.148 6.3398-59.859 26.539-99.812 71.176-139.16 15.164 14.672 29.816 38.848 43.664 72.094 1.9141 4.6094 6.1055 7.8633 11.031 8.5938 4.8984 0.73438 9.8789-1.1797 13.043-5.0234 13.418-16.281 25.918-42.297 34.562-62.77 16.746 30.996 28.902 70.25 39.984 127.47 1.1641 6.043 6.0898 10.641 12.195 11.398 6.2266 0.875 12.027-2.5039 14.609-8.0742 29.922-63.906 44.297-117.03 43.965-162.41-0.51172-69.227-36.715-121.31-107.59-154.82z'
                  fill='#ff5353'/>
              </svg>
              {{ live_User.room_Heat + 1 || 0 }}
            </span>
          </p>
        </div>
      </div>
      <video
        ref='live_Video'
        autoplay
        playsinline
        controls
        :poster='live_User.live_Image'
        class='live_Video'/>
      <div ref='live_Barrage' class='live_Barrage' />
      <SHLoading v-if='video_Loading' class='live_Video_Mask' />
      <div v-if='video_Offline' class='live_Video_Mask live_Video_Offline'>
        <SHImage
          v-if='live_User.head_Portrait'
          class='live_User_headPortrait'
          :src='live_User.head_Portrait'/>
        <i
          v-else
          class='fa fa-user live_User_headPortrait'
          aria-hidden='true'/>
        <p>主播暂时不在家哦~~</p>
      </div>
    </div>
    <div class='live_Right'>
      <div ref='live_Chat' class='live_Chat'>
        <div v-for='c in chat_Data' :key='c.time' class='live_Chat_Item'>
          <span v-if='c.send_Person'>{{ c.send_Person }}：</span>
          <span>{{ c.chat_Content }}</span>
        </div>
      </div>
      <div class='live_Btn'>
        <div class='live_Send_Login'>
          <span @click='jump_port_Record({ routeUrl: $route.fullPath })'>登录</span>
          发弹幕，参与主播互动
        </div>
        <SHButton type='primary' :disabled='!chat_Content'>发送</SHButton>
      </div>
    </div>
  </div>
</template>

<script>
import { get_Live_Broadcast, set_Live_Heat } from '@/http/model/live'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      live_User: {},
      chat_Content: '',
      chat_Data: [],
      barrage_Dom_Data: [],
      barrage_Dom_Memory_Data: [],
      flvPlayer: null,
      video_Loading: true,
      video_Offline: false,
      tourist_Code: (new Date().getTime() + '').slice(-6),
      resolving_Power: {
        360: '流畅',
        540: '标清',
        720: '高清',
        900: '超清',
        1080: '超高清'
      },
      resolving_Power_Code: '',
      timer: null
    }
  },
  methods: {
    ...mapMutations(['jump_info_Blog', 'jump_port_Record']),
    barrage_Init({ chat_Content }) {
      this.auto_Distance_Oper()
      const barrage_Dom = document.createElement('div')
      barrage_Dom.innerHTML = chat_Content
      const live_Barrage = this.$refs.live_Barrage
      const live_Barrage_Width = live_Barrage.offsetWidth
      barrage_Dom.style =
        'position: absolute;white-space: nowrap;transition: transform 1s linear 0s;;transform: translate3d(' +
        live_Barrage_Width +
        'px, 0, 0);'
      live_Barrage.appendChild(barrage_Dom)
      const barrage_Width = barrage_Dom.offsetWidth
      this.barrage_Dom_Data.push({
        barrage_Dom,
        barrage_Width,
        barrage_Duration: ((barrage_Width + live_Barrage_Width) / 150).toFixed(
          1
        )
      })
      if (!this.timer) this.trigger_Dom()
    },
    trigger_Dom() {
      this.timer = setTimeout(() => {
        this.barrage_Dom_Data.forEach((c) => {
          const barrage_Last =
            (new Date().getTime() -
              this.barrage_Dom_Memory_Data.barrage_Start) *
              0.15 <
            this.barrage_Dom_Memory_Data.barrage_Width
          if (barrage_Last) {
            c.barrage_Dom.style.top = '30px'
          }
          c.barrage_Dom.style.transform = 'translate3d(-100%, 0, 0)'
          c.barrage_Dom.style.transitionDuration = c.barrage_Duration + 's'
          this.barrage_Dom_Memory_Data = {
            ...c,
            barrage_Start: new Date().getTime()
          }
          c.barrage_Dom.addEventListener(
            'transitionend',
            () => {
              c.barrage_Dom.remove()
            },
            false
          )
        })
        this.barrage_Dom_Data = []
        clearTimeout(this.timer)
        this.timer = null
      })
    },
    auto_Distance_Oper() {
      const live_Chat_Dom = this.$refs.live_Chat
      const live_Chat_SHeight = live_Chat_Dom.scrollHeight
      const live_Chat_Top = live_Chat_Dom.scrollTop
      const live_Chat_CHeight = live_Chat_Dom.clientHeight
      const live_Chat_Distance =
        live_Chat_SHeight - live_Chat_CHeight - live_Chat_Top
      if (live_Chat_Distance < 80) {
        this.$nextTick((_) => {
          live_Chat_Dom.scrollTop = live_Chat_Dom.scrollHeight
        })
      }
    },
    live_Join_Room_Oper() {
      const {
        live_User: { _id: room },
        tourist_Code
      } = this
      this.SK.emit(
        'join_Room',
        {
          room,
          chat_Content: '欢迎游客' + tourist_Code + '进入房间'
        },
        (data) => {
          this.barrage_Init(data)
          this.chat_Data.push(data)
        }
      )
    },
    get_Live_Broadcast_Oper() {
      return new Promise((resolve) => {
        get_Live_Broadcast({ id: this.$route.params.Id }).then(
          ({
            data: {
              data: { data },
              code
            }
          }) => {
            if (code === 200) {
              this.live_User = data[0]
              resolve()
            }
          }
        )
      })
    },
    get_Live_Video_Oper() {
      const { flvjs } = this
      this.$nextTick((_) => {
        if (flvjs.isSupported()) {
          const room_Url_Key = this.live_User.room_Key.split('?')
          const live_url = room_Url_Key[0] + '.flv?'
          const live_Video = this.$refs.live_Video
          this.flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: '/seaLive/' + live_url + room_Url_Key[1]
          })
          this.flvPlayer.attachMediaElement(live_Video)
          this.flvPlayer.load()
          this.flvPlayer.play()
          this.video_AddEventlistner()
        }
      })
    },
    video_AddEventlistner() {
      const { flvjs } = this
      // 加载完成
      this.flvPlayer.on(flvjs.Events.LOADING_COMPLETE, (_) => {
        this.video_Loading = false
        this.video_Offline = true
        this.pause_Video_Oper()
      })
      // 开始加载
      this.flvPlayer.on(flvjs.Events.MEDIA_INFO, ({ hasVideo }) => {
        if (hasVideo) {
          this.video_Loading = false
        }
      })
      // 获取数据信息
      this.flvPlayer.on(flvjs.Events.METADATA_ARRIVED, (res) => {
        this.resolving_Power_Code = Object.keys(this.resolving_Power).reduce(
          (prev, c) => {
            if (c <= res.height) {
              prev = c
            }
            return prev
          }
        )
      })
      // this.flvPlayer.on(flvjs.Events.RECOVERED_EARLY_EOF, (res) => {
      //   console.log('恢复早期EOF', res)
      // })
      // this.flvPlayer.on(flvjs.Events.SCRIPTDATA_ARRIVED, (res) => {
      //   console.log('获取到脚本数据', res)
      // })
      // 加载失败
      this.flvPlayer.on(flvjs.Events.ERROR, () => {
        this.video_Loading = false
        this.video_Offline = true
        this.pause_Video_Oper()
      })
      // 【重要事件监听】http请求建立好后，该事件会一直监听flvjs实例
      // this.flvPlayer.on(flvjs.Events.STATISTICS_INFO, (res) => {
      //   console.log('请求数据信息', res)
      // })
    },
    pause_Video_Oper() {
      if (!this.flvPlayer) return
      this.flvPlayer.pause()
      this.flvPlayer.unload()
      this.flvPlayer.detachMediaElement()
      this.flvPlayer.destroy()
      this.flvPlayer = null
    },
    live_Leave_Room_Oper() {
      const {
        live_User: { _id: room },
        tourist_Code
      } = this
      this.SK.socket &&
        this.SK.emit('leave_Room', {
          room,
          chat_Content: '游客' + tourist_Code + '已离开房间'
        })
    },
    beforeunload() {
      this.set_Live_Heat_Oper(-1)
    },
    set_Live_Heat_Oper(room_Heat) {
      set_Live_Heat({ id: this.live_User.id, room_Heat })
    }
  },
  async mounted() {
    this.SK.init()
    this.SK.connect()
    this.SK.socket.on('receive_Msg', (data) => {
      this.chat_Data.push(data)
      this.barrage_Init(data)
    })
    await this.get_Live_Broadcast_Oper()
    this.get_Live_Video_Oper()
    this.live_Join_Room_Oper()
    this.set_Live_Heat_Oper(1)
  },
  beforeDestroy() {
    this.pause_Video_Oper()
    this.live_Leave_Room_Oper()
    this.SK.disconnect()
    this.set_Live_Heat_Oper(-1)
    window.removeEventListener('beforeunload', this.beforeunload)
  },
  beforeMount() {
    window.addEventListener('beforeunload', this.beforeunload)
  }
}
</script>

<style lang="less" scoped>
.live {
  width: 84%;
  background: #f5f5f5;
  display: flex;
  padding: 30px 8%;
  height: 80vh;
  justify-content: space-between;
  .live_Left {
    width: 70%;
    border-radius: 5px;
    background: #fff;
    position: relative;
    .live_User {
      width: 100%;
      height: 104px;
      display: flex;
      align-items: center;
      padding: 12px;
      box-sizing: border-box;
      .live_User_headPortrait {
        width: 80px;
        height: 100%;
        border-radius: 6px;
        font-size: 80px;
        overflow: hidden;
        text-align: center;
      }
      .live_User_Content {
        width: calc(100% - 100px);
        color: #000;
        font-weight: 600;
        margin-left: 20px;
        line-height: 38px;
        .live_User_Code {
          display: flex;
          justify-content: space-between;
          span:first-child {
            flex: 1;
            font-size: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:last-child {
            background: linear-gradient(120deg, rgb(255, 0, 0), blue);
            background-clip: text;
            color: transparent;
            font-size: 14px;
          }
        }
        .live_User_Des {
          color: #888;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          i {
            padding-right: 12px;
          }
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .live_Video {
      width: 100%;
      height: calc(100% - 104px);
    }
    .live_Barrage {
      position: absolute;
      top: 112px;
      color: #fff;
      z-index: 1;
      width: 100%;
      overflow: hidden;
      height: 100px;
      font-size: 18px;
      font-weight: bold;
    }
    .live_Video_Mask {
      width: 100%;
      height: calc(100% - 104px);
      background: #000;
      position: absolute;
      top: 102px;
    }
    .live_Video_Offline {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #fff;
      .live_User_headPortrait {
        height: 90px;
        width: 90px;
        overflow: hidden;
        border-radius: 12px;
        font-size: 80px;
        text-align: center;
      }
      p {
        margin-top: 70px;
      }
    }
  }
  .live_Right {
    width: 26%;
    padding: 15px;
    border-radius: 5px;
    background: #fff;
    .live_Chat {
      height: calc(100% - 65px);
      width: 100%;
      overflow: scroll;
      box-shadow: inset 0px 0px 4px 1px #00000008;
      background: #00000008;
      padding: 0 10px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 8px;
        height: 0px;
      }
      &::-webkit-scrollbar-track {
        background: #00000000;
        box-shadow: inset 0 0 0 rgba(0, 0, 0, 0%);
      }
      &::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 0 rgba(0, 0, 0, 0%);
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 6px;
      }
      .live_Chat_Item {
        font-size: 14px;
        line-height: 30px;
        word-break: break-all;
        span:first-child {
          color: #989898;
          margin-right: 6px;
        }
      }
    }
    .live_Btn {
      height: 50px;
      width: 100%;
      display: flex;
      margin-top: 15px;
      .live_Send_Login {
        flex: 1;
        border-radius: 4px 0 0 4px;
        border: 1px solid #409eff;
        line-height: 48px;
        text-align: center;
        span {
          color: #409eff;
          cursor: pointer;
        }
      }
      /deep/ .SHInput {
        flex: 1;
        margin-right: 0;
        height: 100%;
        .inputUi_Input {
          font-size: 14px;
          textarea {
            border-radius: 4px 0 0 4px;
            border: 1px solid #409eff;
            background: #fff;
          }
        }
      }
      .SHButton {
        padding: 10px 10px;
        height: 100%;
        border-radius: 0 4px 4px 0;
      }
    }
  }
}
</style>
