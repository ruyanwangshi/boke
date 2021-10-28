import { createPinia, defineStore, getActivePinia, StoreDefinition } from 'pinia'
// import piniaPersist from 'pinia-plugin-persist'
export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      content: {},
      navbarLineShow: true
    }
  },
  actions: {
    setContent(value:Object) {
      this.content = value
    },
    setNavbarLineShow(value:boolean) {
      this.navbarLineShow = value
    }
  },
})
// logFn(useStore)
// function logFn(store: StoreDefinition) {
//   const storeLog = useStore()
//   storeLog.$subscribe((val) => {
//     console.log('-----------store.log-----------Start')
//     console.log(val)
//     console.log('-----------store.log-----------End')
//   }, true)
// }
export default createPinia
