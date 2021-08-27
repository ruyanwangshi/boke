import { Router, createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const Router: Router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default Router
