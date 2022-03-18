<template>
  <div class="my-swiper" ref="swiper">
    <div
      class="swiper-container"
      :style="styleValue"
      @mousedown="mousedown"
      @mousemove="mousemove"
      @mouseup="mouseup"
      ref="swiperWrapper"
    >
      <renderList></renderList>
    </div>

    <template v-if="showBtns">
      <div class="btn-style left-btn" @click="leftClick">{{ '<' }}</div>
      <div class="btn-style right-btn" @click="rightClick">{{ '>' }}</div>
    </template>

    <!-- <template>
      <div class="my-swiper-pagination">
        <div class="my-swiper-pagination_item" ></div>
      </div>
    </template>-->
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick, onMounted, reactive, toRefs, computed, watch, useSlots, getCurrentInstance, h, render } from 'vue'
interface Info {
  [key: string | number]: any
}

const internalInstance = getCurrentInstance()
const childrenList = (useSlots() as any).default((arg) => arg)[0]
const domInfo = reactive<Info>({}) // swiper dom移动信息
const isLoop = ref(true) // 是否开启循环播放
const isAutoPlay = ref(false) // 是否开启循环播放
const damping = ref(2) // 左右拖动阻尼系数
const swiper = ref<Element>() // swiper dom
const swiperWrapper = ref() // swiper 容器dom
const moverFlag = ref(false) // 控制是否可以拖动
const startFlag = ref(false) // 控制是否可以拖动
const showBtns = ref(true) // 是否展示左右控制按钮
const autoPlayTimer = 1000 // swiper自动播放时间

const point = computed(() => (isLoop ? 1 : 0)) // swiper滚动起点
const end = computed(() => (isLoop ? childrenList.children.length - 2 : childrenList.children.length - 1)) // swiper滚动终点
const index = ref(0) // 当前swiper下标
let childrens: Array<any> // swiper容器内容子元素列表
let autoTimerId: NodeJS.Timeout // 自动播放循环定时器timerId
let eventTimerId: NodeJS.Timeout // 延迟自动播放的单次定时器timerId
const leftOffset = ref()

const styleValue = computed(() => {
  return ({
    'transition-duration': `${moverFlag.value ? 500 : 0}ms`,
    transform: `translate3d(${leftOffset.value}px,0,0)`,
  })
})

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
      step: leftOffset.value,
    })
    if (isAutoPlay.value) {
      eventTimerId = setTimeout(() => {
        autoPlay()
      }, 300)
    }
  }
)

function renderList() {
  const loop = isLoop.value
  if (!loop) {
    return h(childrenList)
  }
  const childrens = childrenList.children || []
  const childfrist = childrens[0]
  const childlast = childrens[childrens.length - 1]
  childrens.unshift(childlast)
  childrens.push(childfrist)
  return h(childrenList)
}

// 初始化swiper所需配置项
function initSwiper() {
  const { offsetLeft, offsetWidth } = swiperWrapper.value
  const step = -offsetWidth
  const middle = offsetWidth / damping.value
  domInfo.value = {
    left: offsetLeft,
    Width: offsetWidth,
    middle: middle,
    step: step,
  }
  childrens = swiperWrapper.value.children
  childrens.forEach((element) => {
    setStyle(element, {
      width: `${offsetWidth}px`
    })
  })
  leftOffset.value = -offsetWidth
  autoPlay()
}

function autoPlay() {
  if (!isAutoPlay.value) return
  autoTimerId = setInterval(() => {
    if (index.value === end.value) {
      index.value = point.value
    } else {
      index.value += 1
    }
    animation({ index: index.value })
  }, autoPlayTimer)
}

// swiper 左边控制按钮
function leftClick(e: MouseEvent) {
  // btnControlAnimation(() => index.value <= point.value, -1)
  moverFlag.value = true
  const loop = isLoop.value
  setStyle(swiperWrapper.value, {
    transitionProperty: 'inherit',
  })
  leftOffset.value = leftOffset.value + domInfo.value.Width
  if (loop && index.value === 0) {
    index.value = end.value - 1
    setTimeout(() => {
      setStyle(swiperWrapper.value, {
        transitionProperty: 'none',
      })
      leftOffset.value = -end.value * domInfo.value.Width
    }, 500)
  } else {
    index.value--
  }
}
// swiper 右边控制按钮
function rightClick(e: MouseEvent) {
  // btnControlAnimation(() => index.value === end.value, 1)

  moverFlag.value = true
  const loop = isLoop.value
  setStyle(swiperWrapper.value, {
    transitionProperty: 'inherit',
  })
  leftOffset.value = leftOffset.value - domInfo.value.Width
  if (loop && index.value === (end.value - 1)) {
    index.value = 0
    setTimeout(() => {
      setStyle(swiperWrapper.value, {
        transitionProperty: 'none',
      })
      leftOffset.value = -domInfo.value.Width
    }, 500)
  } else {
    index.value++
  }
}

// swiper 俩侧控制动画逻辑
function btnControlAnimation(fn: () => Boolean, step: number) {
  if (eventTimerId) clearTimeout(eventTimerId)
  if (autoTimerId) clearInterval(autoTimerId)
  if (!isLoop.value && fn()) {
    return
  }
  isBoundary(step)
}



function isBoundary(step: number) {
  moverFlag.value = true

  const loop = isLoop.value
  if (step < 0) {
    leftOffset.value = leftOffset.value + domInfo.value.Width
  } else {
    leftOffset.value = leftOffset.value - domInfo.value.Width
  }

  if (loop && index.value === 0) {
    index.value = end.value - 1
    setTimeout(() => {
      setStyle(swiperWrapper.value, {
        transitionProperty: 'none',
        'transition-duration': `${0}ms`,
        // transform: `translate3d(${index.value * domInfo.value.Width * -1}px,0,0)`,
      })
      leftOffset.value = -end.value * domInfo.value.Width
    }, 0)
  } else if (loop && index.value === end.value) {
    index.value = 0
    setTimeout(() => {
      setStyle(swiperWrapper.value, {
        transitionProperty: 'none',
        'transition-duration': `${0}ms`,
        transform: `translate3d(${index.value * domInfo.value.Width * -1}px,0,0)`,
      })
    }, 0)
  }
  index.value += step
  console.log(index.value)
}

function mousedown(e) {
  if (eventTimerId) clearTimeout(eventTimerId)
  if (autoTimerId) clearInterval(autoTimerId)
  moverFlag.value = true
  startFlag.value = true
  const start = e.clientX
  if (index.value === 0) {
    setStyle(swiperWrapper.value, {
      transitionProperty: 'none',
    })
    index.value = end.value - 1
    leftOffset.value = -(end.value + 1) * domInfo.value.Width
  } else if (index.value === end.value - 1) {
    setStyle(swiperWrapper.value, {
      transitionProperty: 'none',
    })
    index.value = 0
    leftOffset.value = -domInfo.value.Width
  }
  console.log('e.clientX', e.clientX)
  Object.assign(domInfo.value, {
    start: start,
  })
}

function mousemove(e) {
  if (startFlag.value) {
    setStyle(swiperWrapper.value, {
      transitionProperty: 'inherit',
    })
    moverFlag.value = false
    const { start, step } = domInfo.value
    const x = e.clientX - start
    console.log(e.clientX)
    let offsetLeft: number
    const direction = x > 0 ? 'right' : 'left'
    offsetLeft = step + x / 3
    Object.assign(domInfo.value, {
      x: x,
      offsetLeft: offsetLeft,
      direction: direction,
    })
    animation({ x: offsetLeft })
  }
}

function mouseup(e) {
  moverFlag.value = true
  startFlag.value = false
  const { x, direction, step, Width } = domInfo.value
  let flag = false
  console.log('x=>', x)
  if (typeof x === undefined) return
  if (direction === 'right') {
    flag = doRight()
  } else if (direction === 'left') {
    flag = doLeft()
  }
  animation({ x: flag ? leftOffset.value : step })
  eventTimerId = setTimeout(() => {
    autoPlay()
  }, 300)
}

function doLeft() {
  const { x, middle, step } = domInfo.value
  const left = index.value <= end.value
  const addFlag = x * -1 > middle
  const loop = isLoop.value
  if (addFlag && left) {
    setStyle(swiperWrapper.value, {
      transitionProperty: 'inherit',
    })
    leftOffset.value = step + domInfo.value.Width
    if (loop && index.value === 0) {
      index.value = end.value - 1
      setTimeout(() => {
        setStyle(swiperWrapper.value, {
          transitionProperty: 'none',
        })
        leftOffset.value = -end.value * domInfo.value.Width
      }, 500)
    } else {
      index.value--
    }
    return true
  }
  return false
}

function doRight() {
  const { x, middle, step } = domInfo.value
  const right = index.value >= point.value
  const addFlag = x > middle
  const loop = isLoop.value
  if (addFlag && right) {
    setStyle(swiperWrapper.value, {
      transitionProperty: 'inherit',
    })
    leftOffset.value = step - domInfo.value.Width
    if (loop && index.value === (end.value - 1)) {
      index.value = 0
      setTimeout(() => {
        setStyle(swiperWrapper.value, {
          transitionProperty: 'none',
        })
        leftOffset.value = -domInfo.value.Width
      }, 500)
    } else {
      index.value++
    }
    return true
  }
  return false
}

function animation({ x = 0, index }: { x?: number, index?: number }) {
  if (typeof index === 'number') {
    leftOffset.value = index * domInfo.value.Width * -1
    Object.assign(domInfo.value, {
      step: leftOffset.value
    })
  } else {
    leftOffset.value = x
  }

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
