<template>
  <div class="home-view__container">
    <div class="md-wrapper__container" v-for="(item, index) in state.htmlArray" :key="index">
      <div class="md-wrapper__title">{{ item.filename }}</div>
      <div v-html="item.text"></div>
    </div>
    <pager :current="state.current" :total="40" @pagerClick="pagerClickHandler" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, onMounted, nextTick } from 'vue'
import { RequestInstance } from '@/request/request'
import { useMdTransform } from './hooks'
import { StateType } from './type'

import pager, { CurrentObj } from '@/common/pager'
import getBodyHeight from '@/hooks/getBody'

export default defineComponent({
  components: {
    pager,
  },
  props: {
    viewHeight: Number,
  },
  async setup(props, { emit }) {
    // console.log(typeof md)
    const vm = getCurrentInstance()
    const state = reactive<StateType>({
      htmlArray: [],
      current: 1,
    })

    onMounted(async () => {
      await nextTick()
      const height = await getBodyHeight()
      emit('update:viewHeight', height)
    })

    try {
      const { data } = await RequestInstance('get', '/md')
      const htmlArray = useMdTransform(data.result, true)
      state.htmlArray.push(...htmlArray)
    } catch (e) {
      console.log(e)
    }

    // 分页器点击事件
    function pagerClickHandler(obj: CurrentObj) {
      state.current = obj.currentIndex
    }
    return {
      state,
      pagerClickHandler,
    }
  },
})
</script>

<style lang="stylus" scoped>
.home-view__container {
    background: #fff;
    overflow: hidden;

    .md-wrapper__container {
        padding: 10px;
    }

    .md-wrapper__title {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
    }
}
</style>
