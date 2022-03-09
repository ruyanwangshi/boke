<template>
  <div class="my-swiper" ref="swiper">
    <div
      class="swiper-container"
      @mousedown="mousedown"
      @mousemove="mousemove"
      @mouseup="mouseup"
      ref="swiperWrapper"
      :style="offsetVal"
    >
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
    </template>-->
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick, onMounted, reactive, toRefs, computed, watch, useSlots, getCurrentInstance, provide, render } from 'vue'
interface Info {
  [key: string | number]: any
}

const SWIPER_KEY = 'my-swiper'
const internalInstance = getCurrentInstance()
const childrenList = (useSlots() as any).default((arg) => arg)[0]
const domInfo = reactive<Info>({}) // swiper dom移动信息
const isLoop = ref(true) // 是否开启循环播放
const isAutoPlay = ref(false) // 是否开启循环播放
const damping = ref(2) // 左右拖动阻尼系数
const swiper = ref<Element>() // swiper dom
const swiperWrapper = ref() // swiper 容器dom
const moverFlag = ref(false) // 控制是否可以拖动
const showBtns = ref(true) // 是否展示左右控制按钮
const autoPlayTimer = 1000 // swiper自动播放时间

const startTimer = ref(0)// swiper滚动终点
const index = ref(0) // 当前swiper下标
let autoTimerId: NodeJS.Timeout // 自动播放循环定时器timerId
let eventTimerId: NodeJS.Timeout // 延迟自动播放的单次定时器timerId
// const left_distance = computed(() => {
//   if (domInfo.value) {
//     return domInfo.value.Width * index.value * -1
//   }
//   return 0
// })

const left_distance = ref(0)

const offsetVal = computed(() => ({
  'transition-duration': `${moverFlag.value ? 0 : 300}ms`,
  transform: `translate3d(${left_distance.value}px,0,0)`,
}))


const { childrens, linkChildren } = useChildren(SWIPER_KEY)
linkChildren({})

const count = computed(() => childrens.length)
const minWidth = computed(() => domInfo.value.Width - domInfo.value.Width * childrens.length)
const allWidth = computed(() => domInfo.value.Width * childrens.length)
const minOffset = computed(() => {
  if (domInfo.value.width) {
    return domInfo.value.width * childrens.length
  }
  return 0
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
    if (isAutoPlay.value) {
      eventTimerId = setTimeout(() => {
        autoPlay()
      }, 300)
    }
  }
)

// 初始化swiper所需配置项
function initSwiper() {
  const { offsetLeft, offsetWidth } = swiperWrapper.value
  const middle = offsetWidth / damping.value
  let childrens = []
  domInfo.value = {
    left: offsetLeft,
    Width: offsetWidth,
    middle: middle
  }
  childrens = swiperWrapper.value.children
  childrens.forEach((element) => {
    setStyle(element, {
      width: `${offsetWidth}px`,
    })
  })
  autoPlay()
}

function autoPlay() {
  if (!isAutoPlay.value) return
  autoTimerId = setInterval(() => {
    if (index.value === count.value) {
      index.value = 0
    } else {
      index.value += 1
    }
    // animation(swiperWrapper.value, left_distance.value, 300)
  }, autoPlayTimer)
}

// swiper 左边控制按钮
function leftClick(e: MouseEvent) {
  btnControlAnimation(() => index.value <= 0, 1, -1)
}
// swiper 右边控制按钮
function rightClick(e: MouseEvent) {
  btnControlAnimation(() => index.value === count.value, -1, 1)
}

// swiper 俩侧控制动画逻辑
function btnControlAnimation(fn: () => Boolean, step: number, direction: number) {
  if (eventTimerId) clearTimeout(eventTimerId)
  if (autoTimerId) clearInterval(autoTimerId)
  if (!isLoop.value && fn()) {
    return
  }

  if(fn()) {

  }

  let currendIndex
  console.log(initIndex(count.value * direction));
  index.value += step
  setIsLoop({ x: 0 })
  // if (index.value <= 0) {
  // //   // if (targetOffset !== minWidth.value) {
  // //   const outRightBound = targetOffset < minWidth.value
  // //   childrens[0].setOffset(outRightBound ? allWidth.value : 0)
  // // // }
  // // if (childrens[childrens.length - 1] && targetOffset !== 0) {
  // //   const outLeftBound = targetOffset > 0
  // //   childrens[childrens.length - 1].setOffset(outLeftBound ? -allWidth.value : 0)
  // // }
  //   childrens[0].setOffset(allWidth.value)
  // } else if (index.value >= count.value) {
  //   childrens[childrens.length - 1].setOffset(-allWidth.value)
  // } else {
  //   childrens[0].setOffset(0)
  //   childrens[childrens.length - 1].setOffset(0)
  // }
  // childrens[index.value].setOffset(index.value * domInfo.value.Width * direction)
  
  console.log('count.value=>', count.value * direction)
  console.log('index.value=>', index.value)
  console.log('currendIndex=>', currendIndex)
  left_distance.value = index.value * domInfo.value.Width * direction
  moverFlag.value = false;
}

function initIndex(countNumber:number) {
  return Math.min(Math.max(index.value + countNumber, -1), count.value)
}

function useChildren(key: string): { childrens: any[], linkChildren: (value?: any) => void } {
  const parent = internalInstance
  const internalChildren = reactive<any>([]);
  const childrens = reactive<any>([])
  const linkChildren = (value?: any) => {
    const link = (child: any) => {
      internalChildren.push(child);
      childrens.push(child.proxy);
    }
    const unlink = (child) => {
      const index = internalChildren.indexOf(child);
      childrens.splice(index, 1);
      internalChildren.splice(index, 1);
    };
    provide(key, Object.assign({
      link,
      unlink,
      children: childrens,
      internalChildren
    }, value))
  }
  return {
    childrens,
    linkChildren
  }
}

function stopTimerOut() {
  if (eventTimerId) clearTimeout(eventTimerId)
  if (autoTimerId) clearInterval(autoTimerId)
}

function mousedown(e) {
  stopTimerOut()
  startTimer.value = Date.now()
  correctPosition()
  const start = e.clientX
  Object.assign(domInfo.value, {
    start: start,
  })
}

const correctPosition = () => {
  moverFlag.value = true;
  if (index.value <= -1) {
    setIsLoop({ count: count.value });
  } else if (index.value >= count.value) {
    setIsLoop({ count: -count.value });
  }
};

function mousemove(e) {
  if (moverFlag.value) {
    const { start } = domInfo.value
    const x = e.clientX - start
    let offsetLeft: number
    const direction = x > 0 ? 1 : -1
    offsetLeft = x / 2
    Object.assign(domInfo.value, {
      x: x,
      offsetLeft: offsetLeft,
      direction: direction,
    })
    setIsLoop({ x: offsetLeft })
  }
}

function setIsLoop({ count = 0, x = 0 }: { count?: number, x?: number }) {
  const targetOffset = formatOffset(count, x)
  console.log('targetOffset=>', targetOffset)
  if (targetOffset !== minWidth.value) {
    const outRightBound = targetOffset < minWidth.value
    childrens[0].setOffset(outRightBound ? allWidth.value : 0)
  }
  if (childrens[childrens.length - 1] && targetOffset !== 0) {
    const outLeftBound = targetOffset > 0
    childrens[childrens.length - 1].setOffset(outLeftBound ? -allWidth.value : 0)
  }

  left_distance.value = targetOffset
}

function formatOffset(value: number, x?: number) {
  let currentIndex: number
  if (value) {
    // console.log('Math.min(Math.max(index.value + value, -1), count.value)', Math.min(Math.max(index.value + value, -1), count.value))
    currentIndex = Math.min(Math.max(index.value + value, -1), count.value);
    index.value = currentIndex
  }
  // active + pace, -1, count.value
  currentIndex = index.value;

  let currentPosition = currentIndex * domInfo.value.Width;
  let targetOffset
  targetOffset = x - currentPosition;
  return targetOffset;
}

function mouseup(e) {
  moverFlag.value = false
  const { x, direction, middle, Width } = domInfo.value
  if (typeof x === undefined) return
  if (direction < 0) {
    doLeft()
  } else if (direction > 0) {
    doRight()
  }
  setIsLoop({ x: 0 })
  eventTimerId = setTimeout(() => {
    autoPlay()
  }, 300)
}

function doLeft() {
  if (!isLoop.value && index.value === childrens.length - 1) return
  const { x, middle, direction } = domInfo.value
  const left = index.value <= count.value
  const addFlag = x * direction > middle
  if (addFlag && left) {
    index.value += 1
  }
}

function doRight() {
  if (!isLoop.value && index.value === 0) return
  const { x, middle } = domInfo.value
  const right = index.value >= 0
  const addFlag = x > middle
  if (addFlag && right) {
    index.value -= 1
  }
}

// function animation(e: HTMLElement, left: string | number, speed = 0) {
//   setStyle(swiperWrapper.value, {
//     'transition-duration': `${moverFlag.value ? 0 : speed}ms`,
//     transform: `translate3d(${left}px,0,0)`,
//   })
// }

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
