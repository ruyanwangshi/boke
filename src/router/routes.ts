import { RouteRecordRaw } from 'vue-router'
import Home from '@/view/home/index.vue'
import View from '@/view/home/component/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home/view',
  },
  {
    path: '/home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'view',
        meta: {
          title: '首页',
        },
        component: View,
      },
    ],
    component: Home,
  },
]

export default routes
