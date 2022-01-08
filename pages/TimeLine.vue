<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-08-02 20:55:48
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:36:45
 * @FilePath: \blog\blogNuxt\pages\TimeLine.vue
-->
<template>
  <div class='timeline_Wrap'>
    <div class='timepoint'>
      <div class='TabsUiWrap'>
        <SHTab v-model='type_Default' @tabClick='tabClick'>
          <SHTabPane name='website'>网站</SHTabPane>
          <SHTabPane name='blog'>博客</SHTabPane>
        </SHTab>
      </div>
      <ul>
        <li v-for='c in year_Month_Copy' :key='c.title' :style="{background: select_Index === c.index ? 'rgb(187, 187, 187)': ''}" @click='goAnchor(c.index)'>
          {{ c.title }}
        </li>
      </ul>
    </div>
    <ul v-if='timeLineData.length' class='timeline'>
      <li class='timeline_line' />
      <li v-for='c in timeLineData' :key='c.creation_Time' class='timeline_item start'>
        <div v-if='c.year_Month' class='year_Month'>
          <p>{{ c.year_Month.slice(0, 4) }}</p>
          <p>{{ c.year_Month.slice(5, 7) }}</p>
        </div>
        <div class='info'>
          <div class='dot' />
          <time class='time'>{{ c.day }}</time>
          <time class='time'>{{ c.time }}</time>
          <h4 class='speaker'>{{ c.title }}</h4>
        </div>
        <div v-if='!timeLineData[0].Views_Article' class='content markdown-body markdown-body-none-img' v-html='c.describe' />
        <div v-else :style="{cursor: timeLineData[0].Views_Article ? 'pointer' : ''}" class='content markdown-body' @click='jump_info_Blog(c.id_Article)' v-html='c.describe' />
      </li>
      <li class='timeline_item end'>
        <div v-if='timeLineData[0]' class='info'>
          <div class='dot' />
          <h4 v-if='!timeLineData[0].Views_Article' class='title'>管理员正在加紧更新</h4>
          <h4 v-else class='title'>
            现在展示的是网站一部分博客呦，登陆后会展示您发布的
          </h4>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Time_Line_Data } from '@/http/model/other.js'
import { mapMutations } from 'vuex'
import dataFilterMathods from '@/plugins/filters.js'
export default {
  data() {
    return {
      timeLineData: [],
      year_Month_Copy: [],
      select_Index: 0,
      type_Default: 'website',
      timeLine_Data_All: {
        website: [],
        blog: []
      }
    }
  },
  async asyncData() {
    const res = await Time_Line_Data()
    const { data: { data, article }} = res.data
    const year_Month_Copy = []
    data[0].timeLine_Data.forEach((c, i) => {
      const year_Month_Item = dataFilterMathods(Number(c['creation_Time']))
      if (
        year_Month_Copy.findIndex(
          (c) => c.title === year_Month_Item.slice(0, 7)
        ) === -1
      ) {
        c.year_Month = year_Month_Item.slice(0, 7)
        year_Month_Copy.push({
          title: year_Month_Item.slice(0, 7),
          index: i
        })
      }
      c.day = year_Month_Item.slice(8, 11)
      c.time = year_Month_Item.slice(11, 16)
    })
    return {
      year_Month_Copy,
      timeLine_Data_All: {
        website: data[0].timeLine_Data,
        blog: article
      },
      timeLineData: data[0].timeLine_Data
    }
  },
  methods: {
    ...mapMutations(['jump_info_Blog']),
    async tabClick(name) {
      if (this.type_Default === name) return
      this.type_Default = name
      this.timeLineData = []
      this.time_Line_Arrangement(this.timeLine_Data_All[name], name === 'website' ? 'creation_Time' : 'id_Article')
    },
    time_Line_Arrangement(timeLineData, key) {
      this.year_Month_Copy = []
      timeLineData.forEach((c, i) => {
        const year_Month_Item = this.$options.filters.dateFilter(
          Number(c[key])
        )
        if (
          this.year_Month_Copy.findIndex(
            (c) => c.title === year_Month_Item.slice(0, 7)
          ) === -1
        ) {
          c.year_Month = year_Month_Item.slice(0, 7)
          this.year_Month_Copy.push({
            title: year_Month_Item.slice(0, 7),
            index: i
          })
        }
        c.day = year_Month_Item.slice(8, 11)
        c.time = year_Month_Item.slice(11, 16)
      })
      this.$nextTick(() => {
        this.timeLineData = timeLineData
      })
    },
    goAnchor(index) {
      if (this.select_Index === index) return
      this.select_Index = index
      const sliding_Distance = document.getElementsByClassName('timeline_item')[
        index
      ].offsetTop
      let current_distance = document.getElementById('app').scrollTop
      if (sliding_Distance === current_distance) return false
      let timer = setInterval(() => {
        if (sliding_Distance > current_distance) {
          current_distance += 30
          if (current_distance > sliding_Distance) {
            clearInterval(timer)
            timer = null
            current_distance = sliding_Distance
          }
        } else {
          current_distance -= 30
          if (current_distance < sliding_Distance) {
            clearInterval(timer)
            timer = null
            current_distance = sliding_Distance
          }
        }
        document.getElementById('app').scrollTop = current_distance + 40
      }, 10)
    }
  }
}
</script>

<style lang="less" scoped>
.timeline_Wrap {
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.497);
  backdrop-filter: blur(30px);
  padding-top: 50px;
  color: #fff;
  min-height: 60vh;
  .timepoint {
    margin-right: 100px;
    width: 15%;
    text-align: center;
    color: #000;
    position: sticky;
    top: 90px;
    padding-left: 18%;
    &::before {
      content: '';
      width: 100px;
      height: 260px;
      position: absolute;
      top: -30px;
      background: rgba(0, 0, 0, 0.705);
      backdrop-filter: blur(4px);
      left: 7px;
      border-radius: 10px;
    }
    &::after {
      color: #fff;
      content: '时间轴';
      position: absolute;
      width: 45px;
      left: 35px;
      font-size: 45px;
      top: 15px;
    }
    .TabsUiWrap {
      width: 100%;
      background: #fff;
      text-align: initial;
      display: flex;
      justify-content: center;
      border-radius: 5px;
      .TabsUi {
        margin-bottom: 6px;
        padding-bottom: 2px;
      }
    }
    li {
      line-height: 30px;
      background: #fff;
      border-radius: 5px;
      margin: 8px 0;
      transition: background 0.5s;
      cursor: pointer;
      &:hover {
        background: rgb(187, 187, 187);
      }
    }
  }
  .timeline {
    position: relative;
    display: grid;
    gap: 40px;
    font-size: 14px;
    line-height: 1;
    color: white;
    list-style-type: none;
    clip-path: inset(0 0 100% 0);
    animation: expand 3s forwards linear;
    width: 45%;
    padding-right: 19%;
    padding-left: 85px;
    margin-bottom: 40px;
    overflow: hidden;
    .timeline_line {
      position: absolute;
      top: 0;
      left: 91px;
      width: 4px;
      height: 100%;
      background: white;
    }
    .timeline_item {
      position: relative;
      .year_Month {
        position: absolute;
        left: -80px;
        font-size: 30px;
        font-weight: 700;
        top: -5px;
        text-align: right;
      }
      .info {
        display: grid;
        grid-template-columns: repeat(3, auto) 1fr;
        align-items: center;
        gap: 0.5rem;
        .dot {
          position: relative;
          width: 16px;
          height: 16px;
          background: #1a1e23;
          border-radius: 50%;
          &::before {
            position: absolute;
            content: '';
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
          }
          &::after {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 8px;
            height: 8px;
            border: 4px solid white;
            border-radius: inherit;
          }
        }
        .time {
          margin-right: 8px;
        }
        h4 {
          line-height: 18px;
          font-size: 16px;
        }
      }
      .content {
        margin: 1rem 0 0 4.2rem;
        line-height: 1.5;
        color: #e5e5e5;
        font-size: 14px;
        max-height: 105px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
    }
  }
  @keyframes expand {
    to {
      clip-path: inset(0 0 0 0);
    }
  }
}
@media screen and (max-width: 750px) {
  .timeline_Wrap {
    flex-direction: column;
    padding-top: 15px;
    .timepoint {
      position: initial;
      width: 55%;
      padding-left: 35%;
      &::before {
        width: 80px;
        height: 150px;
        top: 100px;
        left: 20px;
      }
      &::after {
        left: 40px;
        font-size: 35px;
        top: 115px;
      }
    }
    .timeline {
      width: 66%;
      padding-right: 0;
      padding-left: 105px;
      margin-top: 30px;
      .timeline_line {
        left: 112px;
      }
      .timeline_item {
        .year_Month {
          font-size: 20px;
          margin-top: 5px;
          left: -60px;
        }
        .content {
          max-height: 230px;
          -webkit-line-clamp: 10;
        }
      }
    }
  }
}
</style>
