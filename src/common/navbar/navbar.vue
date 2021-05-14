<template>
  <div
    class="navbar-container"
    ref="navbar"
  >
    <div class="menu-left">
      <div class="menu-btn fa fa-reorder" @click="menuclick"></div>
      <span>Differ空间</span>
    </div>
    <div class="menu-right menu-btn" @click="inputshow">
      <i class="fa fa-search"></i>
    </div>
  </div>
  <menulist @bg-click="bgclick" :isShow="isShow">
    <headerLeftList />
  </menulist>
  <search :searchShow="searchShow" @searchClose="searchClose" />
</template>

<script lang="ts">
// eslint-disable-next-line
import {
  defineComponent,
  PropType,
  defineAsyncComponent,
  ref,
  onMounted,
  getCurrentInstance,
  nextTick,
  watch
} from "vue";
import gsap from "gsap";
import menulist from "../menulist/menulist.vue";
import search from "../search/search.vue";
import { headerLeftList } from "./header-left";

export default defineComponent({
  components: {
    menulist,
    search,
    // headerLeftList:defineAsyncComponent(()=>import('./header-left'))
    headerLeftList,
  },
  setup() {
    const vm: any = getCurrentInstance();
    onMounted(() => {
      window.addEventListener("scroll", scroll);
    });

    const isShow = ref(false);
    const searchShow = ref(false);
    watch(searchShow,async (val)=>{
      if(val){
          await nextTick();
          gsap.to(vm.refs.navbar,.3,{
            y: '-20rem',
            background: '#FFCC00'
          })
        }else{
          await nextTick();
          gsap.to(vm.refs.navbar,.3,{
            y: '0',
            background: '#fff'
          })
        }
    },{
      immediate:true
    });
    const menuclick = () => {
      isShow.value = !isShow.value;
    };
    const bgclick = () => {
      isShow.value = !isShow.value;
    };
    const setinputval = () => {
      console.log("回车");
    };
    const inputshow = () => {
      searchShow.value = !searchShow.value;
    };
    const searchClose = () => {
      searchShow.value = !searchShow.value;
    };
    const scroll = async (el: any) => {
      const homeContainer:any = document.querySelector('#home-container');
      console.dir(vm.refs.navbar.offsetHeight);
      if (window.pageYOffset > 10) {
        await nextTick();
        vm.refs.navbar.style.position = "fixed";
        homeContainer.style.paddingTop = vm.refs.navbar.offsetHeight+'px';
        // gsap.to(vm.refs.navbar, 1, {
        //   background: "rgba(255,255,255,.4)",
        // });
      } else {
        await nextTick();
        vm.refs.navbar.style.position = "relative";
        homeContainer.style.paddingTop = 0;
        // gsap.to(vm.refs.navbar, 1, {
        //   background: "rgba(255,255,255,1)",
        // });
      }
    };
    return {
      isShow,
      searchShow,
      menuclick,
      bgclick,
      setinputval,
      inputshow,
      searchClose,
    };
  },
});
</script>
<style lang="stylus">
.navbar-container {
  padding: .9rem 1rem;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  z-index 10

  .menu-btn {
    font-size: 1.4rem;
    cursor: pointer;
  }

  .menu-left {
    span {
      font-size: 2rem;
      margin-left: 1rem;
    }
  }

  .menu-left, .menu-right {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .menu-right {
    justify-content: flex-end;
    text-align: right;
  }
}
</style>
