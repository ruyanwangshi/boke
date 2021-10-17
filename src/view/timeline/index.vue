<template>
  <div class="tiemline-container">
    <!-- 时间线标签内容 -->
    <div class="timeview">
      <timeview />
    </div>
    <!-- 分页器 -->
    <pager :current="current" :total="40" @pagerClick="pagerClickHandler" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, onUnmounted } from 'vue'
import Nprogress from 'nprogress'

import timeview from './components/timeview/index.vue'
import pager from '@/common/pager'

export default defineComponent({
  components: { timeview, pager },
  props: {
    title: Boolean,
  },
  async setup(props, { emit }) {
    const current = ref(1)
    onMounted(async () => {
      await nextTick()
      setTimeout(() => {
        emit('update:title', true)
        Nprogress.done()
      }, 3000)
    })

    onUnmounted(() => {
      emit('update:title', false)
    })

    function pagerClickHandler(page: { currentIndex: number }) {
      current.value = page.currentIndex
    }

    return { current, pagerClickHandler }
  },
})
</script>

<style lang="stylus">
.tiemline-container{
  background #fff
}
</style>
