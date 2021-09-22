<template>
  <transition name="fade">
    <div class="back-top">
      <span class="top-icon"><i class="fa fa-level-up"></i></span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick } from 'vue'
export default defineComponent({
  props: {
    viewHeight: Number,
  },
  setup(props, ctx) {
    onMounted(async () => {
      await nextTick
      const bodyHeight = document.documentElement.offsetHeight || 0
      window.addEventListener('scroll', (e) => {
        console.log('props.viewHeight=>', props.viewHeight)
        console.log()
        if (props.viewHeight) {
          console.dir(document.documentElement.clientHeight)
          // console.log(window.scrollY - props.viewHeight)
          console.log(document.documentElement.clientHeight - props.viewHeight)
        }
        // console.log(bodyHeight - window.scrollY)
      })
    })
  },
})
</script>

<style lang="stylus" scoped>
.back-top {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(80px, -50%);
    height: 40px;
    width: 40px;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.5);
    cursor: pointer;

    .top-icon {
        // background rgba(0,0,0,0.5)
        color: #fff;
    }
}
</style>
