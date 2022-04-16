<template>
  <div class="tiemline-container">
    <!-- 时间线标签内容 -->
    <div class="timeview">
      <timeview :timeDate="item" v-for="(item,index) in result" :key="index" />
    </div>
    <!-- 分页器 -->
    <pager :current="+pageData.current" :PageShow="+pageData.pageSize" :total="pageData.total"
      @pagerClick="pagerClickHandler" />
  </div>
</template>

<script lang="ts" setup>
  import {
    ref,
  } from 'vue'
  import {
    RequestInstance
  } from '@/request/request'
  import dayjs from 'dayjs'
  import timeview from './components/timeview/index.vue'
  import pager from '@/common/pager'

  const pageData = ref({
    current: '1',
    pageSize: '10',
    total: 0
  })


  const result = ref()
  initPage()

  function initPage() {
    const param = {
      current: pageData.value.current,
      pageSize: pageData.value.pageSize
    }
    RequestInstance('get', 'getTimeLine', param).then(({
      data
    }) => {
      if (data.success) {
        result.value = initResult(data.result.data)
        console.log('result=>', result.value)
        pageData.value = data.result.pageSizeInfo
      }
    })
  }

  function initResult(res) {
    const newData: any[] = []
    let itemData: any = {}
    const itemTime = res[0].createTime
    let y = dayjs(itemTime).year()
    let m = dayjs(itemTime).month() + 1

    for (let i = 0; i < res.length; i += 1) {
      const resItem = res[i].createTime
      if (y === dayjs(resItem).year() && m === (dayjs(resItem).month() + 1)) {
        if (!itemData.year || !itemData.month || !itemData.articleList) {
          itemData = {
            year: y,
            month: m,
            articleList: [],
          }
          newData.push(itemData)
        }
        itemData.articleList.push(res[i])
      } else {
        y = dayjs(resItem).year()
        m = dayjs(resItem).month() + 1
        itemData = {
          year: y,
          month: m,
          articleList: [],
        }
        newData.push(itemData)
        itemData.articleList.push(res[i])
      }
    }
    return newData
  }

  function pagerClickHandler(page: {
    currentIndex: number
  }) {
    pageData.value.current = `${page.currentIndex}`
    initPage()
  }
</script>

<style lang="stylus">
  .tiemline-container {
    background #fff
  }
</style>