import { App } from 'vue'
import { createPinia } from 'pinia'
import secretPiniaPlugin from './storage'
const store = createPinia()
store.use(secretPiniaPlugin())
// import piniaPersist from 'pinia-plugin-persist'
export default function initStore(app: App<Element>) {
  app.use(store)
}

// console.log(createPinia())

// useStore().$subscribe((mutation, state) => {
//   // import { MutationType } from 'pinia' 改变触发的类型
//   // mutation.type // 'direct' | 'patch object' | 'patch function'
//   // // same as cartStore.$id
//   // mutation.storeId // 'cart'
//   // // only available with mutation.type === 'patch object'
//   // mutation.payload // patch object passed to cartStore.$patch()

//   console.log(state)
//   // 侦听到state变化时，把state存在localStorage中
//   // localStorage.setItem('cart', JSON.stringify(state))
// })
// logFn(useStore)
// function logFn(store: StoreDefinition) {
//   const storeLog = useStore()
//   storeLog.$subscribe((val) => {
//     console.log('-----------store.log-----------Start')
//     console.log(val)
//     console.log('-----------store.log-----------End')
//   }, { detached: true})
// }
export { store }
