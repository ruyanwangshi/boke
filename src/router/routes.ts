// import { defineAsyncComponent } from 'vue'
import { Router, RouteRecordRaw } from 'vue-router'
import Home from '@/view/home/index.vue'
const TimeLine = () =>
  import(
    /* webpackChunkName: "timeline" */
    /* webpackPrefetch: true */ '@/view/timeline/index.vue'
  )

const Tags = () =>
  import(
    /* webpackChunkName: "tags" */
    /* webpackPrefetch: true */ '@/view/tags/index.vue'
  )

const Describe = () =>
  import(
    /* webpackChunkName: "describe" */
    /* webpackPrefetch: true */ '@/view/describe/index.vue'
  )

const Content = () =>
  import(
    /* webpackChunkName: "content" */
    /* webpackPrefetch: true */ '@/components/content/index.vue'
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
  {
    path: '/tags',
    meta: {
      title: '标签',
      currentIndex: 2,
    },
    component: Tags,
  },

  {
    path: '/describe',
    meta: {
      title: '描述',
      currentIndex: 3,
    },
    component: Describe,
  },
  {
    path: '/content',
    meta: {
      title: '详情',
    },
    component: Content,
  },
]

export default routes
