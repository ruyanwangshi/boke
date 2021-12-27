<template>
  <div class="classContent-container" :style="{ width: `${props.contentWidth}` }">
    <div class="classContent-title" @click="clickEvent">
      <div class="title-left">
        <div>内容标题</div>
        <i class="title-icon fa fa-chevron-right"></i>
      </div>
      <div class="title-right">
        <i class="fa fa-file-text-o"></i>
      </div>
    </div>
    <TransitionComponent style="padding: 10px 20px">
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
  contentWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  classList: () => [],
  contentWidth: '100%',
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
        font-size: 26px;
        font-weight: bold;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 8px;
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: red;

        .title-left{
          display: flex
          justify-content: space-between
          align-items: center
        }

        .title-icon{
          font-size: 20px;
          margin-left: 20px;
          margin-top: 4px;
          transform: rotate($rotate);
          transition: all .3s ease-in-out;
        }
    }

    .classContent-items {
        height: auto;
        width: 100%;
        // padding: 10px 20px;
        box-sizing: border-box
        background: green
    }
}
</style>
