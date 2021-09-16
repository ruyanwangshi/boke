<template>
  <div class="pager-container">
    <div class="pager-left" @click="leftClick(1)">
      <i class="fa fa-angle-left" :class="{ 'page-items__threshold': current === 1 }"></i>
    </div>
    <ul class="pager-items">
      <li :class="{ 'pager-active': current === 1 }" @click="itemClick(1)">
        <div class="pager-item__style">
          1
        </div>
      </li>
      <li v-if="pagerObject.showPrevMore" @click="leftClick(2)">
        <div class="pager-item__style">
          pre
        </div>
      </li>
      <li v-for="(item, index) in pagerObject.pages" :class="{ 'pager-active': current === item }" :key="index" @click="itemClick(item)">
        <div class="pager-item__style" :class="{}">
          {{ item }}
        </div>
      </li>
      <li v-if="pagerObject.showNextMore" @click="rightClick(2)">
        <div class="pager-item__style">
          next
        </div>
      </li>
      <li :class="{ 'pager-active': current === pageSize }" v-if="pageSize > 0" @click="itemClick(pageSize)">
        <div class="pager-item__style">
          {{ pageSize }}
        </div>
      </li>
    </ul>
    <div class="pager-right" @click="rightClick(1)">
      <i class="fa fa-angle-right" :class="{ 'page-items__threshold': current === pageSize &&  pageSize > 0}"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance } from 'vue'
import { useCountPages, usePages } from './hooks'
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
      default: 1,
    },
    // 分割值
    pagerCount: {
      type: Number,
      //   validator(value: number) {
      //     return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1;
      //   },
      default: 7,
    },
  },
  setup(props, context) {
    console.log(props)
    const vm = getCurrentInstance()
    const { emit } = context
    const pageSize = ref(useCountPages(props.dataNum, props.PageShow))
    const pagerOption = reactive<CurrentObj>({ currentIndex: props.current, dataNum: props.dataNum, PageShow: props.PageShow })
    const pagerObject = usePages(props, pageSize.value)
    function itemClick(currentIndex: number) {
      pagerOption.currentIndex = currentIndex
      emit('pagerClick', pagerOption)
    }

    function leftClick(value) {
      if (pagerOption.currentIndex > 1) {
        pagerOption.currentIndex -= value
      }
      emit('pagerClick', pagerOption)
    }
    function rightClick(value) {
      if (pagerOption.currentIndex < pageSize.value) {
        pagerOption.currentIndex += value
      }
      emit('pagerClick', pagerOption)
    }

    // const pages = reactive()
    return { itemClick, leftClick, rightClick, pageSize, pagerObject }
  },
})
</script>

<style lang="stylus" scoped>
.pager-container {
    margin: 10px 0;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    // overflow: hidden;
    .pager-left, .pager-right {
        cursor: pointer;

        i {
            color: #000;
            font-weight: bold;
            font-size: 16px;
        }
    }

    .page-items__threshold {
        color: rgba(0, 0, 0, 0.2) !important;
    }

    .pager-items {
        display: flex;
        margin: 0;
        padding: 0 15px;
        justify-content: flex-start;

        li {
            font-size: 14px;
            cursor: pointer;
            font-weight: bold;
            width: 20px;
            height: 30px;
            transition: all 0.2s;

            // border: 1px solid #000;
            .pager-item__style {
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.2s;
                height: 100%;
                width: 100%;

                &:hover {
                    transform: translateY(-6px);
                    font-size: 16px;
                }
            }
        }

        .pager-active {
            color: rgba(255, 255, 255, 0.6);
            background: rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);
            text-shadow: 0 0 10px rgba(255, 255, 255, 1);
            border-radius: 2px;

            .pager-item__style {
                transition: all 0s;

                &:hover {
                    transform: translateY(0);
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
