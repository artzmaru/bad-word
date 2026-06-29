'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'

export type ToastType = 'xp' | 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  id: string
  message: string
  type?: ToastType
  xpAmount?: number
  duration?: number
  onDismiss: (id: string) => void
}

const TYPE_STYLES: Record<ToastType, { bg: string; border: string; icon: string }> = {
  xp:      { bg: 'bg-sky-900/90',   border: 'border-sky-400',   icon: '⭐' },
  success: { bg: 'bg-green-900/90', border: 'border-green-400', icon: '✓'  },
  error:   { bg: 'bg-red-900/90',   border: 'border-red-400',   icon: '✕'  },
  info:    { bg: 'bg-navy-800/90',  border: 'border-sky-600',   icon: 'ℹ'  },
  warning: { bg: 'bg-yellow-900/90',border: 'border-yellow-400',icon: '⚠'  },
}

export function Toast({ id, message, type = 'info', xpAmount, duration = 2500, onDismiss }: ToastProps) {
  const style = TYPE_STYLES[type]

  useEffect(() => {
    const t = setTimeout(() => onDismiss(id), duration)
    return () => clearTimeout(t)
  }, [id, duration, onDismiss])

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg',
        'animate-[slide-in_0.25s_ease-out]',
        style.bg,
        style.border,
      )}
      style={{ minWidth: 200, maxWidth: 340 }}
    >
      <span className="text-xl shrink-0">{style.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{message}</p>
        {xpAmount !== undefined && (
          <p className="text-xs text-sky-400 font-bold">+{xpAmount} XP</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-lg leading-none shrink-0"
      >
        ×
      </button>
    </div>
  )
}

// ─── Toast Container — place in root layout or child layout ─────────────────
interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type?: ToastType; xpAmount?: number }>
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast
            id={t.id}
            message={t.message}
            type={t.type}
            xpAmount={t.xpAmount}
            onDismiss={onDismiss}
          />
        </div>
      ))}
    </div>
  )
}
