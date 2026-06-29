import { create } from 'zustand'

interface XPEvent {
  id: string
  amount: number
  label: string
  type: 'word_learned' | 'quiz_correct' | 'scenario_complete'
  earnedAt: number
}

interface ProgressState {
  totalXP: number
  currentLevel: number
  coins: number
  gems: number
  pendingXP: number
  recentEvents: XPEvent[]

  hydrate: (data: {
    totalXP: number
    currentLevel: number
    coins: number
    gems: number
  }) => void
  addXP: (amount: number, type: XPEvent['type'], label: string) => void
  commitPending: () => void
  rollback: () => void
  dismissEvent: (id: string) => void

  // Selector helper
  xpProgressInLevel: () => number
}

export const useProgressStore = create<ProgressState>()((set, get) => ({
  totalXP: 0,
  currentLevel: 1,
  coins: 0,
  gems: 0,
  pendingXP: 0,
  recentEvents: [],

  hydrate: (data) =>
    set({
      totalXP: data.totalXP,
      currentLevel: data.currentLevel,
      coins: data.coins,
      gems: data.gems,
      pendingXP: 0,
    }),

  addXP: (amount, type, label) => {
    const event: XPEvent = {
      id: crypto.randomUUID(),
      amount,
      label,
      type,
      earnedAt: Date.now(),
    }
    set((s) => ({
      totalXP: s.totalXP + amount,
      currentLevel: Math.max(1, Math.min(99, Math.floor((s.totalXP + amount) / 100) + 1)),
      pendingXP: s.pendingXP + amount,
      recentEvents: [event, ...s.recentEvents].slice(0, 5),
    }))
  },

  commitPending: () => set({ pendingXP: 0 }),

  rollback: () => {
    const pending = get().pendingXP
    set((s) => ({
      totalXP: s.totalXP - pending,
      currentLevel: Math.max(1, Math.min(99, Math.floor((s.totalXP - pending) / 100) + 1)),
      pendingXP: 0,
    }))
  },

  dismissEvent: (id) =>
    set((s) => ({ recentEvents: s.recentEvents.filter((e) => e.id !== id) })),

  xpProgressInLevel: () => get().totalXP % 100,
}))

export const selectXPProgress = (s: ProgressState) => ({
  totalXP: s.totalXP,
  currentLevel: s.currentLevel,
  xpInLevel: s.totalXP % 100,
  recentEvents: s.recentEvents,
})
