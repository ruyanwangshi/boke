<template>
  <div class="my-swiper" ref="swiper">
    <div class="swiper-container" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" ref="swiperWrapper">
      <slot></slot>
    </div>
    <div class="btn-style left-btn" @click="leftClick">{{ '<' }}</div>
    <div class="btn-style right-btn" @click="rightClick">{{ '>' }}</div>
    <!-- <div class="my-swiper"></div> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, useSlots, Slots, nextTick, onMounted, reactive, toRefs } from 'vue'
interface Info {
  [key: string | number]: any
}

const domInfo = reactive<Info>({})
const index = ref(0)
const swiper = ref()
const swiperWrapper = ref()
const moverFlag = ref(false)
const slots = useSlots()
let childrens

onMounted(async () => {
  try {
    await nextTick()
    initSwiper()
  } catch (e) {
    console.log(e)
  }
})

function leftClick(e: MouseEvent) {
  console.log(e)
}
function rightClick(e: MouseEvent) {
  console.log(e)
}

function initSwiper() {
  const { offsetLeft, offsetWidth } = swiperWrapper.value
  const middle = offsetWidth / 3
  domInfo.value = {
    left: offsetLeft,
    Width: offsetWidth,
    middle: middle,
    step: 0,
  }
  setStyle(swiperWrapper.value, {
    transform: 'translate3d(0px,0,0)',
  })
  childrens = swiperWrapper.value.children
  childrens.forEach((element) => {
    setStyle(element, {
      width: `${offsetWidth}px`,
    })
  })
}

function mousedown(e) {
  moverFlag.value = true
  const start = e.clientX
  console.log(e)
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
    // console.log(offsetLeft)
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
  let left
  const { x, direction } = domInfo.value
  if (typeof x === undefined) return
  if (direction === 'right') {
    left = doRight()
  } else if (direction === 'left') {
    left = doLeft()
  }
  Object.assign(domInfo.value, {
    step: left,
  })
  animation(swiperWrapper.value, left, 300)
}

function doLeft() {
  const { x, middle, step, Width } = domInfo.value
  const addFlag = index.value + 1 !== childrens.length && x * -1 > middle
  if (addFlag) {
    index.value += 1
    return Width * index.value * -1
  }
  return step
}

function doRight() {
  const { x, middle, step, Width } = domInfo.value
  const flag = !!(index.value > 0 && x > middle)
  if (flag) {
    index.value -= 1
    return Width * index.value * -1
  }
  return step
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
