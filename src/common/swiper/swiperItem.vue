<template>
  <div :style="style" class="swiper-item" @click="clickHandler">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed, CSSProperties, inject, onUnmounted, getCurrentInstance } from 'vue'
interface State {
  [key: string | number]: any
}
const state = reactive<State>({
  offset: 0,
})
const style = computed(() => {
  const style: CSSProperties = {}
  if (state.offset) {
    style.transform = `translateX(${state.offset}px)`
  }
  return style
})
const SWIPER_KEY = 'my-swiper'
const { parent, index } = useParent(SWIPER_KEY)
function useParent(key: string) {
  const parent = inject(key, null);
  
  if (parent) {
    const instance = getCurrentInstance();
    const { link, unlink, children } = parent;
    link(instance);
    onUnmounted(() => unlink(instance));
    const index = computed(() => children.indexOf(instance));
    return {
      parent,
      index
    };
  }
  // return {
  //   parent: null,
  //   index: ref2(-1)
  // };
}
const emits = defineEmits<{
  (event: 'clickhandler', e: HTMLElement): void
}>()
const setOffset = (offset: number) => {
  state.offset = offset || 0
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
