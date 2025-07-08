import { defineStore, acceptHMRUpdate } from 'pinia'
import { getDefaultCurrency } from 'src/services/utils.service'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    from: {
      amount: 1,
      currency: 'ils',
    },
    toCurrencies: [getDefaultCurrency()],
  }),

  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },

  // actions: {
  //   increment() {
  //     this.counter++;
  //   },
  // },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCurrencyStore, import.meta.hot))
}
