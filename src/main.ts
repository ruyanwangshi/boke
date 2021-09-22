import { createApp } from 'vue'
import App from './App.vue'
// import animate from "animate.css";
// import { httpRequest } from './request'
import gsap from 'gsap' 
import ScrollReveal from 'scrollreveal'
import router from './router'




const app = createApp(App)
app.use(router)
app.config.errorHandler = (err, vm, info) => {
  console.log('---------------报错start---------------')
  console.log(err)
  console.log(vm)
  console.log(info)
  console.log('---------------报错end---------------')
}

app.config.globalProperties.$gsap = gsap
app.config.globalProperties.$ScrollReveal = ScrollReveal
// app.config.globalProperties.$httpRequest = httpRequest
app.mount('#app')
