import Home from '@/view/home/index.vue'
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
      path: '/home',
      meta: {
          title: '首页'
      },
      component: Home
  }
]

export default routes
