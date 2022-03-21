<template>
  <div class="my-swiper" ref="swiper">
    <div class="swiper-container" :style="styleValue" @mousedown="mousedown" ref="swiperWrapper">
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
const isMove = ref(false) // 是否正在拖动
const showBtns = ref(true) // 是否展示左右控制按钮
const autoPlayTimer = 1000 // swiper自动播放时间
const loopedSlides = ref(1) // 循环播放下标
const slidesPerGroup = ref(1) // 上一个组

const point = computed(() => (isLoop ? 1 : 0)) // swiper滚动起点
const end = computed(() => (isLoop ? childrenList.children.length - 2 : childrenList.children.length - 1)) // swiper滚动终点
const index = ref(0) // 当前swiper下标
const activeLoopIndex = ref(0) // 当前swiper循环下标
const previousIndex = ref(0) // 上一个下标
const transitionTime = ref(0) // 当前swiper下标
const startTimer = ref(0) // 手指在接触与抬起的时间
let childrens: Array<any> // swiper容器内容子元素列表
let autoTimerId: NodeJS.Timeout // 自动播放循环定时器timerId
let eventTimerId: NodeJS.Timeout // 延迟自动播放的单次定时器timerId
const leftOffset = ref()
const positionsStart = ref(0) // 当前偏移量最开始的位置

const styleValue = computed(() => {
  return ({
    'transition-duration': `${transitionTime.value}s`,
    transform: `translate3d(${leftOffset.value}px,0,0)`,
  })
})

onMounted(async () => {
  try {
    await nextTick()
    initSwiper()
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
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
  setStyle(swiperWrapper.value, {
    width: `${childrens.length * offsetWidth}px`
  })
  childrens.forEach((element) => {
    setStyle(element, {
      width: `${offsetWidth}px`
    })
  })
  // leftOffset.value = -offsetWidth
  swipeTo(index.value, 0, false)
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
  }, autoPlayTimer)
}

// swiper 左边控制按钮
function leftClick(e: MouseEvent) {
  // btnControlAnimation(() => index.value <= point.value, -1)
  transitionTimer(300)
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
  transitionTimer(300)
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

function transitionTimer(duration: number) {
  transitionTime.value = (duration / 1000)
}

// swiper 俩侧控制动画逻辑
function btnControlAnimation(fn: () => Boolean, step: number, direction: number) {
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
  const start = e.pageX || e.clientX
  startTimer.value = +new Date()
  Object.assign(domInfo.value, {
    start: start,
  })
}

function mousemove(e) {
  if (startFlag.value) {
    // setStyle(swiperWrapper.value, {
    //   transitionProperty: 'inherit',
    // })
    const { start, step } = domInfo.value
    const pageX = e.pageX || e.clientX
    if (!isMove.value) {
      fixLoop()
      positionsStart.value = leftOffset.value;
    }
    isMove.value = true
    const x = (pageX - start) + positionsStart.value
    let offsetLeft: number
    const direction = x > 0 ? 'right' : 'left'
    // offsetLeft = x / 3
    transitionTimer(0)
    leftOffset.value = x
    console.log(pageX - start)
    console.log(positionsStart.value)
    Object.assign(domInfo.value, {
      x: x,
      // offsetLeft: offsetLeft,
      direction: direction,
    })
  }
}

function mouseup(e) {
  // moverFlag.value = true
  startFlag.value = false
  isMove.value = false
  const { start, x, Width } = domInfo.value
  const endTime = +new Date()
  const timeDiff = endTime - startTimer.value;
  const diff = x - start
  const direction = diff > 0 ? 'toNext' : 'toPrev'
  if (direction === 'toNext' && (timeDiff <= 300)) {
    if (diff < 30) swipeReset();
    else swipeNext(true, true);
  }
  // 手指拖动时间短于或等于300会触发
  if (direction === 'toPrev' && (timeDiff <= 300)) {
    if (diff < 30) swipeReset();
    else swipePrev(true, true);
  }

  if (direction === 'toNext' && (timeDiff > 300)) {
    if (diff >= Width * 0.5) {
      swipeNext(true, true);
    }
    else {
      swipeReset();
    }
  }
  if (direction === 'toPrev' && (timeDiff > 300)) {
    if (diff >= Width * 0.5) {
      swipeNext(true, true);
    }
    else {
      swipeReset();
    }
  }
}

function swipeNext(runCallbacks = true, internal) {
  const { Width } = domInfo.value
  // if (!internal && params.loop) fixLoop();
  // if (!internal && params.autoplay) _this.stopAutoplay(true);
  const currentPosition = leftOffset.value.toFixed(2);
  var newPosition = currentPosition;
  var groupSize = Width * slidesPerGroup.value;
  newPosition = -(Math.floor(Math.abs(currentPosition) / Math.floor(groupSize)) * groupSize + groupSize);

  if (newPosition < -maxWrapperPosition()) {
    newPosition = -maxWrapperPosition();
  }
  if (newPosition === currentPosition) return false;
  swipeToPosition(newPosition, 'next', { runCallbacks: runCallbacks });
  return true;
}

function swipePrev(runCallbacks = true, internal) {
  // if (!internal && params.loop) _this.fixLoop();
  // if (!internal && params.autoplay) _this.stopAutoplay(true);
  const { Width } = domInfo.value
  const currentPosition = Math.ceil(leftOffset.value);
  let newPosition;
  const groupSize = Width * slidesPerGroup.value;
  newPosition = -(Math.ceil(-currentPosition / groupSize) - 1) * groupSize;

  if (newPosition > 0) newPosition = 0;

  if (newPosition === currentPosition) return false;
  swipeToPosition(newPosition, 'prev', { runCallbacks: runCallbacks });
  return true;

}

function swipeReset(runCallbacks = true) {
  const { Width } = domInfo.value
  const currentPosition = leftOffset.value;
  const groupSize = Width * slidesPerGroup.value;
  let newPosition: number;
  var maxPosition = -maxWrapperPosition();
  newPosition = currentPosition < 0 ? Math.round(currentPosition / groupSize) * groupSize : 0;
  if (currentPosition <= -maxWrapperPosition()) newPosition = -maxWrapperPosition();

  if (newPosition < -maxWrapperPosition()) {
    newPosition = -maxWrapperPosition();
  }

  if (newPosition === currentPosition) return false;

  swipeToPosition(newPosition, 'reset', { runCallbacks: runCallbacks });
  return true;
}

function fixLoop() {
  let newIndex;
  if (index.value < loopedSlides.value) {
    // childrenList.children.length 所有元素总和 - _this.loopedSlides * 3 边界下标 * 3 + index.value 当前下标
    newIndex = childrenList.children.length - loopedSlides.value * 3 + index.value;

    swipeTo(newIndex, 0, false);
  }
  //Fix For Positive Oversliding
  else if ((index.value > childrenList.children.length - loopedSlides.value * 2)) {
    newIndex = -childrenList.children.length + index.value + loopedSlides.value;
    swipeTo(newIndex, 0, false);
  }
};

function swipeTo(indey: number, speed: number = 0, runCallbacks: Boolean = false) {
  if (isLoop.value) indey = indey + loopedSlides.value;
  console.log('indey=>', indey)
  const currentPosition = leftOffset.value;

  let newPosition;
  newPosition = -indey * domInfo.value.Width;
  if (newPosition < - maxWrapperPosition()) {
    newPosition = - maxWrapperPosition();
  }

  if (newPosition === currentPosition) return false;

  if (typeof runCallbacks === 'undefined') runCallbacks = true;
  swipeToPosition(newPosition, 'to', { index: indey, speed: speed, runCallbacks: runCallbacks });
  return true;
};

function swipeToPosition(newPosition, action, toOptions) {
  const speed = (action === 'to' && toOptions.speed >= 0) ? 0 : 300;
  var timeOld = + new Date(); // 获取当前时间戳

  transitionTimer(speed)
  leftOffset.value = newPosition

  //Update Active Slide Index
  updateActiveSlide(newPosition);
}

function updateActiveSlide(position) {
  previousIndex.value = index.value;
  if (typeof position === 'undefined') position = leftOffset.value;
  if (position > 0) position = 0;
  index.value = Math['round'](-position / domInfo.value.Width);

  if (index.value === childrenList.children.length) index.value = childrenList.children.length - 1;
  if (index.value < 0) index.value = 0;

  // Check for slide
  if (!childrenList.children[index.value]) return;

  // Calc Visible slides
  // _this.calcVisibleSlides(position);

  //Update loop index
  if (isLoop.value) {
    const ls = loopedSlides.value;
    activeLoopIndex.value = index.value - ls;
    if (activeLoopIndex.value >= childrenList.children.length - ls * 2) {
      activeLoopIndex.value = childrenList.children.length - ls * 2 - activeLoopIndex.value;
    }
    if (activeLoopIndex.value < 0) {
      activeLoopIndex.value = childrenList.children.length - ls * 2 + activeLoopIndex.value;
    }
    if (activeLoopIndex.value < 0) activeLoopIndex.value = 0;
  }
  else {
    activeLoopIndex.value = index.value;
  }
  //Update Pagination
  // if (params.pagination) {
  //     _this.updatePagination(position);
  // }
};

function maxWrapperPosition() {
  const wrapperSize = childrenList.children.length * domInfo.value.Width
  let a = (wrapperSize - domInfo.value.Width);
  return a;
}

// function getWrapperTranslate() {
//   var el = swiperWrapper.value,
//     matrix, curTransform, curStyle, transformMatrix;
//   curStyle = window.getComputedStyle(el, null);
//   if (window.WebKitCSSMatrix) {
//     // Some old versions of Webkit choke when 'none' is passed; pass
//     // empty string instead in this case
//     transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
//   }

//   //Latest Chrome and webkits Fix
//   if (window.WebKitCSSMatrix) {
//     curTransform = transformMatrix.m41;
//   }

//   //Crazy IE10 Matrix
//   else if (matrix.length === 16)
//     curTransform = parseFloat(matrix[12]);
//   //Normal Browsers
//   else
//     curTransform = parseFloat(matrix[4]);
//   // return curTransform || 0;
//   return leftOffset.value;
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
