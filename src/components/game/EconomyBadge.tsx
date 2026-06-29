'use client'

import { cn } from '@/lib/utils'

interface EconomyBadgeProps {
  type: 'coins' | 'gems' | 'xp'
  value: number
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
  className?: string
}

const ICONS = {
  coins: '🪙',
  gems:  '💎',
  xp:    '⭐',
}

const COLORS = {
  coins: 'text-yellow-400',
  gems:  'text-cyan-400',
  xp:    'text-sky-400',
}

const SIZE_CLASSES = {
  sm: 'text-xs gap-0.5',
  md: 'text-sm gap-1',
  lg: 'text-base gap-1.5',
}

export default function EconomyBadge({
  type,
  value,
  size = 'md',
  animate = false,
  className,
}: EconomyBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-bold',
        SIZE_CLASSES[size],
        COLORS[type],
        animate && 'animate-bounce',
        className,
      )}
    >
      <span>{ICONS[type]}</span>
      <span>{value.toLocaleString()}</span>
    </span>
  )
}
