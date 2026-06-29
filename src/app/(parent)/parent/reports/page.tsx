'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useChildProfiles, useChildProgress, type ChildProfile } from '@/lib/queries/progress'
import { cn } from '@/lib/utils'

function levelColor(level: number) {
  return ['', '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][level] ?? '#7a9cc0'
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / Math.max(max, 1)) * 100))
  return (
    <div className="h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  )
}

function ReportView({ childId }: { childId: string }) {
  const { data: progress } = useChildProgress(childId)

  if (!progress) {
    return <p className="text-[var(--text-muted)] text-sm">กำลังโหลด...</p>
  }

  const stats = [
    { icon: '📚', label: 'คำที่เห็น', value: progress.words_seen },
    { icon: '⭐', label: 'คำที่เรียนรู้', value: progress.words_learned },
    { icon: '🎯', label: 'สถานการณ์', value: progress.scenarios_completed },
    { icon: '🎮', label: 'แบบทดสอบ', value: progress.quiz_sessions_done },
    { icon: '🔥', label: 'สตรีค', value: `${progress.streak_days} วัน` },
    { icon: '💎', label: 'Gems', value: progress.gems },
  ]

  return (
    <div className="space-y-6">
      <div className="game-card p-5">
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ icon, label, value }) => (
            <div key={label} className="bg-[var(--bg-elevated)] rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-[var(--text-primary)] font-bold text-lg">{value}</div>
              <div className="text-[var(--text-muted)] text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mt-2">
        <div>
          <div className="flex justify-between text-sm text-[var(--text-muted)] mb-1.5">
            <span>คำศัพท์</span>
            <span>{progress.words_learned}/82 คำ</span>
          </div>
          <ProgressBar value={progress.words_learned} max={82} color="#22c55e" />
        </div>
        <div>
          <div className="flex justify-between text-sm text-[var(--text-muted)] mb-1.5">
            <span>สถานการณ์</span>
            <span>{progress.scenarios_completed}/8 สถานการณ์</span>
          </div>
          <ProgressBar value={progress.scenarios_completed} max={8} color="#a78bfa" />
        </div>
      </div>
    </div>
  )
}

export default function ParentReportsPage() {
  const [parentId, setParentId] = useState<string | null>(null)
  const { data: profiles = [] } = useChildProfiles(parentId)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setParentId(data.user?.id ?? null))
  }, [])

  useEffect(() => {
    if (profiles.length > 0 && !selectedId) {
      setSelectedId(profiles[0].id)
    }
  }, [profiles, selectedId])

  const selectedProfile = profiles.find((p) => p.id === selectedId)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[var(--text-primary)]">รายงาน</h2>

      {profiles.length === 0 ? (
        <div className="game-card p-8 text-center text-[var(--text-muted)] mt-4">
          <p>ยังไม่มีโปรไฟล์เด็ก</p>
        </div>
      ) : (
        <>
          {profiles.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedId(profile.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0',
                    selectedId === profile.id
                      ? 'bg-[var(--xp-blue)] text-[#0b1837]'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  )}
                >
                  <span>{profile.avatar}</span>
                  <span>{profile.name}</span>
                </button>
              ))}
            </div>
          )}

          {selectedProfile && (
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: selectedProfile.color + '33' }}
                >
                  {selectedProfile.avatar}
                </div>
                <span className="font-bold text-[var(--text-primary)]">{selectedProfile.name}</span>
              </div>
              <ReportView childId={selectedProfile.id} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
