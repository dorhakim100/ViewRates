import { Prefs } from 'src/types/Prefs/Prefs'

export const systemService = {
  getDefaultPrefs,
}

function getDefaultPrefs(): Prefs {
  return {
    isDarkMode: false,
  }
}
