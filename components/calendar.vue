<!--
 * @Descripttion: 日历组件
 * @Author: Cxy
 * @Date: 2021-08-26 15:27:39
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-28 17:32:14
 * @FilePath: \blog\blogNuxt\components\calendar.vue
-->
<template>
  <div class='calendar_Table' :style="{height: currentMonthInfo.length/7*29 + 130 + 'px'}">
    <div class='calendar_thead'>
      <div>日</div>
      <div>一</div>
      <div>二</div>
      <div>三</div>
      <div>四</div>
      <div>五</div>
      <div>六</div>
    </div>
    <div class='calendar_Tbody'>
      <div class='big_Month'>{{ curMonth }}</div>
      <div v-for='(c, i) in currentMonthInfo' ref='calendar_Item' :key='i' class='calendar_Item' :class="[(c.getYear() === nowData.getFullYear() && c.getMonth() === nowData.getMonth() + 1 && c.getDay() === new Date().getDate() ? 'currentClass' : ''),selectDay === i ? 'selectDay' : '']" :title="(c.todayNum ? '今日发文数:' + c.todayNum : '') + ' ' + (c.Lunar.getFestivals()[0] || c.Lunar.getDayInChinese())"
           @dblclick='selectDayOpar(i,c)'
           @click='selectDay = i'>
        <p class='calendar_Item_Solar' :style="curMonth === c.getMonth() ? (c.getWeek() === 6 || c.getWeek() === 0 ? 'color: #e02d2d' : 'color: #000') : '; font-weight: 500; color: #808080;'">
          {{ c.getDay() }}
          <span v-if='c.todayNum'/>
        </p>
        <p v-if='lunSolSH' class='lunar_Item_Solar'>
          {{ c.Lunar.getFestivals()[0] ? c.Lunar.getFestivals()[0].slice(0, 2) : c.Lunar.getDayInChinese() }}
        </p>
      </div>
    </div>
    <div v-if='currentMonthInfo.length' class='calendar_Button'>
      <SHButton @click='get_Current_Month(curYear,curMonth-=1)'>上月</SHButton>
      <SHButton type='primary' @click='get_Current_Month(curYear, curMonth+=1)'>下月</SHButton>
      <SHButton type='warn' @click='lunSolSH = !lunSolSH'>{{ lunSolSH ? '不' : '' }}显示阴历</SHButton>
      <SHToolTip eventType='hover'>
        <p>1.单机选择查看日历详情<span/></p>
        <p>2.双击按日期查找文章</p>
        <i slot='icon' class='fa fa-question-circle' aria-hidden='true'/>
      </SHToolTip>
      <div v-if='!lunSolSH' class='calendar_Info'>
        <p>
          {{ currentMonthInfo[selectDay].Lunar.getYearInGanZhi() + "年[" + currentMonthInfo[selectDay].Lunar.getYearShengXiao() + "] " + currentMonthInfo[selectDay].Lunar.getMonthInGanZhi() + "(" + currentMonthInfo[selectDay].Lunar.getMonthInChinese() + ")月[" + currentMonthInfo[selectDay].Lunar.getMonthShengXiao() + "] " + currentMonthInfo[selectDay].Lunar.getDayInGanZhi() + "(" + currentMonthInfo[selectDay].Lunar.getDayInChinese() + ")日" }}
        </p>
        <p v-if='currentMonthInfo[selectDay].getOtherFestivals()[0]'>{{ "阳历节日：" + currentMonthInfo[selectDay].getOtherFestivals() }}</p>
        <p v-if='currentMonthInfo[selectDay].Lunar.getOtherFestivals()[0]'>{{ "阴历节日：" + currentMonthInfo[selectDay].Lunar.getOtherFestivals() }}</p>
        <p>{{ "宜：" + currentMonthInfo[selectDay].Lunar.getDayYi() }}</p>
        <p>{{ "忌：" + currentMonthInfo[selectDay].Lunar.getDayJi() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMonthInfo: [], // 日历展示数据
      curYear: new Date().getFullYear(),
      curMonth: new Date().getMonth() + 1,
      curDay: new Date().getDate(),
      nowData: new Date(),
      selectDay: 0,
      lunSolSH: false,
      timer: null
    }
  },
  mounted() {
    this.get_Current_Month(this.curYear, this.curMonth)
  },
  methods: {
    selectDayOpar(i, c) {
      this.selectDay = i
      this.$emit('selectDayOpar', c)
    },
    get_Current_Month() {
      if (this.curMonth === 0) (this.curMonth = 12, this.curYear -= 1)
      if (this.curMonth === 13) (this.curMonth = 1, this.curYear += 1)
      const { Calendar, curYear, curMonth } = this
      const currentMonthInfo = Calendar.SolarMonth.fromYm(
        curYear,
        curMonth
      ).getDays()
      const monthLW = currentMonthInfo[0].getWeek()
      const monthNW = currentMonthInfo[currentMonthInfo.length - 1].getWeek()
      if (monthLW !== 0) {
        const lastY = curMonth === 1 ? curYear - 1 : curYear
        const lastM = curMonth === 1 ? 12 : curMonth - 1
        const lastMonthInfo = Calendar.SolarMonth.fromYm(lastY, lastM)
          .getDays()
          .slice(-monthLW)
        currentMonthInfo.unshift(...lastMonthInfo)
      }
      if (this.selectDay === 0) { this.selectDay = new Date().getDate() - 1 + monthLW }
      if (monthNW !== 6) {
        const nextY = curMonth === 12 ? curYear + 1 : curYear
        const nextM = curMonth === 12 ? 1 : curMonth + 1
        const nextMonthInfo = Calendar.SolarMonth.fromYm(nextY, nextM)
          .getDays()
          .slice(0, 6 - monthNW)
        currentMonthInfo.push(...nextMonthInfo)
      }
      currentMonthInfo.map((c) =>
        Object.assign(c, {
          Lunar: Calendar.Lunar.fromDate(
            new Date(c.getYear(), c.getMonth() - 1, c.getDay())
          )
        })
      )
      this.currentMonthInfo = currentMonthInfo
      this.$emit('countNumOpertion', this.currentMonthInfo)
      this.$nextTick(_ => {
        const tdAll = this.$refs.calendar_Item
        tdAll.forEach((c) => (c.style.opacity = 0))
        this.anmial(tdAll)
      })
    },
    // 给btn添加点击事件
    anmial(tdAll) {
      for (let i = 0; i < tdAll.length; i++) {
        this.timer = setTimeout(() => {
          this.montion(
            tdAll[i],
            '10ms',
            () => {
              tdAll[i].style.transform = 'scale(0)' // 因为函数用了call函数，所以可以用this，否则只能用imgs[i]
            },
            () => {
              // 第二步的运动从这里开始
              this.montion(tdAll[i], '1s', () => {
                tdAll[i].style.transform = 'scale(1)'
                tdAll[i].style.opacity = 1
              })
            }
          )
        }, Math.random() * 1000)
      }
      // 定时器，用来延迟时间，不让图片同步所放
    },
    // 运动函数(运动的对象，运动的时间，运动的属性函数，运动完成后要做的事情)
    montion(obj, time, doFn, callBack) {
      if (!obj) return
      obj.style.transition = time
      doFn.call(obj) // 调用函数，并且把this的指向给obj
      let called = false // 这里的原因是为了解决transitionend调用多次的bug
      obj.addEventListener(
        'transitionend',
        function() {
          if (!called) {
            callBack && callBack.call(obj) // 解决如果没有传入第四个callBack参数的问题
            called = true
          }
        },
        false
      ) // 事件三阶段，第三个参数决定是在捕获阶段还是冒泡阶段，调用此函数,false代表是在冒泡阶段
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.calendar_Table {
  width: 100%;
  color: #000;
  font-family: Simsun;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden;
  user-select: none;
  .calendar_thead {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    align-items: center;
    height: 20px;
  }
  .calendar_Tbody {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
    position: relative;
    .calendar_Item {
      width: 12%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-color: #2c2c2c00;
      border-style: solid;
      border-width: 2px;
      cursor: pointer;
      padding: 1px 0;
      &:hover {
        border-color: #919191;
      }
      .calendar_Item_Solar {
        font-size: 18px;
        font-weight: bold;
        position: relative;
        span {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: rgb(208, 85, 85);
          border-radius: 50%;
          right: 1px;
        }
      }
      .lunar_Item_Solar {
        color: #808080;
        font-family: cursive;
        font-size: 12px;
      }
    }
    .currentClass {
      border-color: #b79764;
    }
    .selectDay {
      border-color: #10006d;
    }
    .big_Month {
      position: absolute;
      font-size: 129px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #dddddd;
      -webkit-text-stroke: 8px #dddddd;
    }
  }
  .calendar_Button {
    margin-top: 5px;
    .SHButton {
      padding: 5px 14px;
      margin: 0 10px 8px 0;
    }
    .calendar_Info {
      height: 80px;
      overflow-y: scroll;
      p {
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
}
</style>
