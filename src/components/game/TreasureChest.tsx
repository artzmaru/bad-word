'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { chestColors, type ChestColor } from '@/lib/tokens'

interface TreasureChestProps {
  color?: ChestColor
  xpReward?: number
  label?: string
  onOpen?: () => void
  disabled?: boolean
  className?: string
}

export default function TreasureChest({
  color = 'brown',
  xpReward,
  label,
  onOpen,
  disabled = false,
  className,
}: TreasureChestProps) {
  const [state, setState] = useState<'closed' | 'opening' | 'open'>('closed')
  const palette = chestColors[color]

  const handleTap = () => {
    if (disabled || state !== 'closed') return
    setState('opening')
    setTimeout(() => {
      setState('open')
      onOpen?.()
    }, 400)
  }

  return (
    <button
      onClick={handleTap}
      disabled={disabled || state !== 'closed'}
      className={cn(
        'relative flex flex-col items-center gap-2 select-none transition-transform active:scale-95',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {/* Chest SVG */}
      <svg
        width="72"
        height="60"
        viewBox="0 0 72 60"
        className={cn(
          'transition-transform duration-300',
          state === 'opening' && 'scale-110',
          state === 'open' && 'scale-105',
        )}
      >
        {/* Shadow */}
        <ellipse cx="36" cy="58" rx="28" ry="4" fill="rgba(0,0,0,0.3)" />

        {/* Chest body */}
        <rect x="4" y="28" width="64" height="28" rx="3" fill={palette.shadow} />
        <rect x="4" y="26" width="64" height="28" rx="3" fill={palette.bg} />

        {/* Chest body highlight */}
        <rect x="6" y="28" width="60" height="4" rx="1" fill={palette.label} opacity="0.3" />

        {/* Lock plate */}
        <rect x="28" y="34" width="16" height="12" rx="2" fill={palette.shadow} />
        <rect x="29" y="33" width="14" height="12" rx="2" fill={palette.label} opacity="0.8" />
        <circle cx="36" cy="38" r="3" fill={palette.shadow} />
        <rect x="34" y="39" width="4" height="4" rx="1" fill={palette.shadow} />

        {/* Lid */}
        <g
          className="transition-transform duration-400 origin-[36px_28px]"
          style={{
            transform: state === 'open'
              ? 'rotate(-100deg) translateY(-2px)'
              : state === 'opening'
              ? 'rotate(-60deg)'
              : 'rotate(0deg)',
            transformOrigin: '36px 28px',
            transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <rect x="4" y="8" width="64" height="22" rx="3" fill={palette.shadow} />
          <rect x="4" y="6" width="64" height="22" rx="3" fill={palette.bg} />
          <rect x="6" y="8" width="60" height="4" rx="1" fill={palette.label} opacity="0.3" />
          {/* Lid straps */}
          <rect x="12" y="6" width="6" height="22" rx="1" fill={palette.shadow} opacity="0.5" />
          <rect x="54" y="6" width="6" height="22" rx="1" fill={palette.shadow} opacity="0.5" />
        </g>

        {/* Sparkles when open */}
        {state === 'open' && (
          <g className="animate-ping" style={{ animationDuration: '0.8s', animationIterationCount: 1 }}>
            <circle cx="20" cy="20" r="3" fill="#f5c842" opacity="0.8" />
            <circle cx="52" cy="16" r="2" fill="#f5c842" opacity="0.7" />
            <circle cx="36" cy="10" r="4" fill="#f5c842" opacity="0.9" />
          </g>
        )}
      </svg>

      {/* Reward popup */}
      {state === 'open' && xpReward && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-black text-sm font-bold px-3 py-1 rounded-full animate-bounce whitespace-nowrap">
          +{xpReward} XP ⭐
        </div>
      )}

      {/* Label */}
      {label && (
        <span
          className="text-xs font-semibold rounded px-2 py-0.5"
          style={{ background: palette.shadow, color: palette.label }}
        >
          {label}
        </span>
      )}

      {/* Tap hint */}
      {state === 'closed' && !disabled && (
        <span className="text-[10px] text-[var(--text-muted)] animate-pulse">แตะเพื่อเปิด</span>
      )}
    </button>
  )
}
