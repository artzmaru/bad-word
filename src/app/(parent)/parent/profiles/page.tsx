'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useChildProfiles, useChildProgress, type ChildProfile } from '@/lib/queries/progress'

function levelColor(level: number) {
  return ['', '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][level] ?? '#7a9cc0'
}

function ProfileRow({ profile }: { profile: ChildProfile }) {
  const { data: progress } = useChildProgress(profile.id)
  const level = progress?.current_level ?? 1

  return (
    <div className="game-card p-4 flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
        style={{ backgroundColor: profile.color + '33' }}
      >
        {profile.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[var(--text-primary)] truncate">{profile.name}</div>
        <div className="text-sm text-[var(--text-muted)] flex items-center gap-2 mt-0.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: levelColor(level) }}
          />
          เลเวล {level}
        </div>
      </div>
      <Link
        href={`/parent/profiles/${profile.id}`}
        className="text-sm text-sky-400 hover:text-sky-300 transition-colors flex-shrink-0"
      >
        แก้ไข
      </Link>
    </div>
  )
}

export default function ParentProfilesPage() {
  const [parentId, setParentId] = useState<string | null>(null)
  const { data: profiles = [] } = useChildProfiles(parentId)

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setParentId(data.user?.id ?? null))
  }, [])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">โปรไฟล์เด็ก</h2>
        <Link
          href="/parent/profiles/new"
          className="game-btn-3d bg-[var(--xp-blue)] text-[#0b1837] text-sm font-bold px-4 py-2 rounded-xl"
        >
          + เพิ่มโปรไฟล์
        </Link>
      </div>

      <div className="space-y-3 mt-4">
        {profiles.length === 0 ? (
          <div className="game-card p-8 text-center text-[var(--text-muted)]">
            <p>ยังไม่มีโปรไฟล์เด็ก</p>
            <p className="text-sm mt-1">กด "+ เพิ่มโปรไฟล์" เพื่อเริ่มต้น</p>
          </div>
        ) : (
          profiles.map((profile) => <ProfileRow key={profile.id} profile={profile} />)
        )}
      </div>
    </div>
  )
}
