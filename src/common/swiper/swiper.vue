<template>
  <div class="my-swiper" ref="swiper">
    <div class="swiper-container" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" ref="swiperWrapper">
      <slot></slot>
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
import { ref, nextTick, onMounted, reactive, toRefs, computed, watch } from 'vue'
interface Info {
  [key: string | number]: any
}

const domInfo = reactive<Info>({}) // swiper dom移动信息
const index = ref(0) // 当前swiper下标
const swiper = ref() // swiper dom
const swiperWrapper = ref() // swiper 容器dom
const moverFlag = ref(false) // 控制是否可以拖动
const showBtns = ref(true) // 是否展示左右控制按钮
const autoPlayTimer = 1000 // swiper自动播放时间
let childrens: Array<HTMLElement> // swiper容器内容子元素列表
let autoTimerId: NodeJS.Timeout
let eventTimerId: NodeJS.Timeout
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

function autoPlay() {
  autoTimerId = setInterval(() => {
    if (index.value + 1 === childrens.length) {
      index.value = 0
    } else {
      index.value += 1
    }
    animation(swiperWrapper.value, left_distance.value, 300)
  }, autoPlayTimer)
}

function leftClick(e: MouseEvent) {
  if (eventTimerId) clearTimeout(eventTimerId)
  if (autoTimerId) clearInterval(autoTimerId)
  if (index.value <= 0) {
    return
  }
  index.value -= 1
  animation(swiperWrapper.value, left_distance.value, 300)
  eventTimerId = setTimeout(() => {
    console.log('leftClick')
    autoPlay()
  }, 300)
}

function rightClick(e: MouseEvent) {
  if (eventTimerId) clearTimeout(eventTimerId)
  if (autoTimerId) clearInterval(autoTimerId)
  if (index.value + 1 === childrens.length) {
    return
  }
  index.value += 1
  animation(swiperWrapper.value, left_distance.value, 300)
  eventTimerId = setTimeout(() => {
    console.log('rightClick')
    autoPlay()
  }, 300)
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
  autoPlay()
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
