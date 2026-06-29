'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/auth/store'
import { cn } from '@/lib/utils'
import { type ChildProfile } from '@/lib/queries/progress'

const AVATARS = ['🐶', '🐱', '🐸', '🦊', '🐼', '🐨']
const COLORS = ['#38bdf8', '#22c55e', '#f59e0b', '#a78bfa', '#f43f5e', '#fb923c']

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<ChildProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newAvatar, setNewAvatar] = useState('🐶')
  const [newColor, setNewColor] = useState('#38bdf8')
  const [adding, setAdding] = useState(false)

  const setActiveChild = useAuthStore((s) => s.setActiveChild)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const {
        data: { user: u },
      } = await supabase.auth.getUser()

      if (!u) {
        router.push('/login')
        return
      }

      setUser(u)
      const { data } = await supabase
        .from('child_profiles')
        .select('*')
        .eq('parent_id', u.id)
        .order('created_at')

      setProfiles((data as ChildProfile[]) ?? [])
      setLoading(false)
    }
    load()
  }, [router])

  const handleSelect = (childId: string) => {
    setActiveChild(childId)
    router.push('/home')
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newName.trim()) return
    setAdding(true)

    const supabase = createClient()
    const { data: profile, error } = await supabase
      .from('child_profiles')
      .insert({
        parent_id: user.id,
        name: newName.trim(),
        avatar: newAvatar,
        color: newColor,
      })
      .select()
      .single()

    if (!error && profile) {
      // Create progress row
      await supabase.from('child_progress').insert({ child_id: profile.id })
      setProfiles((p) => [...p, profile as ChildProfile])
      setShowAdd(false)
      setNewName('')
    }
    setAdding(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[var(--text-muted)] text-lg animate-pulse">กำลังโหลด...</div>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-8 px-8 overflow-y-auto"
      style={{ background: 'var(--bg-page)' }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">คำเรียนรู้</h1>
        <p className="text-[var(--text-muted)] mt-1">เลือกโปรไฟล์</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => handleSelect(profile.id)}
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'var(--bg-card)',
              border: `2px solid ${profile.color}30`,
            }}
          >
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shadow-lg transition-transform group-hover:scale-110"
              style={{ background: `${profile.color}20`, borderColor: profile.color, border: `2px solid ${profile.color}` }}
            >
              {profile.avatar}
            </div>
            <span className="text-[var(--text-primary)] font-bold text-lg">{profile.name}</span>
          </button>
        ))}

        {/* Add new profile button */}
        <button
          onClick={() => setShowAdd(true)}
          className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-all hover:scale-105 active:scale-95 border-2 border-dashed border-[var(--game-border)] hover:border-[var(--xp-blue)]"
        >
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl text-[var(--text-muted)]">
            ➕
          </div>
          <span className="text-[var(--text-muted)] font-medium">เพิ่มโปรไฟล์</span>
        </button>
      </div>

      {/* Add profile modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <form
            onSubmit={handleAdd}
            className="game-card w-80 p-6 flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold text-[var(--text-primary)]">สร้างโปรไฟล์ใหม่</h2>

            <input
              type="text"
              placeholder="ชื่อเด็ก"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--game-border)] focus:outline-none focus:border-[var(--xp-blue)]"
              required
              autoFocus
            />

            <div>
              <p className="text-[var(--text-muted)] text-sm mb-2">อวาตาร์</p>
              <div className="flex gap-2 flex-wrap">
                {AVATARS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setNewAvatar(a)}
                    className={cn(
                      'w-10 h-10 rounded-lg text-xl transition-all',
                      newAvatar === a
                        ? 'bg-[var(--xp-blue)] scale-110'
                        : 'bg-[var(--bg-elevated)]'
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[var(--text-muted)] text-sm mb-2">สี</p>
              <div className="flex gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewColor(c)}
                    className={cn(
                      'w-8 h-8 rounded-full transition-all',
                      newColor === c && 'scale-125 ring-2 ring-white'
                    )}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-muted)] font-medium"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={adding}
                className="flex-1 py-2 rounded-xl bg-[var(--xp-blue)] text-white font-bold"
              >
                {adding ? '...' : 'สร้าง'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
