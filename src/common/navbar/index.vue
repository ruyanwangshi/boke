<template>
  <div class="navbar-container">
    <!-- 导航栏 -->
    <ul class="navbar-items">
      <li class="navbar-item__style" :class="{ 'font-style': currentIndex === index }" v-for="(item, index) in navbarItmes" :ref="getHtmlElment" :key="index" @click="itemClick(index, item)">
        <i :class="item.icon"></i>
        {{ item.title }}
      </li>
    </ul>
    <div v-if="navbarLineShow" :style="{ left: `${lineStyle.left}px`, width: `${lineStyle.width}px` }" class="navbar-line"></div>
    <!-- 导航栏高斯模糊背景 -->
    <div class="navbar-blur" :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, ref, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store/module/useInfo'
import { navbarItmes } from './contant'
import { getHtmlElment, itemTranslation, lineStyle, initResize, initNavBarAnimation } from './hooks/useAnimateClick'
import { NavbarItme } from './type'
export default defineComponent({
  name: 'content',
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
  },
  setup(props, coxtent) {
    let removeFn: () => void
    let navbarId: () => void

    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { navbarLineShow } = storeToRefs(store)
    const currentIndex = ref<number>(0)
    const NavHeightHeight = ref<string>('50px')
    const NavHeightBlur = ref<string>('blur(10px)')

    async function itemClick(index: number, item: NavbarItme) {
      currentIndex.value = index
      store.setNavbarLineShow(true)
      router.push({
        path: item.linkUrl,
      })
    }


    watch(route, async (route) => {
      await nextTick()
      if(navbarItmes.value.some(item => item.linkUrl === route.path)) {
        store.setNavbarLineShow(true)
      } else {
        store.setNavbarLineShow(false)
      }
      currentIndex.value = route.meta.currentIndex as number
      // 初始化导航栏底部横线动画
      itemTranslation(currentIndex.value)
    })

    onMounted(async function (this: any) {
      // 初始化监听window窗口宽度变化
      removeFn = initResize((e: Event) => {
        console.log('initResize=>', e);
        setTimeout(() => {
          itemTranslation(currentIndex.value)
        }, 0)
      })

      navbarId = initNavBarAnimation((e) => {
        if(window.scrollY > 20) {
          NavHeightHeight.value = '40px'
          NavHeightBlur.value = 'blur(20px)'
        } else {
          NavHeightHeight.value = '50px'
          NavHeightBlur.value = 'blur(10px)' 
        }
      })
    })

    onUnmounted(() => {
      removeFn()
      navbarId()
    })

    return {
      lineStyle,
      getHtmlElment,
      navbarItmes,
      itemClick,
      currentIndex,
      navbarLineShow,
      NavHeightHeight,
      NavHeightBlur,
    }
  },
})
</script>

<style lang="stylus">
.navbar-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: v-bind(NavHeightHeight);
    background-color: white;
    z-index: 99;
    background-color: rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    overflow: hidden;
    will-change: height, filter;
    transition: height 0.2s ease-in-out, filter 0.2s ease-in-out;

    .navbar-items {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
        justify-content: center;

        .navbar-item__style {
            min-width: 60px;
            margin: 0 10px;
            white-space: nowrap;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            filter: contrast(20%);
            opacity: 0.8;
            transition: all 0.3s;

            i {
                margin-right: 6px;
            }

            &:hover {
                filter: contrast(100%);
                opacity: 1;
            }
        }

        .font-style {
            color: #303133;
            filter: contrast(100%);
            opacity: 1;
        }
    }

    .navbar-line {
        position: absolute;
        height: 2px;
        transition: all 0.3s;
        bottom: 0;
        background: #303133;
        z-index: 10;
    }

    .navbar-blur {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        inset: 0px;
        z-index: -1;
        filter: v-bind(NavHeightBlur);
        width: 100%;
    }
}
</style>
