import { Router, createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import Nprogress from 'nprogress'

const Router: Router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

Router.beforeEach(() => {
  Nprogress.start()
})

Router.afterEach(() => {
  Nprogress.done()
})

export default Router
