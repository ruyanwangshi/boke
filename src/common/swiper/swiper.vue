<template>
  <div class="my-swiper" ref="swiper">
    <div class="swiper-container" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" ref="swiperWrapper">
      <slot></slot>
    </div>
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

function initSwiper() {
  const elLeft = swiperWrapper.value.offsetLeft
  const elWidth = swiperWrapper.value.offsetWidth
  const middle = swiperWrapper.value.offsetWidth / 3
  domInfo.value = {
    left: elLeft,
    Width: elWidth,
    middle: middle,
    step: 0,
  }
  setStyle(swiperWrapper.value, {
    transform: 'translate3d(0px,0,0)',
  })
  childrens = swiperWrapper.value.children
  childrens.forEach((element) => {
    setStyle(element, {
      width: `${elWidth}px`,
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
    // console.log(e.clientX)
    // console.log('mousemove')
    const start = domInfo.value?.start
    const x = e.clientX - start
    const direction = x > 0 ? 'right' : 'left'
    Object.assign(domInfo.value, {
      x: x,
      direction: direction,
    })
    animation(swiperWrapper.value, x)
  }
}

function mouseup(e) {
  console.log('mouseup')
  moverFlag.value = false
  const { x, middle, step, Width, direction } = domInfo.value
  let left
  if (direction === 'right') {
    index.value += index.value > 0 && x > middle ? -1 : 0
    left = x > middle ? Width * index.value : step
  } else if (direction === 'left') {
    if (index.value + 1 === childrens.length || x > middle * -1) {
      index.value += 0
    } else {
      index.value += 1
    }
    left = x < middle * -1 ? Width * index.value * -1 : step
  }
  Object.assign(domInfo.value, {
    step: left,
  })
  console.log(index.value)
  console.log(domInfo.value)
  console.log(left)
  animation(swiperWrapper.value, left, 300)
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
    .swiper-container{
        position relative
        width: 100%;
        height: 100%
        display: flex;

        transition-property: transform;
    }
}
</style>
