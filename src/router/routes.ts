// import { defineAsyncComponent } from 'vue'
import { Router, RouteRecordRaw } from 'vue-router'
import Home from '@/view/home/index.vue'
const TimeLine = () =>
  import(
    /* webpackChunkName: "timeline" */
    /* webpackPrefetch: true */ '@/view/timeline/index.vue'
  )

  const Classification = () =>
  import(
    /* webpackChunkName: "classification" */
    /* webpackPrefetch: true */ '@/view/classification/index.vue'
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

  const Youlian = () =>
  import(
    /* webpackChunkName: "Youlian" */
    /* webpackPrefetch: true */ '@/view/youlian/index.vue'
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
      keepAive: true
    },
    component: Home,
  },
  {
    path: '/timeline',
    meta: {
      title: '时间线',
      currentIndex: 1,
      keepAive: true
    },
    component: TimeLine,
  },
  {
    path: '/classification',
    meta: {
      title: '分类',
      currentIndex: 2,
      keepAive: true
    },
    component: Classification,
  },
  {
    path: '/tags',
    meta: {
      title: '标签',
      currentIndex: 3,
      keepAive: true
    },
    component: Tags,
  },

  {
    path: '/describe',
    meta: {
      title: '描述',
      currentIndex: 4,
      keepAive: true
    },
    component: Describe,
  },
  {
    path: '/content',
    meta: {
      title: '详情',
      keepAive: true
    },
    component: Content,
  },
  {
    path: '/youlian',
    meta: {
      title: '友链',
      currentIndex: 5,
      keepAive: true
    },
    component: Youlian,
  },
]

export default routes
