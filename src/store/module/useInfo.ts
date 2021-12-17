import { defineStore } from 'pinia'
export const useStore = defineStore('useInfo', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      content: {},
      navbarLineShow: true,
      MdArray: [],
      current: 1,
      total: 0,
    }
  },
  getters: {
    fileMd: (state) => ({
      MdArray: state.MdArray,
      current: state.current,
      total: state.total,
    }),
    // mdArray: (state) => state.MdArray,
    // current: (state) => state.current,
    // total: (state) => state.total,
  },
  actions: {
    setContent(value: Object) {
      this.content = value
    },
    setNavbarLineShow(value: boolean) {
      this.navbarLineShow = value
    },
    mdArray(MdArray) {
      this.MdArray = MdArray
    },
    setTotal(total) {
      this.total = total
    },
    setCurrentIndex(index) {
      this.current = index
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
    },
  },
})
