<template>
  <div class="base-container" :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }">
    <Navbar :imgUrl="imgUrl" />
    <div class="base-body">
      <Header :headerInfo="headerInfo" :imgUrl="imgUrl" />
      <div class="base-content">
        <suspense>
          <router-view v-slot="{ Component }">
            <!-- <keep-alive> -->
              <transition name="fade">
                <component :is="Component" class="component-style" />
              </transition>
            <!-- </keep-alive> -->
          </router-view>
        </suspense>
      </div>
      <Bottom :imgUrl="imgUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, nextTick, ref } from 'vue'
import Navbar from '@/common/navbar/index.vue'
import Header from '@/common/header/index.vue'
import Bottom from '@/common/bottom/index.vue'
export default defineComponent({
  components: {
    Navbar,
    Header,
    Bottom,
  },
  setup() {
    const imgUrl = ref<string>(require('./assets/image/bg2.jpg'))
    const headerInfo = reactive({
      headerImg: require('./assets/image/header.jpg'),
      name: 'differ',
      describe: '严于律已 宽以待人',
    })
    onMounted(async () => {})
    return {
      imgUrl,
      headerInfo,
    }
  },
})
</script>
<style>
@import './assets/css/base.css';
</style>
<style lang="stylus" scoped>
.base-container {
    min-height: 100vh;
    width: 100%;

    .base-body {
        padding: 140px 0;
        min-width: 800px;
        width: 800px;
        margin: 0 auto;
        // height: 1000px;
    }
    .base-content{
      background #fff;
      padding: 20px 10px
      box-sizing border-box
    }
}
.fade-enter-active {
  transition: all .8s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
