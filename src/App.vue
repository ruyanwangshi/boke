<template>
  <Navbar />
  <!-- ?? 为什么不能声明异步声明成异步又会产生什么？ -->
  <suspense>
    <component :is="Page" />
  </suspense>
</template>

<script lang="ts">
// eslint-disable-next-line
import './learn/01.ts'
import { defineComponent, PropType, ref } from 'vue';
import Navbar from './common/navbar/navbar.vue';
import home from './components/home/home.vue';
export default {
  components: {
    Navbar,
    home,
  },
  setup(props: any, context: any): Object {
    const [Page, setPage] = NavbarChange(props, context);
    return {
      Page,
      setPage,
    };
  },
};
function NavbarChange(props: any, context: any): any[] {
  const Page = ref('home');
  function setPage(page: string): void {
    Page.value = page;
  }
  return [Page, setPage];
}
</script>

<style>
@import './assets/css/base.css';
</style>
