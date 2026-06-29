'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useChildProfiles, useChildProgress, type ChildProfile } from '@/lib/queries/progress'
import { cn } from '@/lib/utils'

function levelColor(level: number) {
  return ['', '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][level] ?? '#7a9cc0'
}

function ChildProgressCard({ profile }: { profile: ChildProfile }) {
  const { data: progress } = useChildProgress(profile.id)

  const level = progress?.current_level ?? 1
  const xpInLevel = (progress?.total_xp ?? 0) % 100
  const wordsLearned = progress?.words_learned ?? 0
  const scenariosCompleted = progress?.scenarios_completed ?? 0
  const streakDays = progress?.streak_days ?? 0

  return (
    <div className="game-card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-4xl flex-shrink-0"
          style={{ backgroundColor: profile.color + '33' }}
        >
          {profile.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--text-primary)] text-lg truncate">{profile.name}</span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0"
              style={{ backgroundColor: levelColor(level) }}
            >
              Lv.{level}
            </span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${xpInLevel}%`, backgroundColor: levelColor(level) }}
            />
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">{xpInLevel}/100 XP</div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
        <span>📚 {wordsLearned} คำ</span>
        <span>🎯 {scenariosCompleted}</span>
        <span>🔥 {streakDays} วัน</span>
      </div>
    </div>
  )
}

export default function ParentDashboardPage() {
  const [parentId, setParentId] = useState<string | null>(null)
  const { data: profiles = [] } = useChildProfiles(parentId)

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setParentId(data.user?.id ?? null))
  }, [])

  const todayThai = new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">ภาพรวมลูก</h2>
        <p className="text-[var(--text-muted)] text-sm mt-1">วันที่ {todayThai}</p>
      </div>

      {profiles.length === 0 ? (
        <div className="game-card p-8 text-center text-[var(--text-muted)]">
          <p>ยังไม่มีโปรไฟล์เด็ก</p>
          <p className="text-sm mt-2">
            สร้างโปรไฟล์ได้ที่แท็บ{' '}
            <Link href="/parent/profiles" className="text-[var(--xp-blue)] underline">
              โปรไฟล์
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <ChildProgressCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  )
}
