'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', ' ']

export default function PinSetupPage() {
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [step, setStep] = useState<'enter' | 'confirm'>('enter')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDigit = (d: string) => {
    if (d === ' ') return
    if (d === '⌫') {
      if (step === 'enter') setPin((p) => p.slice(0, -1))
      else setConfirmPin((p) => p.slice(0, -1))
      return
    }

    if (step === 'enter') {
      const next = pin + d
      setPin(next)
      if (next.length === 4) setStep('confirm')
    } else {
      const next = confirmPin + d
      setConfirmPin(next)
      if (next.length === 4) {
        if (next !== pin) {
          setError('PIN ไม่ตรงกัน กรุณาลองใหม่')
          setPin('')
          setConfirmPin('')
          setStep('enter')
        } else {
          savePin(pin)
        }
      }
    }
  }

  const savePin = async (value: string) => {
    setLoading(true)
    const supabase = createClient()
    const { error: rpcError } = await supabase.rpc('set_parent_pin', { p_hash: value })
    if (rpcError) {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
      setLoading(false)
    } else {
      router.push('/parent/dashboard')
    }
  }

  const currentPin = step === 'enter' ? pin : confirmPin

  return (
    <div className="game-card p-8 flex flex-col items-center gap-6">
      <div className="text-center">
        <div className="text-4xl mb-2">🔒</div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">
          {step === 'enter' ? 'ตั้งรหัส PIN' : 'ยืนยัน PIN อีกครั้ง'}
        </h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">PIN 4 หลักสำหรับผู้ปกครอง</p>
      </div>

      <div className="flex gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'w-4 h-4 rounded-full border-2 transition-colors',
              i < currentPin.length
                ? 'bg-[var(--xp-blue)] border-[var(--xp-blue)]'
                : 'border-[var(--text-muted)]'
            )}
          />
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="grid grid-cols-3 gap-2 w-full">
        {DIGITS.map((d, i) => (
          <button
            key={i}
            onClick={() => handleDigit(d)}
            disabled={loading || d === ' '}
            className={cn(
              'h-12 rounded-lg font-bold text-lg transition-all active:scale-95',
              d === ' '
                ? 'invisible'
                : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-navy-600'
            )}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  )
}
