'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      router.push('/profiles')
    }
  }

  return (
    <div className="game-card p-8 flex flex-col gap-6">
      <div className="text-center">
        <div className="text-4xl mb-2">📖</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">คำเรียนรู้</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">เข้าสู่ระบบ</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--game-border)] focus:outline-none focus:border-[var(--xp-blue)]"
          required
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            'game-btn-3d w-full py-3 rounded-xl font-bold text-white',
            'bg-[var(--xp-blue)] hover:bg-sky-400',
            loading && 'opacity-60 cursor-not-allowed'
          )}
        >
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>

      <p className="text-center text-[var(--text-muted)] text-sm">
        ยังไม่มีบัญชี?{' '}
        <a href="/signup" className="text-[var(--xp-blue)] hover:underline">
          สมัครสมาชิก
        </a>
      </p>
    </div>
  )
}
