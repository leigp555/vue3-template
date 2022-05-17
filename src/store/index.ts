import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0 as number, // 可以指定数据类型
      name: 'lgp' as string
    }
  }, // 必须是一个箭头函数否则类型不会推导
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
