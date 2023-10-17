import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      address: ''
    }
  },
  actions: {
    changeAddress(address) {
      this.address = address
    }
  }
})
