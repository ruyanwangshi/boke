// import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import Home from '@/view/home/index.vue'
// const TimeLine = defineAsyncComponent(() => )

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    meta: {
      title: '首页',
    },
    component: Home,
  },
  {
    path: '/timeline',
    meta: {
      title: '时间线',
    },
    component: import(/* webpackChunkName: "timeline" */
                      /* webpackPrefetch: true */ '@/view/timeline/index.vue'),
  },
]

export default routes
