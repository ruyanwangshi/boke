<template>
  <div class="timeview-container">
    <div class="timeview-container__time"><i class="fa fa-clock-o"></i> {{ timeDate.month }}月.{{ timeDate.year }}年</div>
    <div class="timeview-container__title-item" v-for="(item, index) in timeDate.dayArray" :key="index">
      <div class="item-time">
        <i class="fa fa-calendar-minus-o"></i>
        <div class="time-text">{{ useInitDay(item.day) }}</div>
      </div>
      <div class="item-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useInitDay } from '@/hooks/Apphooks'

export default defineComponent({
  props: {
    timeDate: {
      type: Array,
      default() {
        return {
          month: '9',
          year: '2021',
          dayArray: [
            {
              day: '4',
              title: '测试标题1',
            },
            {
              day: '10',
              title: '测试标题2',
            },
          ],
        }
      },
    },
  },
  setup(props, ctx) {
    return {
      props,
      useInitDay,
    }
  },
})
</script>

<style lang="stylus" scoped>
.timeview-container{
  margin: 20px auto;
  box-sizing: border-box;
  padding: 0 100px;
}
.timeview-container__time{
  text-align center
  font-size: 20px;
  margin-bottom: 10px;
}
.timeview-container__title-item{
  font-size: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  font-size: 20px;
  box-sizing: border-box;
  .item-time{
    width: 100px;
    text-align: right;
    color: #242424;
    margin-right: 40px;
    font-family: fangsong;
    display: flex;
    // align-items: center;
    i{
      margin-top: 4px;
      margin-right: 8px;
      font-size: 12px;
      color: #804040;
    }


  }
  .item-title{
    box-sizing: border-box;
    border: 1px solid #fff;
    cursor: pointer;
    transition: all .2s;
    font-size: 18px;
    font-weight:bold;
    color: #666666;
    font-family: fangsong;


    &:hover{
      border-bottom: 1px solid #808080;
    }
  }
}
</style>
