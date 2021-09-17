<template>
  <div class="timeview-container">
    <div class="timeview-container__time"><i class="fa fa-clock-o"></i> {{ timeDate.month }} {{ timeDate.year }}</div>
    <div class="timeview-container__title">{{ timeDate.title }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    timeDate: {
      type: Array,
      default() {
        return {
          month: '9',
          year: '2021',
          title: '测试标题',
          dayArray: [
            {
              day: '4',
              
            }
          ]
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
.timeview-container__time{
  font-size: 20px;
}
.timeview-container__title{
  font-size: 30px;
}
</style>
