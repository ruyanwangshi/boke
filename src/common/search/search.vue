<template>
<!-- 搜索input框 -->
  <div class="search-input" ref='searchEl' :class="{ open: searchShow, close: !searchShow }">
    <input type="text" v-model="inputval" @keydown.enter="setinputval" />

    <div class="close-btn" @click="closebtn">
      <div class="border border1"></div>
      <div class="border border2"></div>
      <div class="border border3"></div>
      <!-- <i class="fa fa-close"></i> -->
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import {
  ref,
  onMounted,
  reactive,
  defineComponent,
  PropType,
  watch,
  nextTick
} from "vue";
import gsap from "gsap";
export default defineComponent({
  name: "search",
  props: {
    searchShow: {
      type: Boolean as PropType<Boolean>,
      default: false,
    },
  },
  watch: {
    searchShow: {
      async handler(val) {
        if(val){
          await nextTick();
          gsap.to(this.$refs.searchEl as any,.3,{
            y: '0'
          })
        }else{
          await nextTick();
          gsap.to(this.$refs.searchEl as any,.3,{
            y: '-20rem'
          })
        }
      },
      immediate: true,
    },
  },
  emits: ["setinputval", "searchClose"],
  setup(props: any, context: any) {
    onMounted(() => {
      // 获取borderdom列表
      setBorderDot();
    });
    const inputval = ref("请输入搜索内容");
    function setinputval(e: any) {
      context.emit("setinputval");
    }

    function closebtn() {
      context.emit("searchClose");
    }

    function setBorderDot() {
      const borderDotList: any = document.querySelectorAll(".border");
      const borderDotArray: any = Array.from(borderDotList);
      // gsap.config({
      //   repeat
      // })
      gsap.to(borderDotArray[0], 1, {
        opacity: 0,
        scale: 1.4,
        startAt: {
          opacity: 1,
          scale: 0.2,
        },
      });
      gsap.to(borderDotArray[1], 1, {
        opacity: 0,
        scale: 1.4,
        startAt: {
          opacity: 1,
          scale: 0.2,
        },
      });
      gsap.to(borderDotArray[2], 1, {
        opacity: 0,
        scale: 1.4,
        startAt: {
          opacity: 1,
          scale: 0.2,
        },
      });
    }
    return {
      inputval,
      setinputval,
      closebtn,
    };
  },
});
</script>

<style scoped lang="stylus">
.search-input
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.4rem 20% 0.4rem 2%;
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  box-shadow: 3px 3px 10px #FFCC00;
  // transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  background: #FFCC00;
  z-index 10

  input
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 1rem 2rem;
    box-shadow: 0 0 20px #FFFFCC;
    background: #FFFFCC;
    color: #000;
    font-size: 1rem;


  .close-btn
    position: absolute;
    right: 10%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    font-size: 1.4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;

    .border
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: 1px solid #FFFFCC;
      box-shadow: 0 0 10px #FFFFCC;
      animation: GreenDot 1.5s ease-out 0s infinite;

      &.border1
        animation-delay: 2s;


      &.border2
        animation-delay: 4s;


      &.border3
        animation-delay: 6s;

  &.open
    box-shadow: 3px 3px 10px #FFCC00;

  &.close
    box-shadow: none;



@keyframes GreenDot {
  0% {
    transform: scale(0.2);
    transform-origin: center;
    opacity: 1;
  }

  30% {
    opacity: 1;
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}
</style>
