import { defineStore } from 'pinia'
import { store } from '@/store'


export const useStore = defineStore('useInfo', {
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

export function useInfo() {
  return useStore(store);
}

