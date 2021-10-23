<template>
  <div class="home-view__container">
    <div class="md-wrapper__container" v-for="(item, index) in state.htmlArray" :key="index">
      <div class="md-wrapper__title">{{ item.filename }}</div>
      <div v-html="item.text"></div>
      <div class="md-wrapper__movebtn">more</div>
    </div>
    <pager :current="state.current" :total="total" :PageShow="2" @pagerClick="pagerClickHandler" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref } from 'vue'
import { RequestInstance } from '@/request/request'
import { useMdTransform } from './hooks'
import { StateType } from './type'
import pager from '@/common/pager'

export default defineComponent({
  components: {
    pager,
  },
  async setup(props, { emit }) {
    // console.log(typeof md)
    const vm = getCurrentInstance()
    const total = ref(0)
    const state = reactive<StateType>({
      htmlArray: [],
      current: 1,
      total: 0,
    })

    try {
      initPageData(state.current)
    } catch (e) {
      console.log(e)
    }

    async function initPageData(page) {
      const params = {
        current: page,
      }
      const { data } = await RequestInstance('get', '/md', params)
      const htmlArray = useMdTransform(data.result.pageData, true)
      console.log(data.result)
      total.value = data.result.total
      console.log(state)
      state.htmlArray = htmlArray
    }

    setTimeout(() => {
      total.value = 3
    }, 1000)

    // 分页器点击事件
    function pagerClickHandler(obj: { currentIndex: number }) {
      state.current = obj.currentIndex
      initPageData(state.current)
    }
    return {
      state,
      total,
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
        max-height: 540px;
        overflow: hidden;
        border-bottom: 1px solid rgba(0,0,0,.6);
    }

    .md-wrapper__title {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .md-wrapper__movebtn{
        margin: 25px auto 0;
        width: 45px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,.6);
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 0 10px 10px rgba(0,0,0,.1);
    }
}
</style>
