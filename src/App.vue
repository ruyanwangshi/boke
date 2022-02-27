<template>
  <div
    class="base-container"
    :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }"
  >
    <Navbar :imgUrl="imgUrl" />
    <div class="base-body">
      <Header :headerInfo="headerInfo" :imgUrl="imgUrl" />
      <Swiper class="swiper">
        <SwiperItem v-for="(item,index) in 4" :key="index">
        {{ index }}
        </SwiperItem>
      </Swiper>
      <div class="base-content">
        <suspense>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <component :is="Component" class="component-style" />
              </keep-alive>
            </transition>
          </router-view>
        </suspense>
        <Back />
      </div>
      <Bottom :imgUrl="imgUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, nextTick, ref, watch } from 'vue'
import { testStore } from '@/store/module/useInfo'
import Navbar from '@/common/navbar/index.vue'
import Header from '@/common/header/index.vue'
import Bottom from '@/common/bottom/index.vue'
import Back from '@/common/back/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { Swiper, SwiperItem } from '@/common/swiper'


async function foo() {
  await Promise.resolve('123').then(res => {
    console.log(res)

    return new Promise(res => {
        setTimeout(() => {
          res('456')
      },100)
    })
    
  }).then(console.log)
}

foo()

export default defineComponent({
  components: {
    Navbar,
    Header,
    Bottom,
    Back,
    Swiper, SwiperItem
  },
  setup() {
    const test = testStore()
    test.setTest(123)
    const router = useRouter()
    const route = useRoute()
    const routerList = ref(['home', 'timeline', 'tags', 'describe', 'content', 'youlian'])

    const imgUrl = ref<string>(require('./assets/image/bg2.jpg'))

    const headerInfo = reactive({
      headerImg: require('./assets/image/header.jpg'),
      name: 'differ',
      describe: '严于律已 宽以待人',
    })

    onMounted(async () => { })
    return {
      imgUrl,
      headerInfo,
      routerList
    }
  },
})
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
      .fade-enter-active, .fade-leave-active {
        background-color: white;
        transition: opacity, transform 100ms ease-out;
        // position absolute
        // top 0
        // left 0
        // right 0
        // bottom 0
        // transition: all .8s ease-out;
      }
      .fade-leave-active {
        z-index: -100;
      }
      .fade-leave-to {
        z-index: -100;
      }
      .fade-leave-active,
      .fade-enter-from {
        opacity: 1;
        transform: translateY(-1em);
      }
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
