<template>
  <div class="home-container">
    <img-bg :imgUrl="imgUrl">
      <div class="home-body">
        <Navbar />
        <div class=""></div>
        <div class=""></div>
      </div>
    </img-bg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ImgBg from '@/common/imgBg'
import Navbar from '@/common/navbar'
export default defineComponent({
  components: {
    ImgBg,
    Navbar,
  },
  setup() {
    const imgUrl = ref<string>(require('../../assets/image/bg.jpg'))
    return {
      imgUrl,
    }
  },
})
</script>

<style lang="stylus" scoped>
.home-container {
    height: 100%;
    width: 100%;
    .home-body{
        position absolute
        top 0
        left 0
        right 0
        bottom 0
    }
}
</style>
