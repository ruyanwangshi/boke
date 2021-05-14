<template>
<!-- 左侧菜单 -->
  <div>
    <div class="menuitem-container" ref="menuList">
      <slot></slot>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      :css="false"
    >
      <div class="bg" @click.self="bgclick" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { onMounted, ref, getCurrentInstance, defineComponent, nextTick } from "vue";
import gsap from "gsap";
const menulist = defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["bg-click"],
  setup(props: any, context: any) {
    //拿到当前组件的实例
    const vm: any = getCurrentInstance();
    onMounted(async () => {
    });
    const { bgclick, state } = isShow(props, context);
    function beforeEnter(el: any) {
      gsap.to(el, 0, {
        opacity: 0,
      });
      gsap.to(vm.refs.menuList, 0, {
        x: "-20rem",
        boxShadow: "none",
      });
    }
    function enter(el: any, done: any) {
      gsap.to(el, 0.5, {
        opacity: 1,
        onComplete: done,
      });
      gsap.to(vm.refs.menuList, 0.3, {
        x: 0,
        boxShadow: "10px 0 10px rgba(0, 0, 0, 0.3)",
        onComplete: done,
      });
    }
    function leave(el: any, done: any) {
      gsap.to(el, 0.5, {
        opacity: 0,
        onComplete: done,
      });
      gsap.to(vm.refs.menuList, 0.3, {
        x: "-20rem",
        boxShadow: "none",
        onComplete: done,
      });
    }
    return {
      state,
      bgclick,
      enter,
      beforeEnter,
      leave,
    };
  },
});
export default menulist;

//控制是否显示
function isShow(props: any, ctx: any) {
  function bgclick() {
    ctx.emit("bg-click");
  }
  const state = ref(0);
  return {
    bgclick,
    state,
  };
}
</script>

<style scoped lang="stylus">
.menuitem-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100vh;
  background: red;
  box-shadow: none;
  z-index: 9999;
  background: rgba(233, 233, 233, 0.4);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(-20rem);
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index 20;
}

.show-enter-from {
  opacity: 0;
}

.show-enter-active, .show-leave-from {
  opacity: 1;
  transition: all 16s cubic-bezier(0, 0, 1, 2);
}

.show-leave-active {
  opacity: 0;
}
</style>
