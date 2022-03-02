<template>
  <div class="my-swiper" ref="swiper">
    <div class="swiper-container" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" ref="swiperWrapper">
      <test></test>
    </div>

    <template v-if="showBtns">
      <div class="btn-style left-btn" @click="leftClick">{{ '<' }}</div>
      <div class="btn-style right-btn" @click="rightClick">{{ '>' }}</div>
    </template>

    <!-- <template>
      <div class="my-swiper-pagination">
        <div class="my-swiper-pagination_item" ></div>
      </div>
    </template> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick, onMounted, reactive, toRefs, computed, watch, useSlots, getCurrentInstance, h, render } from 'vue'
interface Info {
  [key: string | number]: any
}
const childrenList = useSlots().default((arg) => arg)[0]

// console.log('internalInstance=>', useSlots().default((arg) => arg))

function test() {
  return h(childrenList)
}
const internalInstance = getCurrentInstance()
const domInfo = reactive<Info>({}) // swiper dom移动信息
const isLoop = ref(true) // 是否开启循环播放
const isAutoPlay = ref(false) // 是否开启循环播放
const damping = ref(2) // 左右拖动阻尼系数
const index = ref(0) // 当前swiper下标
const swiper = ref<Element>() // swiper dom
const swiperWrapper = ref() // swiper 容器dom
const moverFlag = ref(false) // 控制是否可以拖动
const showBtns = ref(true) // 是否展示左右控制按钮
const autoPlayTimer = 1000 // swiper自动播放时间
let childrens: Array<any> // swiper容器内容子元素列表
let autoTimerId: NodeJS.Timeout // 自动播放循环定时器timerId
let eventTimerId: NodeJS.Timeout // 延迟自动播放的单次定时器timerId
const left_distance = computed(() => domInfo.value.Width * index.value * -1)


onMounted(async () => {
  try {
    await nextTick()
    initSwiper()
  } catch (e) {
    console.log(e)
  }
})

watch(
  () => index.value,
  () => {
    Object.assign(domInfo.value, {
      step: left_distance.value,
    })
  }
)

// 初始化swiper所需配置项
function initSwiper() {
  const { offsetLeft, offsetWidth } = swiperWrapper.value
  const middle = offsetWidth / damping.value
  domInfo.value = {
    left: offsetLeft,
    Width: offsetWidth,
    middle: middle,
    step: 0,
  }
  setStyle(swiperWrapper.value, {
    transform: 'translate3d(0px,0,0)',
  })
  childrens = [...swiperWrapper.value.children]
  if(isLoop.value) {
    // childrens.push(childrens[0])
    // childrens.unshift(...childrens.slice(childrens.length - 1, childrens.length))
    // console.log(childrens)
  }
  console.log('childrens')
  childrens.forEach((element) => {
    setStyle(element, {
      width: `${offsetWidth}px`,
    })
  })
  autoPlay()
}

function autoPlay() {
  if(!isAutoPlay.value) return
  autoTimerId = setInterval(() => {
    if (index.value + 1 === childrens.length) {
      index.value = 0
    } else {
      index.value += 1
    }
    animation(swiperWrapper.value, left_distance.value, 300)
  }, autoPlayTimer)
}

// swiper 左边控制按钮
function leftClick(e: MouseEvent) {
  btnControlAnimation(() => index.value <= 0, -1)
}
// swiper 右边控制按钮
function rightClick(e: MouseEvent) {
  btnControlAnimation(() => index.value + 1 === childrens.length, 1)
}

// swiper 俩侧控制动画逻辑
function btnControlAnimation(fn: () => Boolean, step: number, suspendTimer: number = 300) {
  if (eventTimerId) clearTimeout(eventTimerId)
  if (autoTimerId) clearInterval(autoTimerId)
  if (fn()) {
    eventTimerId = setTimeout(() => {
      autoPlay()
    }, suspendTimer)
    return
  }
  index.value += step
  animation(swiperWrapper.value, left_distance.value, suspendTimer)
  eventTimerId = setTimeout(() => {
    autoPlay()
  }, suspendTimer)
}



function mousedown(e) {
  if (eventTimerId) clearTimeout(eventTimerId)
  if (autoTimerId) clearInterval(autoTimerId)
  moverFlag.value = true
  const start = e.clientX
  Object.assign(domInfo.value, {
    start: start,
  })
}

function mousemove(e) {
  if (moverFlag.value) {
    const { start } = domInfo.value
    const x = e.clientX - start
    let offsetLeft: number
    const direction = x > 0 ? 'right' : 'left'
    offsetLeft = domInfo.value.step + x / 3
    Object.assign(domInfo.value, {
      x: x,
      offsetLeft: offsetLeft,
      direction: direction,
    })
    animation(swiperWrapper.value, offsetLeft)
  }
}

function mouseup(e) {
  moverFlag.value = false
  const { x, direction } = domInfo.value
  if (typeof x === undefined) return
  if (direction === 'right') {
    doRight()
  } else if (direction === 'left') {
    doLeft()
  }
  animation(swiperWrapper.value, left_distance.value, 300)
  eventTimerId = setTimeout(() => {
    autoPlay()
  }, 300)
}

function doLeft() {
  const { x, middle } = domInfo.value
  const addFlag = index.value + 1 !== childrens.length && x * -1 > middle
  if (addFlag) {
    index.value += 1
  }
}

function doRight() {
  const { x, middle } = domInfo.value
  const flag = !!(index.value > 0 && x > middle)
  if (flag) {
    index.value -= 1
  }
}

function animation(e: HTMLElement, left: string | number, speed = 0) {
  setStyle(e, {
    'transition-duration': `${speed}ms`,
    transform: `translate3d(${left}px,0,0)`,
  })
}

function setStyle(e: HTMLElement, styles: Object) {
  for (const key in styles) {
    e.style[key] = styles[key]
  }
}
</script>
<style lang="stylus">
.my-swiper{
    width: 100%;
    height: 100%;
    overflow hidden
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    user-select none
    .swiper-container{
        position relative
        width: 100%;
        height: 100%
        display: flex;
        transition-property: transform;
        cursor pointer
    }
    .btn-style{
      position: absolute
      top: 50%;
      color: #fff;
      font-size: 20px;
      cursor pointer
    }
    .left-btn{
      left: 0;
    }
    .right-btn{
      right: 0;
    }
}
</style>
