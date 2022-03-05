<template>
  <div :style="style" class="swiper-item" @click="clickHandler">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, CSSProperties } from 'vue'
interface State {
  [key: string | number]: any
}
const state = ref<State>({})
const style = computed(() => {
  const style: CSSProperties = {}

  if (state.offset) {
    style.transform = `translateX(${state.offset}px)`
  }

  return style
})
const emits = defineEmits<{
  (event: 'clickhandler', e: HTMLElement): void
}>()
const setOffset = (offset: number) => {
  state.offset = offset || ''
}

defineExpose({ setOffset })
function clickHandler(e) {
  emits('clickhandler', e)
}
</script>
<style lang="stylus">
.swiper-item{
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    border: 1px solid red;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    background: blue;
}
</style>
