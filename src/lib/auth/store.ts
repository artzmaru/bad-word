import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  activeChildId: string | null
  isParentMode: boolean
  parentModeExpiry: number | null
  pinLockoutUntil: number | null
  pinAttempts: number

  setActiveChild: (childId: string | null) => void
  enterParentMode: () => void
  exitParentMode: () => void
  checkParentModeExpiry: () => void
  recordPinAttempt: (success: boolean) => void
  isLockedOut: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      activeChildId: null,
      isParentMode: false,
      parentModeExpiry: null,
      pinLockoutUntil: null,
      pinAttempts: 0,

      setActiveChild: (childId) =>
        set({ activeChildId: childId, isParentMode: false }),

      enterParentMode: () => {
        const expiry = Date.now() + 30 * 60 * 1000 // 30 min
        set({ isParentMode: true, parentModeExpiry: expiry, pinAttempts: 0 })
      },

      exitParentMode: () =>
        set({ isParentMode: false, parentModeExpiry: null }),

      checkParentModeExpiry: () => {
        const { parentModeExpiry } = get()
        if (parentModeExpiry && Date.now() > parentModeExpiry) {
          set({ isParentMode: false, parentModeExpiry: null })
        }
      },

      recordPinAttempt: (success) => {
        if (success) {
          set({ pinAttempts: 0, pinLockoutUntil: null })
          get().enterParentMode()
          return
        }
        const attempts = get().pinAttempts + 1
        if (attempts >= 3) {
          set({
            pinAttempts: attempts,
            pinLockoutUntil: Date.now() + 30 * 1000,
          })
        } else {
          set({ pinAttempts: attempts })
        }
      },

      isLockedOut: () => {
        const { pinLockoutUntil } = get()
        if (!pinLockoutUntil) return false
        if (Date.now() > pinLockoutUntil) {
          set({ pinLockoutUntil: null, pinAttempts: 0 })
          return false
        }
        return true
      },
    }),
    { name: 'bad-word-auth' }
  )
)
