import { createApp } from 'vue'
import App from './App.vue'
import gsap from 'gsap'
import ScrollReveal from 'scrollreveal'
import router from './router'
import loading from '@/common/loading'
import { createPinia } from 'pinia'
import store from '@/store'
import 'github-markdown-css/github-markdown-light.css'

const app = createApp(App)
app.use(createPinia())
app.directive('loading', loading)
app.use(router)
store(app)




app.config.errorHandler = (err, vm, info) => {
  console.log('---------------报错start---------------')
  console.log(err)
  console.log(vm)
  console.log(info)
  console.log('测试~~~~~~~~~~~~~~~~~~~~~')
  console.log('---------------报错end---------------')
}

app.config.globalProperties.$gsap = gsap
app.config.globalProperties.$ScrollReveal = ScrollReveal
app.mount('#app')
