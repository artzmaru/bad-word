'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface XPBarProps {
  level: number
  xpInLevel: number    // 0–99
  totalXP: number
  className?: string
  compact?: boolean
}

export default function XPBar({
  level,
  xpInLevel,
  totalXP,
  className,
  compact = false,
}: XPBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const pct = Math.min(100, Math.max(0, xpInLevel))

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${pct}%`
    }
  }, [pct])

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <LevelCircle level={level} size="sm" />
        <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden border border-sky-900/40">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-sky-500 to-blue-400 rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-sky-400 font-mono tabular-nums w-12 text-right">
          {xpInLevel}/100
        </span>
      </div>
    )
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LevelCircle level={level} size="md" />
          <div>
            <p className="text-xs text-[var(--text-muted)]">ระดับ {level}</p>
            <p className="text-sm font-bold text-[var(--text-primary)]">XP {totalXP.toLocaleString()}</p>
          </div>
        </div>
        <span className="text-sky-400 text-sm font-mono tabular-nums">{xpInLevel}/100</span>
      </div>

      <div className="h-4 bg-[var(--bg-elevated)] rounded-full overflow-hidden border border-sky-900/40 relative">
        {/* Track segments */}
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-sky-900/30"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-sky-500 to-blue-400 rounded-full transition-[width] duration-700 ease-out relative"
          style={{ width: `${pct}%` }}
        >
          {pct > 10 && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">
              {pct}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function LevelCircle({ level, size }: { level: number; size: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'w-6 h-6 text-xs' : 'w-9 h-9 text-sm'
  const COLORS: Record<number, string> = {
    1: 'bg-green-500',
    2: 'bg-blue-500',
    3: 'bg-yellow-500 text-black',
    4: 'bg-red-500',
    5: 'bg-purple-600',
  }
  const colorClass = COLORS[Math.min(5, Math.max(1, level))] ?? 'bg-gray-500'
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold text-white shrink-0',
        sizeClass,
        colorClass,
      )}
    >
      {level}
    </div>
  )
}
