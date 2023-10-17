import { defineStore } from 'pinia'

export const useStore = defineStore('swiperStore', {
  state: () => {
    return {
      index: 0
    }
  },
  actions: {
    changeIndex(index) {
      this.index = index
    }
  }
})
