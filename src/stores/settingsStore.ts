import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  parentMaxLevel: number
  showLevel45ToChild: boolean
  childMaxLevel: number
  preferredLang: 'th' | 'en' | 'both'
  soundEnabled: boolean
  dailyTimeLimitMin: number

  setParentSettings: (s: {
    maxLevel: number
    showLevel45: boolean
    dailyTimeLimitMin: number
  }) => void
  setChildSettings: (s: {
    maxLevel: number
    lang: 'th' | 'en' | 'both'
    sound: boolean
  }) => void

  // Effective level taking parent override into account
  effectiveMaxLevel: () => number
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      parentMaxLevel: 5,
      showLevel45ToChild: false,
      childMaxLevel: 3,
      preferredLang: 'both',
      soundEnabled: true,
      dailyTimeLimitMin: 30,

      setParentSettings: ({ maxLevel, showLevel45, dailyTimeLimitMin }) =>
        set({
          parentMaxLevel: maxLevel,
          showLevel45ToChild: showLevel45,
          dailyTimeLimitMin,
        }),

      setChildSettings: ({ maxLevel, lang, sound }) =>
        set({
          childMaxLevel: maxLevel,
          preferredLang: lang,
          soundEnabled: sound,
        }),

      effectiveMaxLevel: () => {
        const { parentMaxLevel, showLevel45ToChild, childMaxLevel } = get()
        if (!showLevel45ToChild) return Math.min(childMaxLevel, 3)
        return Math.min(childMaxLevel, parentMaxLevel)
      },
    }),
    { name: 'bad-word-settings' }
  )
)
