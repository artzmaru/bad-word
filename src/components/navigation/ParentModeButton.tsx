'use client'

import { useAuthStore } from '@/lib/auth/store'
import { useRouter } from 'next/navigation'

export function ParentModeButton() {
  const isParentMode = useAuthStore((s) => s.isParentMode)
  const exitParentMode = useAuthStore((s) => s.exitParentMode)
  const router = useRouter()

  const handlePress = () => {
    if (isParentMode) {
      exitParentMode()
      return
    }
    // Trigger PIN gate
    if (typeof window !== 'undefined') {
      const w = window as Window & { openPinGate?: () => void }
      w.openPinGate?.()
    }
  }

  return (
    <button
      onClick={handlePress}
      className="absolute top-3 right-3 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
      style={{
        background: isParentMode
          ? 'rgba(34,197,94,0.2)'
          : 'rgba(56,189,248,0.1)',
        border: `1px solid ${isParentMode ? '#22c55e' : 'rgba(56,189,248,0.3)'}`,
        color: isParentMode ? '#22c55e' : 'var(--text-muted)',
      }}
    >
      <span>{isParentMode ? '🔓' : '🔒'}</span>
      <span>{isParentMode ? 'ออกจากโหมดผู้ปกครอง' : 'ผู้ปกครอง'}</span>
    </button>
  )
}
