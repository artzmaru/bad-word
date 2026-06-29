'use client'

import { useState, useCallback } from 'react'
import { useAuthStore } from '@/lib/auth/store'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✕']

export function PINGateOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const recordPinAttempt = useAuthStore((s) => s.recordPinAttempt)
  const isLockedOut = useAuthStore((s) => s.isLockedOut)
  const pinLockoutUntil = useAuthStore((s) => s.pinLockoutUntil)
  const pinAttempts = useAuthStore((s) => s.pinAttempts)
  const isParentMode = useAuthStore((s) => s.isParentMode)

  const open = useCallback(() => {
    setPin('')
    setError('')
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setPin('')
    setError('')
    setIsOpen(false)
  }, [])

  const handleDigit = useCallback(
    async (d: string) => {
      if (d === '✕') {
        close()
        return
      }
      if (d === '⌫') {
        setPin((p) => p.slice(0, -1))
        return
      }

      if (isLockedOut()) {
        setError('ล็อคชั่วคราว กรุณารอ 30 วินาที')
        return
      }

      const next = pin + d
      setPin(next)

      if (next.length < 4) return

      // Verify PIN
      const supabase = createClient()
      const { data, error: rpcError } = await supabase.rpc('verify_parent_pin', {
        p_hash: next,
      })

      if (rpcError || !data) {
        setError(
          `รหัสผิด (${pinAttempts + 1}/3)${pinAttempts >= 2 ? ' — ล็อค 30 วิ' : ''}`
        )
        setPin('')
        recordPinAttempt(false)
      } else {
        recordPinAttempt(true)
        setIsOpen(false)
      }
    },
    [pin, isLockedOut, recordPinAttempt, pinAttempts, close]
  )

  // Expose open via window event
  if (typeof window !== 'undefined') {
    ;(window as Window & { openPinGate?: () => void }).openPinGate = open
  }

  if (!isOpen) return null

  const lockoutSecs = pinLockoutUntil
    ? Math.max(0, Math.ceil((pinLockoutUntil - Date.now()) / 1000))
    : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="game-card w-72 p-6 flex flex-col items-center gap-4">
        <p className="text-[var(--text-primary)] font-bold text-lg">
          รหัส PIN ผู้ปกครอง
        </p>

        {/* PIN dots */}
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                'w-4 h-4 rounded-full border-2 transition-colors',
                i < pin.length
                  ? 'bg-[var(--xp-blue)] border-[var(--xp-blue)]'
                  : 'border-[var(--text-muted)]'
              )}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">
            {lockoutSecs > 0 ? `ล็อค ${lockoutSecs} วินาที` : error}
          </p>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {DIGITS.map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className={cn(
                'h-12 rounded-lg font-bold text-lg transition-all active:scale-95',
                d === '✕'
                  ? 'bg-red-800/60 text-red-300'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-navy-600'
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
