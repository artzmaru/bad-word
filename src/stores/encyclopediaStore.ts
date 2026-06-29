import { create } from 'zustand'

type Tab = 'all' | 'bookmarks' | 'learned'
type LangFilter = 'both' | 'th' | 'en'

interface EncyclopediaState {
  tab: Tab
  langFilter: LangFilter
  levelFilter: number | null
  searchQuery: string

  setTab: (tab: Tab) => void
  setLangFilter: (lang: LangFilter) => void
  setLevelFilter: (level: number | null) => void
  setSearchQuery: (q: string) => void
  reset: () => void
}

export const useEncyclopediaStore = create<EncyclopediaState>()((set) => ({
  tab: 'all',
  langFilter: 'both',
  levelFilter: null,
  searchQuery: '',

  setTab: (tab) => set({ tab }),
  setLangFilter: (langFilter) => set({ langFilter }),
  setLevelFilter: (levelFilter) => set({ levelFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  reset: () =>
    set({ tab: 'all', langFilter: 'both', levelFilter: null, searchQuery: '' }),
}))
