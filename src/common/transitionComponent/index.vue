
<template>
  <transition @before-enter="beforeEnter" @enter="enter" @afterEnter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
    <slot></slot>
  </transition>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, computed } from 'vue'
interface Props {
  time?: string | number,
  TransitionCurve?: string
}

const props = withDefaults(defineProps<Props>(), {
  time: 0.3,
  TransitionCurve: 'ease-in-out'
})

const tansitionTime = computed(() => `${props.time}s`)
const TransitionCurve = computed(() => props.TransitionCurve)

function beforeEnter(el) {
  if (!el.dataset) el.dataset = {}
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
  el.classList.remove('transitionClass')
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
</script>

<style lang="stylus" scoped>
$tansitionTime = v-bind(tansitionTime)
$TransitionCurve = v-bind(TransitionCurve)
.transitionClass {
    transition:  $tansitionTime height $TransitionCurve, $tansitionTime padding-top $TransitionCurve, $tansitionTime padding-bottom $TransitionCurve
}
</style>
