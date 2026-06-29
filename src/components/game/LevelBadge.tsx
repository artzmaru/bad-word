'use client'

import { cn } from '@/lib/utils'

interface LevelBadgeProps {
  level: 1 | 2 | 3 | 4 | 5
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const LEVEL_LABELS: Record<number, string> = {
  1: 'สุภาพ',
  2: 'ไม่สุภาพ',
  3: 'หยาบ',
  4: 'รุนแรง',
  5: 'อันตราย',
}

const SIZE_CLASSES = {
  sm: 'text-xs px-1.5 py-0.5 rounded',
  md: 'text-sm px-2 py-0.5 rounded-md',
  lg: 'text-base px-3 py-1 rounded-lg font-bold',
}

const LEVEL_CLASSES = {
  1: 'bg-green-500 text-white',
  2: 'bg-blue-500 text-white',
  3: 'bg-yellow-500 text-black',
  4: 'bg-red-500 text-white',
  5: 'bg-purple-600 text-white',
}

export default function LevelBadge({
  level,
  size = 'md',
  showLabel = false,
  className,
}: LevelBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold',
        SIZE_CLASSES[size],
        LEVEL_CLASSES[level],
        className,
      )}
    >
      <span>Lv.{level}</span>
      {showLabel && <span>{LEVEL_LABELS[level]}</span>}
    </span>
  )
}
