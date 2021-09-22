<template>
  <div class="timeview-container">
    <div class="timeview-container__time"><i class="fa fa-clock-o"></i> {{ timeDate.month }}月 - {{ timeDate.year }}年</div>
    <div class="timeview-container__title">{{ timeDate.title }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    timeDate: {
      type: Object,
      default() {
        return {
          month: '9',
          year: '2021',
          title: '测试标题',
          dayArray: [
            {
              day: '4',
            },
          ],
        }
      },
    },
  },
  setup(props, ctx) {
    return {
      props,
    }
  },
})
</script>

<style lang="stylus" scoped>
.timeview-container{
  margin: 10px auto;
}
.timeview-container__time{
  text-align center
  font-size: 20px;
}
.timeview-container__title{
  font-size: 30px;
}
</style>
