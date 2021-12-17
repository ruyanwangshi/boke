<template>
  <div class="classification-container">
    <div class="classification-content">
      <ClassContent :classList="classCotent"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, onUnmounted } from 'vue'
import ClassContent from '@/common/classContent/index.vue'
import Nprogress from 'nprogress'

export default defineComponent({
  name: 'youllian',
  components: {
    ClassContent
  },
  async setup(props, { emit }) {
    const classCotent = ref(['测试内容','测试内容','测试内容','测试内容','测试内容','测试内容','测试内容','测试内容','测试内容','测试内容'])
    onMounted(async () => {
    })

    onUnmounted(() => {
    })
    return {
      classCotent
    }
  },
})
</script>

<style lang="stylus">
.classification-container{
  height: auto;
  width: 100%;
  .classification-content{
    height: auto;
    width: 100%;
  }
}
</style>
