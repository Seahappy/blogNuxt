<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2022-05-30 19:15:40
 * @LastEditors: Cxy
 * @LastEditTime: 2022-06-14 15:10:58
 * @FilePath: \ehomes-admind:\gitHubBlog\blogNuxt\pages\Live.vue
-->
<template>
  <div class='live'>
    <div class='live_Rooms'>
      <div
        v-for='c in live_Data'
        :key='c._id'
        class='live_Rooms_Item'
        @click="$router.push({ path: '/LiveUser/' + c.id })">
        <div
          class='live_Rooms_Item_BG'
          :style="{
            backgroundImage:
              'url(' + (c.live_Image || Article_Default_BG) + ')',
          }"/>
        <div class='live_Rooms_Item_Content'>
          <div class='live_Rooms_Item_Info'>
            <span class='live_Rooms_Item_Title'>{{
              c.room_Title || "没起标题"
            }}</span>
          </div>
          <div class='live_Rooms_Item_Info'>
            <span class='live_Rooms_Item_User'>
              <i class='fa fa-user' aria-hidden='true' />
              {{ c.nick_Name || c.admin_Code }}
            </span>
            <span style='display: flex;'>
              <svg width='14px' version='1.1' viewBox='190 0 500 750'>
                <path
                  d='m453.11 249.49c-4.0391-1.8984-8.7148-1.793-12.668 0.25391-3.9414 2.0703-6.6875 5.8633-7.4219 10.262-3.1914 19.176-11.375 38.711-24.402 58.301-25.113-66.77-47.203-118.96-98.203-140.13-3.9258-1.625-8.3555-1.4062-12.113 0.57812-3.7461 1.9844-6.4141 5.5391-7.2539 9.6914-9.9883 48.664-32.801 84.152-54.875 118.45-23.07 35.883-44.871 69.762-44.871 111.72 0 52.57 18.48 99.125 59.938 150.95 3.6094 4.5 9.5312 6.375 15.098 4.7656 5.5234-1.625 9.5312-6.418 10.129-12.148 6.3398-59.859 26.539-99.812 71.176-139.16 15.164 14.672 29.816 38.848 43.664 72.094 1.9141 4.6094 6.1055 7.8633 11.031 8.5938 4.8984 0.73438 9.8789-1.1797 13.043-5.0234 13.418-16.281 25.918-42.297 34.562-62.77 16.746 30.996 28.902 70.25 39.984 127.47 1.1641 6.043 6.0898 10.641 12.195 11.398 6.2266 0.875 12.027-2.5039 14.609-8.0742 29.922-63.906 44.297-117.03 43.965-162.41-0.51172-69.227-36.715-121.31-107.59-154.82z'
                  fill='#888'/>
              </svg>
              <span>{{ c.room_Heat || 0 }}</span>
            </span>
          </div>
          <div class='live_Rooms_Item_InfoMax live_Rooms_Item_Info'>
            <SHImage
              v-if='c.head_Portrait'
              class='live_Rooms_Item_headPortrait'
              :src='c.head_Portrait'/>
            <i v-else class='fa fa-user' aria-hidden='true' />
            <div class='live_Rooms_Item_InfoMax_User'>
              <span class='live_Rooms_Item_User'>{{
                c.nick_Name || c.admin_Code
              }}</span>
              <div class='live_Rooms_Item_InfoMax_Fire'>
                <svg width='16px' version='1.1' viewBox='130 30 600 700'>
                  <path
                    d='m453.11 249.49c-4.0391-1.8984-8.7148-1.793-12.668 0.25391-3.9414 2.0703-6.6875 5.8633-7.4219 10.262-3.1914 19.176-11.375 38.711-24.402 58.301-25.113-66.77-47.203-118.96-98.203-140.13-3.9258-1.625-8.3555-1.4062-12.113 0.57812-3.7461 1.9844-6.4141 5.5391-7.2539 9.6914-9.9883 48.664-32.801 84.152-54.875 118.45-23.07 35.883-44.871 69.762-44.871 111.72 0 52.57 18.48 99.125 59.938 150.95 3.6094 4.5 9.5312 6.375 15.098 4.7656 5.5234-1.625 9.5312-6.418 10.129-12.148 6.3398-59.859 26.539-99.812 71.176-139.16 15.164 14.672 29.816 38.848 43.664 72.094 1.9141 4.6094 6.1055 7.8633 11.031 8.5938 4.8984 0.73438 9.8789-1.1797 13.043-5.0234 13.418-16.281 25.918-42.297 34.562-62.77 16.746 30.996 28.902 70.25 39.984 127.47 1.1641 6.043 6.0898 10.641 12.195 11.398 6.2266 0.875 12.027-2.5039 14.609-8.0742 29.922-63.906 44.297-117.03 43.965-162.41-0.51172-69.227-36.715-121.31-107.59-154.82z'
                    fill='#888'/>
                </svg>
                <span>{{ c.room_Heat || 0 }}</span>
              </div>
            </div>
            <SHButton type='primary' @click='jump_port_Record({ routeUrl: $route.fullPath })'>联系</SHButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_Live_Broadcast } from '@/http/model/live'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      live_Data: []
    }
  },
  computed: {
    ...mapState('article', ['Article_Default_BG']),
    ...mapState('login', ['Users'])
  },
  methods: {
    ...mapMutations(['jump_info_Blog', 'jump_port_Record']),
    get_Live_Broadcast_Oper() {
      get_Live_Broadcast({ live_Status: 1 }).then(
        ({
          data: {
            data: { data },
            code
          }
        }) => {
          if (code === 200) {
            this.live_Data = data
          }
        }
      )
    }
  },
  created() {
    this.get_Live_Broadcast_Oper()
  }
}
</script>

<style scoped lang="less">
.live {
  width: 84%;
  background: #f5f5f5;
  display: flex;
  padding: 30px 8% 50px 8%;
  min-height: 45vh;
  .live_Rooms {
    width: 100%;
    .live_Rooms_Item {
      display: inline-block;
      width: 30%;
      background: #fff;
      border-radius: 8px;
      color: #aaa;
      position: relative;
      font-size: 12px;
      box-shadow: #0000001a 0px 0px 5px 0;
      transition: transform 0.3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
        z-index: 1;
        .live_Rooms_Item_Content {
          .live_Rooms_Item_InfoMax {
            display: inline-block;
          }
        }
      }
      &:nth-child(3n + 2) {
        margin: 10px 5%;
      }
      .live_Rooms_Item_BG {
        width: 100%;
        height: 210px;
        background-size: 101%;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 8px 8px 0 0;
      }
      .live_Rooms_Item_Content {
        padding: 7px 14px 11px;
        line-height: 24px;
        .live_Rooms_Item_Info {
          display: flex;
          justify-content: space-between;
          .live_Rooms_Item_Title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 15px;
            color: #333;
          }
          i {
            color: #888;
            font-size: 14px;
            vertical-align: middle;
          }
          .live_Rooms_Item_User {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #888;
          }
        }
        .live_Rooms_Item_InfoMax {
          display: none;
          position: absolute;
          left: 0;
          top: 245px;
          background: #fff;
          width: 100%;
          border-radius: 0 0 8px 8px;
          padding: 0 14px 10px;
          box-sizing: border-box;
          line-height: 20px;
          z-index: 10;
          i {
            font-size: 40px;
            margin-right: 12px;
            vertical-align: top;
          }
          .live_Rooms_Item_InfoMax_User {
            display: inline-block;
            .live_Rooms_Item_InfoMax_Fire {
              display: flex;
            }
          }
          .SHButton {
            border-radius: 16px;
            float: right;
            padding: 8px 16px;
            margin-top: 6px;
          }
          .live_Rooms_Item_headPortrait {
            height: 40px;
            width: 40px;
            display: inline-block;
            margin-right: 12px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
