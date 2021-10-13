<template>
  <div class="back-top" :style="{ opacity: opacityValue }" @click="backtopClick">
    <span class="top-icon"><i class="fa fa-level-up"></i></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, ref } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    const showBack = ref(false)
    const opacityValue = ref(0)
    const timerID = ref<unknown>(null)
    const scrollTop = ref(0)
    const backTop = ref<HTMLElement | null>(null)
    onMounted(async () => {
      await nextTick
      backTop.value = document.querySelector('.back-top')

      window.addEventListener('scroll', (e) => {
        scrollTop.value = document.documentElement.scrollTop
        if (scrollTop.value <= 0) {
          opacityValue.value = 0
          return
        }
        if (backTop.value!.offsetTop - scrollTop.value < 400) {
          opacityValue.value = 1
        } else {
          opacityValue.value = 0
        }
      })
    })

    const backtopClick = () => {
      timerID.value = setInterval(() => {
        if (scrollTop.value <= 0) {
          clearInterval(timerID.value as number)
          window.scrollTo(0, 0)
          return
        }
        const top = scrollTop.value / 2
        window.scrollTo(0, top)
      }, 24)
    }

    return {
      showBack,
      opacityValue,
      backtopClick,
    }
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
    transition: all .2s ease-out;

    .top-icon {
        // background rgba(0,0,0,0.5)
        color: #fff;
    }
}
</style>
