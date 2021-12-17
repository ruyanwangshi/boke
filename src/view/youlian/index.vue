<template>
  <div class="youlian-container">
    <div>友链</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, onUnmounted } from 'vue'
import Nprogress from 'nprogress'

export default defineComponent({
  name: 'youllian',
  async setup(props, { emit }) {
    onMounted(async () => {
    })

    onUnmounted(() => {
    })
  },
})
</script>

<style lang="stylus">
.youlian{
  height: auto;
  width: 100%;
}
</style>
