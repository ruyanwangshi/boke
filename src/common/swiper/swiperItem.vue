<template>
  <div class="swiper-item" @click="clickHandler">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits<{
  (event: 'clickhandler', e: HTMLElement): void
}>()
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
