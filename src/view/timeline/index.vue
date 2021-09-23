<template>
  <div class="tiemline-container">
    <tiemview />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, nextTick, onMounted, onUnmounted } from 'vue'
import Nprogress from 'nprogress'

import tiemview from './components/timeview/index.vue'
export default defineComponent({
  components: { tiemview },
  props: {
    title: Boolean,
  },
  async setup(props, { emit }) {
    const vm = getCurrentInstance()
    onMounted(async () => {
      await nextTick()
      setTimeout(() => {
        emit('update:title', true)
        Nprogress.done()
      }, 3000)
    })

    onUnmounted(() => {
      emit('update:title', false)
    })

    return { }
  },
})
</script>

<style lang="stylus">
.tiemline-container{
  background #fff
}
</style>
