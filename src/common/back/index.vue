<template>
  <div class="back-container">
    <transition name="fade">
      <div class="back-top" v-show="isShow" @click="backClickhandler">
        <span class="top-icon"><i class="fa fa-level-up"></i></span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, ref, onUnmounted } from 'vue'
export default defineComponent({
  props: {
    viewHeight: Number,
  },
  setup(props, ctx) {
    const isShow = ref(false)
    const scrollY = ref(0)
    onMounted(async () => {
      await nextTick
      window.addEventListener('scroll', changeState)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', changeState)
    })

    function changeState() {
      scrollY.value = window.scrollY
      // const height = document.documentElement.offsetHeight - 737
      // if (scrollY.value > height) {
      //   isShow.value = true
      // } else {
      //   isShow.value = false
      // }
    }

    function backClickhandler() {
      let timer: any = 0
      if (timer > 0) return
      if (scrollY.value > 0) {
        console.log(timer)
        timer = setInterval(() => {
          scrollY.value /= 4
          if (scrollY.value < 0 || scrollY.value == 0) {
            clearInterval(timer)
          }
          window.scrollTo(0, scrollY.value)
        }, 30)
      } else {
        clearInterval(timer)
      }
    }

    return { isShow, backClickhandler }
  },
})
</script>

<style lang="stylus" scoped>
.back-container{
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(80px, -50%);
}
.back-top {
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
