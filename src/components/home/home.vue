<template>
  <div id="home-container">
    <!-- <div class="home-left">
      <div class="fade-in" v-for="(item, index) in 100" :key="index">{{ item }}</div>
    </div>
    <div class="home-right">
      <splitpane direction="column">
        <template #rightContent>
        </template>
      </splitpane>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, onUnmounted, getCurrentInstance, computed, watchEffect } from 'vue';

import gsap from 'gsap';
import ScrollReveal from 'scrollreveal';
import splitpane from '../../common/splitPane/splitpane.vue';
export default defineComponent({
  name: 'home',
  components: {
    splitpane,
  },
  // async setup(props: any, context: any) { ?? 为什么不能声明异步声明成异步又会产生什么？
  async setup(props: any, context: any) {
    console.log(ScrollReveal);
    const vm: any = getCurrentInstance();
    const { globalProperties: vmConfig } = vm.appContext.config;
    let Elements = reactive<any[]>([]);
    let setScrollRevealConfig = reactive({});
    // 自动加入依赖
    // watchEffect(()=>{
    //   console.log(bianliang1.value)
    //   console.log(bianliang2.value)
    // },
    // {
    //   onTrigger (e) {
    //     console.log(e)
    //   }
    // })
    // eslint-disable-next-line
    onMounted(() => {
      // do something
      setScrollReveal('.fade-in');
      // console.log(vmConfig.$httpRequest);
      // console.log();
      // console.log(res1);
      // console.log(res2);
    });

    onUnmounted(() => {
      // do something
    });

    // 调用scrollReveal里的reveal方法scrollReveal内部的动画和css中的标签关联起来；
    function setScrollReveal(el: any) {
      setScrollRevealConfig = {
        // reset: true,   // 滚动鼠标时，动画开关(默认是false没有打开鼠标滚动的动画开关)
        // origin: 'right', // 动画开始的方向
        // duration: 1000,   // 动画持续时间ms
        // delay: 0, // 延迟
        // rotate: {x:0, y:0, z:0},  // 过度到0的初始角度
        // opacity: 0.1, // 初始透明度  (0.2到1的效果)
        // scale:1,       //缩放
        // easing: 'ease-in-out', //动画效果// 缓动'ease', 'ease-in-out'，'linear'...
        reset: true,
        distance: '150%', // 距离视口所展示的距离
        easing: 'ease-in-out',
        origin: 'right',

        // 回调函数
        //当动画开始之前会被触发
        beforeReveal: function(domEl: any) {
          // console.log("动画执行了");
        },
        //鼠标滚轮滚动之前会被触发
        beforeReset: function(domEl: any) {
          // console.log("滚轮开始---");
        },
        //动画开始之后会被触发
        afterReveal: function(domEl: any) {
          // console.log("动画结束了");
        },
        //滚轮滚动之后会被触发
        afterReset: function(domEl: any) {
          // console.log("滚轮结束了");
        },
      };
      ScrollReveal().reveal(el, setScrollRevealConfig);
    }
    return {
      
    };
  },
});
</script>

<style scoped lang="stylus">
#home-container {
  height: auto;
  width: 100%;
  background:red;
  display flex;
  overflow hidden;
  .home-left{
    flex 4
    display flex
    flex-wrap wrap
    justify-content space-between
    overflow hidden
    .fade-in{
      height 100px
      width 20%
      margin 10px 5%
      background blue
      // content-visibility auto
    }
  }
  .home-right{
    flex 1
    overflow hidden
  }

}
</style>
