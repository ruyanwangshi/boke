<template>
  <div
    class="base-container"
    :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }"
  >
    <Navbar :imgUrl="imgUrl" />
    <div class="base-body">
      <Header :headerInfo="headerInfo" :imgUrl="imgUrl" />
      <div class="base-content">
        <suspense>
          <router-view v-slot="{ Component }">
            <transitionComponent>
              <keep-alive>
                <component :is="Component" class="component-style" />
              </keep-alive>
            </transitionComponent>
          </router-view>
        </suspense>
        <Back />
      </div>
      <Catalogue />
      <Bottom :imgUrl="imgUrl" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import Navbar from '@/common/navbar/index.vue'
import Header from '@/common/header/index.vue'
import Bottom from '@/common/bottom/index.vue'
import Back from '@/common/back/index.vue'
import Catalogue from '@/common/catalogue/index.vue'
import transitionComponent from '@/common/transitionComponent/index.vue'

// 头部导航
const routerList = ref(['home', 'timeline', 'tags', 'describe', 'content', 'youlian'])

// 背景图
const imgUrl = ref<string>(require('./assets/image/bg2.jpg'))

// 网站信息
const headerInfo = reactive({
  headerImg: require('./assets/image/header.jpg'),
  name: 'differ',
  describe: '严于律已 宽以待人',
})

onMounted(async () => { })
</script>
<style>
@import "./assets/css/base.css";
</style>
<style lang="stylus" scoped>
.base-container {
    min-height: 100vh;
    width: 100%;

    .swiper{
      height: 200px;
    }

    .base-body {
        padding: 200px 0;
        min-width: 800px;
        width: 800px;
        margin: 0 auto;
        // height: 1000px;
    }
    .base-content{
      background #fff;
      padding: 20px 10px
      box-sizing border-box
      position relative
      z-index 1
      height auto
      // .fade-enter-active, .fade-leave-active {
      //   background-color: white;
      //   transition: opacity, transform 1000ms ease-out;
      // }
      // .fade-leave-active {
      //   z-index: -100;
      // }
      // .fade-leave-to {
      //   z-index: -100;
      // }
      // .fade-leave-active,
      // .fade-enter-from {
      //   opacity: 1;
      //   transform: scale(0);
      // }
    }
}
// .fade-enter-active {
//   transition: all .8s ease-out;
// }
// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
// }
</style>
