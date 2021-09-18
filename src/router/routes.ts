// import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import Home from '@/view/home/index.vue'
const TimeLine = () =>
  import(
    /* webpackChunkName: "timeline" */
    /* webpackPrefetch: true */ '@/view/timeline/index.vue'
  )

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    meta: {
      title: '首页',
      currentIndex: 0,
    },
    component: Home,
  },
  {
    path: '/timeline',
    meta: {
      title: '时间线',
      currentIndex: 1,
    },
    component: TimeLine,
  },
]

export default routes
