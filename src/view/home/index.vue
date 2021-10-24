<template>
  <div class="home-view__container" v-loading='loading'>
    <div class="md-wrapper__item" v-for="(item, index) in state.htmlArray" :key="index" >
      <div class="md-wrapper__title">{{ item.filename }}</div>
      <div class="md-wrapper__created">{{ getTime(item.createTime) }}</div>
      <div class="md-wrapper__label" v-for="(labelItem, indey) in item.label" :key="indey">
        <div class="label-item">{{ labelItem }}</div>
      </div>
    </div>
    <pager :current="state.current" :total="total" :PageShow="2" @pagerClick="pagerClickHandler" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, nextTick } from 'vue'
import { RequestInstance } from '@/request/request'
import { useMdTransform } from './hooks'
import { StateType } from './type'
import pager from '@/common/pager'
import { getTime } from '@/util/format'

export default defineComponent({
  components: {
    pager,
  },
  async setup(props, { emit }) {
    // console.log(typeof md)
    const vm = getCurrentInstance()
    const total = ref(0)
    const loading = ref(true)
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
      loading.value = true
      const { data } = await RequestInstance('get', '/md', params)
      const htmlArray = useMdTransform(data.result.pageData, true)
      console.log(htmlArray)
      total.value = data.result.total
      state.htmlArray = htmlArray
      loading.value = false
    }

    // 分页器点击事件
    function pagerClickHandler(obj: { currentIndex: number }) {
      state.current = obj.currentIndex
      initPageData(state.current)
    }

    return {
      state,
      total,
      pagerClickHandler,
      loading,
      getTime
    }
  },
})
</script>

<style lang="stylus" scoped>
.home-view__container {
    background: #fff;
    overflow: hidden;

    .active_style {
        max-height: 400px;
        height: 400px;
        position: relative;
        overflow: hidden;

        &:before {
            content: '';
            position: absolute;
            height: 30px;
            bottom: 0;
            right: 0;
            width: 100%;
            background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1));
        }
    }

    .md-wrapper__item {
        padding: 10px;
        margin-bottom: 10px;
        background: red;
        cursor: pointer;
    }

    .md-wrapper__title {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .md-wrapper__label {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;

        .label-item {
            cursor: pointer;
            vertical-align: middle;
            user-select: none;

            &:before {
                content: '#';
                visibility: hidden;
                margin-right: 4px;
            }

            &:hover:before {
                color: red;
                visibility: visible;
            }
        }
    }

    .md-wrapper__movebtn {
        margin: 25px auto 0;
        width: 45px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        color: #fff;
        box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.4);
    }
}
</style>
