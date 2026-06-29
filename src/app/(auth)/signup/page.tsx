'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="game-card p-8 text-center flex flex-col gap-4">
        <div className="text-5xl">📧</div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">ตรวจสอบอีเมล</h2>
        <p className="text-[var(--text-muted)]">
          เราส่งลิงก์ยืนยันไปที่ <strong className="text-[var(--text-primary)]">{email}</strong>
        </p>
      </div>
    )
  }

  return (
    <div className="game-card p-8 flex flex-col gap-6">
      <div className="text-center">
        <div className="text-4xl mb-2">📖</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">สมัครสมาชิก</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">สร้างบัญชีผู้ปกครอง</p>
      </div>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--game-border)] focus:outline-none focus:border-[var(--xp-blue)]"
          required
        />
        <input
          type="password"
          placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--game-border)] focus:outline-none focus:border-[var(--xp-blue)]"
          required
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            'game-btn-3d w-full py-3 rounded-xl font-bold text-white',
            'bg-[var(--level-green)] hover:bg-green-400',
            loading && 'opacity-60 cursor-not-allowed'
          )}
        >
          {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
        </button>
      </form>

      <p className="text-center text-[var(--text-muted)] text-sm">
        มีบัญชีแล้ว?{' '}
        <a href="/login" className="text-[var(--xp-blue)] hover:underline">
          เข้าสู่ระบบ
        </a>
      </p>
    </div>
  )
}
