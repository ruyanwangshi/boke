<template>
  <div class="classContent-container" :style="{ width: `${props.contentWidth}px` }">
    <div class="classContent-title" @click="clickEvent">内容标题</div>
    <transition @before-enter="beforeEnter" @enter="enter" @afterEnter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave" >
      <div class="classContent-items" id="classContent" v-show="show">
        <div class="classContent-item" v-for="(item, index) in classList" :key="index">{{ item }}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'classContent',
  props: {
    classList: {
      type: Array,
      default() {
        return []
      },
    },
    contentWidth: {
      type: String,
      default: '200',
    },
  },
  async setup(props, { emit }) {
    const show = ref(false)
    const transitionStyle = '0.3s height ease-in-out'

    function clickEvent() {
      show.value = !show.value
    }

    function beforeEnter(el) {
      // addClass(el, 'collapse-transition');

      if (!el.dataset) el.dataset = {}
      el.style.tansition = transitionStyle
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.classList.add('transitionClass')
      el.style.height = '0'
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }

    function enter(el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
    }

    function afterEnter(el) {
      // for safari: remove class then reset height is necessary
      // removeClass(el, 'collapse-transition');
      el.classList.remove('transitionClass')
      el.style.tansition = transitionStyle
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
    }

    function beforeLeave(el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    }

    function leave(el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        el.classList.add('transitionClass')
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    }

    function afterLeave(el) {
      el.classList.remove('transitionClass')
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }

    return {
      props,
      show,
      clickEvent,
      beforeEnter,
      enter,
      leave,
      afterEnter,
      afterLeave,
      beforeLeave,
    }
  },
})
</script>

<style lang="stylus">
.classContent-container {
    height: auto;
    background: #fff;

    .classContent-title {
        height: auto;
        text-align: center;
        width: 100%;
        cursor: pointer;
    }

    .classContent-items {
        height: auto;
        width: 100%;
    }
}

.fade-enter-active {
    max-height:200px;
    transition: max-height 0.5s ease-in-out;
}

.fade-leave-active {
    max-height:200px;
    transition: max-height 0.5s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
    max-height: 0;
}
.transitionClass {
    transition:  0.3s height ease-in-out
}
</style>
