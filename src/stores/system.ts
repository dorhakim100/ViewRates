import { defineStore, acceptHMRUpdate } from 'pinia'
import { systemService } from 'src/services/system.service/system.service'

import { Prefs } from 'src/types/Prefs/Prefs'

export const useSystemStore = defineStore('system', {
  state: () => ({
    prefs: systemService.getDefaultPrefs(),
    isLoading: false,
  }),

  getters: {
    isDarkMode: (state) => state.prefs.isDarkMode,
    isLoading: (state) => state.isLoading,
  },

  actions: {
    setPrefs(prefsToSet: Prefs) {
      this.prefs = prefsToSet
    },
    setIsLoading(stateToSet: boolean) {
      this.isLoading = stateToSet
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSystemStore, import.meta.hot))
}
