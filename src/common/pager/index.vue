<template>
  <div class="pager-container">
    <div class="pager-left" @click="leftClick">
      <i class="fa fa-angle-left" :class="{ 'page-items__threshold': current === 1 }"></i>
    </div>
    <ul class="pager-items">
      <li @click="firstItemClick(1)">
        <div class="pager-item__style" :class="{}">
          1
        </div>
      </li>
      <li v-for="(item, index) in pagers" :class="{ 'pager-active': current === item }" :key="index" @click="itemClick(item)">
        <div class="pager-item__style" :class="{}">
          {{ item }}
        </div>
      </li>
    </ul>
    <div class="pager-right" @click="rightClick">
      <i class="fa fa-angle-right" :class="{ 'page-items__threshold': current === pageSize }"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useCountPages } from './hooks/useCountPages'
import { CurrentObj } from './type'
export { CurrentObj }
import _ from 'lodash'
export default defineComponent({
  props: {
    // 当前页
    current: {
      type: Number,
      default: 1,
    },
    // 数据总数
    dataNum: {
      type: Number,
      default: 0,
    },
    // 每页展示多少条数据来进行计算分页数
    PageShow: {
      type: Number,
      default: 0,
    },
    // 分割值
    separateValues: {
      type: Number,
      default: 5,
    },
    start: {
      type: Number,
      default: 10,
    },
  },
  setup(props, context) {
    const { emit } = context
    const pageSize = ref(useCountPages(22, 1))
    // const pagerCount = pageSize
    const separateValues = ref(props.separateValues)
    const pagerOption = reactive<CurrentObj>({ currentIndex: props.current, dataNum: props.dataNum, PageShow: props.PageShow })
    const countNum = _.range(1, pageSize.value + 1)
    let array: number[] = []
    let index: number

    const pagers = computed(() => {
      // const offset = Math.floor(10 / 2) - 1

      // // for (let i: number = props.current - offset; i <= props.current + offset; i++) {
      // for (let i: number = props.current + 1; i <= props.current + offset; i++) {
      //     array.push(i)
      // }
      if (countNum.length < 4) return countNum
      if (props.current === countNum.length) {
        array = countNum.slice(props.current - 4, countNum.length)
      } else if (countNum.length - props.current < 4) {
        array = countNum.slice(countNum.length - 4, countNum.length)
      } else {
        array = countNum.slice(props.current, props.current + 4)
      }
      console.log(array)
      return array
    })
    function itemClick(currentIndex: number) {
      console.log()
      if (pagers.value.length % 2 === 0) {
        index = pagers.value.length / 2
      } else {
        index = Math.ceil(pagers.value.length / 2)
      }
      console.log(currentIndex)
      console.log(pagers.value[index])
      if (currentIndex >= pagers.value[index]) {
        pagerOption.currentIndex = currentIndex
        console.log(currentIndex)
      } else {
        pagerOption.currentIndex = currentIndex - 1
      }
    //   console.log()
    //   pagerOption.currentIndex = currentIndex
      emit('pagerClick', pagerOption)
    }

    function leftClick() {
      if (pagerOption.currentIndex > 1) {
        pagerOption.currentIndex -= 1
      }
      if (pageSize > separateValues) {
      }
      emit('pagerClick', pagerOption)
    }
    function rightClick() {
      if (pagerOption.currentIndex < pageSize.value) {
        pagerOption.currentIndex += 1
      }
      // if(pageSize > separateValues) {
      //     countNum.unshift
      // }
      emit('pagerClick', pagerOption)
    }
    // const pages = reactive()
    return { pagers, itemClick, leftClick, rightClick, pageSize, separateValues }
  },
})
</script>

<style lang="stylus">
@import './stylus.scss';
</style>
