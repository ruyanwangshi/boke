<template>
  <div class="classContent-container" :style="{ width: `${props.contentWidth}` }">
    <div class="classContent-title" @click="clickEvent">
      <div class="title-left">
        <div>内容标题</div>
        <i class="title-icon fa fa-chevron-right"></i>
      </div>
      <div class="title-right">
        <i class="fa fa-file-text-o"></i>
        <div class="title-right_num">{{ props.typeAll }}</div>
      </div>
    </div>
    <TransitionComponent style="padding: 10px 40px">
      <div class="classContent-items" id="classContent" v-show="show">
        <div
          class="classContent-item"
          v-for="(item, index) in props.classList"
          :key="index"
        >{{ item }}</div>
      </div>
    </TransitionComponent>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, withDefaults, defineProps } from 'vue'
import TransitionComponent from '@/common/transitionComponent/index.vue'


interface Props {
  classList?: any[],
  contentWidth?: string,
  typeAll: number | string
}

const props = withDefaults(defineProps<Props>(), {
  classList: () => [],
  contentWidth: '100%',
  typeAll: 10
})

const show = ref(false)
const rotate = ref('0')

function clickEvent() {
  show.value = !show.value
  if (show.value) {
    rotate.value = '90deg'
  } else {
    rotate.value = '0'
  }
}
</script>

<style lang="stylus">
$rotate=v-bind(rotate)

.classContent-container {
    height: auto;
    background: #fff;

    .classContent-title {
        font-family: cursive;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all .2s ease-in-out;

        &:hover{
          color: #fff;
          background: rgba(0,0,0,.4);
          box-shadow: inset 0 0 10px rgba(0,0,0,.6)
        }

        .title-left{
          display: flex
          justify-content: space-between
          align-items: center
          font-size: #343434;
          font-size: 20px;
        }

        .title-icon{
          font-size: 16px;
          margin-left: 40px;
          margin-top: 4px;
          transform: rotate($rotate);
          transition: transform .3s ease-in-out;
        }

        .title-right{
          display: flex
          justify-content: flex-start
          align-items: center
          font-size: 18px;
          .title-right_num{
            font-weight: initial;
            margin-left: 10px;
          }
        }
    }

    .classContent-items {
        height: auto;
        width: 100%;
        // padding: 10px 20px;
        box-sizing: border-box

        .classContent-item{
          font-size: 14px;
          margin: 10px 0;
          cursor pointer
        }
    }
}
</style>
