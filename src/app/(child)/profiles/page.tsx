'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/auth/store'
import { cn } from '@/lib/utils'
import { type ChildProfile } from '@/lib/queries/progress'
import PageBackground from '@/components/game/PageBackground'

const CHARACTER_AVATARS = [
  { id: 'fifok',    label: 'ฟิฟ่อก',   src: '/assets/profiles/avatar_fifok_idle@2x.png',    selectedSrc: '/assets/profiles/avatar_fifok_selected@2x.png' },
  { id: 'noon',     label: 'นุ่น',      src: '/assets/profiles/avatar_noon_idle@2x.png',     selectedSrc: '/assets/profiles/avatar_noon_selected@2x.png' },
  { id: 'nong_guy', label: 'น้องกาย', src: '/assets/profiles/avatar_nong_guy_idle@2x.png', selectedSrc: '/assets/profiles/avatar_nong_guy_selected@2x.png' },
]
const COLORS = ['#38bdf8', '#22c55e', '#f59e0b', '#a78bfa', '#f43f5e', '#fb923c']

function ProfileAvatar({ avatar, color, size = 96 }: { avatar: string; color: string; size?: number }) {
  const ch = CHARACTER_AVATARS.find((c) => c.id === avatar)
  if (ch) {
    return (
      <div
        className="rounded-2xl overflow-hidden flex items-center justify-center shadow-lg"
        style={{ width: size, height: size, background: `${color}20`, border: `2px solid ${color}` }}
      >
        <div className="relative w-full h-full">
          <Image src={ch.src} alt={ch.label} fill className="object-contain p-1" sizes={`${size}px`} />
        </div>
      </div>
    )
  }
  return (
    <div
      className="rounded-2xl flex items-center justify-center text-5xl shadow-lg"
      style={{ width: size, height: size, background: `${color}20`, border: `2px solid ${color}` }}
    >
      {avatar}
    </div>
  )
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<ChildProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newAvatar, setNewAvatar] = useState('fifok')
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
    <div className="relative flex flex-col items-center justify-center h-full gap-8 px-8 overflow-y-auto">
      <PageBackground name="background_profile_selection" overlay="rgba(10,14,30,0.55)" />
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
            <div className="transition-transform group-hover:scale-110">
              <ProfileAvatar avatar={profile.avatar} color={profile.color} size={96} />
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
              <p className="text-[var(--text-muted)] text-sm mb-2">เลือกตัวละคร</p>
              <div className="flex gap-3 justify-center">
                {CHARACTER_AVATARS.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setNewAvatar(ch.id)}
                    className={cn(
                      'flex flex-col items-center gap-1 p-2 rounded-xl transition-all',
                      newAvatar === ch.id
                        ? 'bg-[var(--xp-blue)]/30 ring-2 ring-[var(--xp-blue)] scale-110'
                        : 'bg-[var(--bg-elevated)]'
                    )}
                  >
                    <div className="relative w-14 h-14">
                      <Image
                        src={newAvatar === ch.id ? ch.selectedSrc : ch.src}
                        alt={ch.label}
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    </div>
                    <span className="text-[var(--text-muted)] text-xs">{ch.label}</span>
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
