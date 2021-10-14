import { Router, createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const Router: Router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

Router.beforeEach(() => {
  console.log('执行了')
  Nprogress.start()
})

Router.afterEach(() => {
  console.log('执行了')
  Nprogress.done()
})

export default Router
