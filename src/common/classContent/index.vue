<template>
  <div
    class="classContent-container"
    :style="{ width: `${contentWidth}` }"
    :class="{ 'active-border': classContent.isShow, 'hover': hover }"
    @mouseenter="mouseenter"
  >
    <div class="classContent-title" @click="clickEvent(classContent)">
      <div class="title-left">
        <div>{{ classContent.type }}</div>
        <i class="title-icon fa fa-chevron-right"></i>
      </div>
      <div class="title-right">
        <i class="fa fa-file-text-o"></i>
        <div class="title-right_num">{{ classContent.articleSize }}</div>
      </div>
    </div>
    <TransitionComponent style="padding: 0 20px;">
      <div class="classContent-items" id="classContent" v-show="classContent.isShow">
        <div
          class="classContent-item"
          v-for="(item, index) in classList"
          :key="index"
          @click="itemClick(item)"
        >{{ item.name }}</div>
      </div>
    </TransitionComponent>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, withDefaults, watch } from 'vue'
import TransitionComponent from '@/common/transitionComponent/index.vue'
import { RequestInstance } from '@/request'
import { useStore } from '@/store/module/useInfo'
import { useRouter } from 'vue-router'
import { useMdTransform } from '@/hooks/useMdTransform'



interface Props {
  classContent?: {},
  contentWidth?: string
}

interface Emits {
  (e: 'clickHandler', index: number): void
}

const props = withDefaults(defineProps<Props>(), {
  classContent() {
    return {}
  },
  contentWidth: '100%'
})

const emits = defineEmits<Emits>()

const store = useStore()
const router = useRouter()
const hover = ref(false)
const show = ref(false)
const rotate = ref('0')
const classList = ref([])


watch(props.classContent, () => {
  if (props.classContent.isShow) {
    rotate.value = '90deg'
  } else {
    rotate.value = '0'
  }
})

async function initClassContent(item) {
  const { data } = await RequestInstance('post', '/getFileList', {
    name: item.name
  })
  if (data.httpCode === 200) {
    classList.value = data.result
    return
  }
}

async function initContent(item) {
  const { data } = await RequestInstance('post', '/getFileInfo', {
    name: item.name,
    tag: props.classContent.name,
    filetype: item.type
  })
  console.log(data)
  const mdContent = useMdTransform(data.result)

  if (data.httpCode === 200) {
    // console.log(mdContent)
    store.setContent(mdContent)
    router.push({
      path: '/content'
    })
    return
  }
}

function clickEvent(item) {
  if (item.isShow) {
    emits('clickHandler', item.index)
  } else {
    initClassContent(item).then(res => {
      emits('clickHandler', item.index)
    }).catch(err => {
      console.log(err)
    })
  }

}

function mouseenter() {
  if (show.value) {
    hover.value = false
    return
  }
  hover.value = true
}

// 选择文章单个跳转
function itemClick(item) {
  initContent(item)
}
</script>

<style lang="stylus">
$rotate=v-bind(rotate)

.classContent-container {
    margin-bottom: 16px;
    height: auto;
    background: #fff;
    transition: .3s all ease-in-out

    &.active-border{
       box-shadow: 0 0px 4px rgba(0,0,0,.4)
       border-radius: 4px;
       background: rgba(0,0,0,.1)

       .classContent-title{
         color: rgba(0,0,0,.8)
       }
    }

    .classContent-title {
        font-family: cursive;
        height: 40px;
        font-size: 20px;
        padding: 20px 20px;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all .2s ease-in-out;
        box-sizing: border-box
        background: rgba(0,0,0,.1)
        color: rgba(0,0,0,.4)
        text-shadow: inset 0 1px 1px rgba(0,0,0,.3)

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

        .classContent-item{
          font-size: 14px;
          cursor pointer
          padding: 10px 0;
          box-sizing: border-box;
        }
    }
}
</style>
