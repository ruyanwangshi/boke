<template>
  <div class="classification-container">
    <div class="classification-content">
      <ClassContent
        :classContent="item"
        v-for="item in classCotent"
        :key="item.index"
        @clickHandler="clickHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, onUnmounted } from 'vue'
import ClassContent from '@/common/classContent/index.vue'
import { RequestInstance } from '@/request'
import { newNprogress } from '@/router'

export default defineComponent({
  name: 'youllian',
  components: {
    ClassContent
  },
  async setup(props, { emit }) {
    const classCotent = ref<any>([])

    initClassContentList()


    onMounted(async () => {

    })

    onUnmounted(() => {
    })

    async function initClassContentList() {
      const { data } = await RequestInstance('get', '/tags', {})

      newNprogress.done()
      if (data.httpCode === 200) {
        classCotent.value = data.result.map((item, index) => ({
          ...item,
          index,
          isShow: false
        }))
        console.log(classCotent.value)
        return
      }
    }



    function clickHandler(index: number) {
      if (classCotent.value[index] && typeof classCotent.value[index].isShow === 'boolean') {
        if (classCotent.value[index].isShow) {
          classCotent.value[index].isShow = false;
        } else {
          classCotent.value.forEach(item => item.isShow = false)
          classCotent.value[index].isShow = true;
        }
      }
    }
    return {
      classCotent,
      clickHandler
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
