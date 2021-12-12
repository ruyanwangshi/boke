import { defineStore } from 'pinia'
export const useStore = defineStore('useInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        content: {},
        navbarLineShow: true
      }
    },
    actions: {
      setContent(value: Object) {
        this.content = value
      },
      setNavbarLineShow(value: boolean) {
        console.log(1111111111111)
        console.log()
        this.navbarLineShow = value
        console.log(this.navbarLineShow)
      }
    },
})


export const testStore = defineStore('test', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        ceshi: {},
      }
    },
    actions: {
        setTest(value: Object) {
          this.ceshi = value
        }
      },
})