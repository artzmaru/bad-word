'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth/store'
import { useProgressStore, selectXPProgress } from '@/stores/progressStore'
import { useChildProgress, useChildProfiles } from '@/lib/queries/progress'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import PageBackground from '@/components/game/PageBackground'

export default function HomePage() {
  const activeChildId = useAuthStore((s) => s.activeChildId)
  const { data: progress } = useChildProgress(activeChildId)
  const hydrate = useProgressStore((s) => s.hydrate)
  const { totalXP, currentLevel, xpInLevel, recentEvents } =
    useProgressStore(selectXPProgress)
  const router = useRouter()

  useEffect(() => {
    if (!activeChildId) {
      router.push('/profiles')
    }
  }, [activeChildId, router])

  useEffect(() => {
    if (progress) {
      hydrate({
        totalXP: progress.total_xp,
        currentLevel: progress.current_level,
        coins: progress.coins,
        gems: progress.gems,
      })
    }
  }, [progress, hydrate])

  const MODES = [
    {
      href: '/encyclopedia',
      icon: '📖',
      label: 'คำศัพท์',
      desc: 'เรียนรู้คำและความหมาย',
      color: '#38bdf8',
    },
    {
      href: '/quiz',
      icon: '🎯',
      label: 'แบบทดสอบ',
      desc: 'ทดสอบความเข้าใจ',
      color: '#f59e0b',
    },
    {
      href: '/scenario/list',
      icon: '🎮',
      label: 'สถานการณ์',
      desc: 'ฝึกเลือกคำพูด',
      color: '#a78bfa',
    },
  ]

  return (
    <div className="relative h-full overflow-y-auto flex flex-col gap-6 p-6">
      <PageBackground name="background_home_world" />
      {/* XP Bar */}
      <div className="game-card p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{ background: '#22c55e' }}
            >
              {currentLevel}
            </div>
            <span className="text-[var(--text-muted)] text-sm">เลเวล {currentLevel}</span>
          </div>
          <span className="text-[var(--xp-blue)] text-sm font-medium">{xpInLevel}/100 XP</span>
        </div>
        <div className="h-3 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--xp-blue)] rounded-full transition-all duration-500"
            style={{ width: `${xpInLevel}%` }}
          />
        </div>
        <div className="flex gap-4 text-sm text-[var(--text-muted)]">
          <span>⭐ {totalXP} XP รวม</span>
          <span>📚 {progress?.words_learned ?? 0} คำที่เรียนแล้ว</span>
        </div>
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-3 gap-4">
        {MODES.map(({ href, icon, label, desc, color }) => (
          <Link
            key={href}
            href={href}
            className="game-card p-5 flex flex-col gap-3 hover:scale-105 transition-transform active:scale-95"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: `${color}20`, border: `2px solid ${color}40` }}
            >
              {icon}
            </div>
            <div>
              <p className="text-[var(--text-primary)] font-bold">{label}</p>
              <p className="text-[var(--text-muted)] text-xs mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="game-card p-3 text-center">
          <div className="text-2xl font-bold text-[var(--gold)]">{progress?.scenarios_completed ?? 0}</div>
          <div className="text-[var(--text-muted)] text-xs mt-1">สถานการณ์</div>
        </div>
        <div className="game-card p-3 text-center">
          <div className="text-2xl font-bold text-[var(--xp-blue)]">{progress?.quiz_sessions_done ?? 0}</div>
          <div className="text-[var(--text-muted)] text-xs mt-1">แบบทดสอบ</div>
        </div>
        <div className="game-card p-3 text-center">
          <div className="text-2xl font-bold text-[var(--level-green)]">{progress?.streak_days ?? 0}</div>
          <div className="text-[var(--text-muted)] text-xs mt-1">วันต่อเนื่อง</div>
        </div>
      </div>
    </div>
  )
}
