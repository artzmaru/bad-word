'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { type ChildProfile } from '@/lib/queries/progress'
import { cn } from '@/lib/utils'

const AVATARS = ['🐶', '🐱', '🐸', '🦊', '🐼', '🐨']
const COLORS = ['#38bdf8', '#22c55e', '#f59e0b', '#a78bfa', '#f43f5e', '#fb923c']

export default function EditProfilePage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [profile, setProfile] = useState<ChildProfile | null>(null)
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0])
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    createClient()
      .from('child_profiles')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProfile(data)
          setName(data.name)
          setSelectedAvatar(data.avatar ?? AVATARS[0])
          setSelectedColor(data.color ?? COLORS[0])
        }
      })
  }, [id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    setError(null)
    const { error: updateError } = await createClient()
      .from('child_profiles')
      .update({ name: name.trim(), avatar: selectedAvatar, color: selectedColor })
      .eq('id', id)
    if (updateError) {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
      setLoading(false)
      return
    }
    router.push('/parent/profiles')
  }

  async function handleDelete() {
    if (!confirm('ลบโปรไฟล์นี้?')) return
    await createClient().from('child_profiles').delete().eq('id', id)
    router.push('/parent/profiles')
  }

  if (!profile) {
    return (
      <div className="p-6">
        <p className="text-[var(--text-muted)]">กำลังโหลด...</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <button
        onClick={() => router.back()}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm mb-4 flex items-center gap-1"
      >
        ← กลับ
      </button>

      <h2 className="text-2xl font-bold text-[var(--text-primary)]">แก้ไขโปรไฟล์</h2>

      <form onSubmit={handleSave} className="space-y-5 mt-6">
        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-1.5">ชื่อเด็ก</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            required
            placeholder="ชื่อ..."
            className="w-full bg-[var(--bg-elevated)] border border-[var(--game-border)] rounded-xl px-4 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--xp-blue)]"
          />
        </div>

        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">อวาตาร์</label>
          <div className="grid grid-cols-3 gap-2">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedAvatar(emoji)}
                className={cn(
                  'h-14 rounded-xl text-3xl transition-all flex items-center justify-center bg-[var(--bg-elevated)] border',
                  selectedAvatar === emoji
                    ? 'border-white bg-sky-500 scale-110 ring-2 ring-white'
                    : 'border-[var(--game-border)] hover:border-sky-400'
                )}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">สีประจำตัว</label>
          <div className="flex gap-3 flex-wrap">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={cn(
                  'w-9 h-9 rounded-full transition-all',
                  selectedColor === color ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="game-btn-3d w-full bg-[var(--xp-blue)] text-[#0b1837] font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="mt-8 w-full py-3 rounded-xl border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors font-medium"
      >
        ลบโปรไฟล์
      </button>
    </div>
  )
}
