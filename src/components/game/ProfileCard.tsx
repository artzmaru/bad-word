'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { xpToLevel, xpProgressInLevel } from '@/lib/utils'

interface ProfileCardProps {
  id: string
  name: string
  emoji: string
  color: string       // hex bg color for avatar
  totalXP: number
  isActive?: boolean
  onClick?: (id: string) => void
  className?: string
}

export default function ProfileCard({
  id,
  name,
  emoji,
  color,
  totalXP,
  isActive = false,
  onClick,
  className,
}: ProfileCardProps) {
  const [pressed, setPressed] = useState(false)
  const level = xpToLevel(totalXP)
  const xpInLevel = xpProgressInLevel(totalXP)

  const LEVEL_RING_COLORS: Record<number, string> = {
    1: '#22c55e',
    2: '#3b82f6',
    3: '#f59e0b',
    4: '#ef4444',
    5: '#8b5cf6',
  }
  const ringColor = LEVEL_RING_COLORS[Math.min(5, Math.max(1, level))]

  return (
    <button
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => {
        setPressed(false)
        onClick?.(id)
      }}
      onPointerLeave={() => setPressed(false)}
      className={cn(
        'relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all select-none w-36',
        isActive
          ? 'border-[var(--gold)] bg-[var(--bg-elevated)] shadow-[0_0_16px_rgba(245,200,66,0.4)]'
          : 'border-[rgba(56,189,248,0.25)] bg-[var(--bg-card)] hover:border-sky-400/50',
        pressed ? 'scale-95' : 'scale-100',
        className,
      )}
    >
      {/* Active indicator */}
      {isActive && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
          กำลังเล่น
        </span>
      )}

      {/* Avatar */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl relative"
        style={{
          background: color,
          boxShadow: `0 0 0 3px ${ringColor}, 0 0 0 5px rgba(0,0,0,0.3)`,
        }}
      >
        {emoji}
        {/* Level badge overlay */}
        <span
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: ringColor }}
        >
          {level}
        </span>
      </div>

      {/* Name */}
      <p className="font-bold text-[var(--text-primary)] text-sm truncate w-full text-center">
        {name}
      </p>

      {/* XP mini-bar */}
      <div className="w-full space-y-1">
        <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${xpInLevel}%`, background: ringColor }}
          />
        </div>
        <p className="text-[10px] text-[var(--text-muted)] text-center">
          {totalXP.toLocaleString()} XP
        </p>
      </div>
    </button>
  )
}
