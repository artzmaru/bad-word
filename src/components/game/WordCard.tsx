'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import MinecraftFace, { FaceExpression } from './MinecraftFace'
import LevelBadge from './LevelBadge'

interface WordCardProps {
  id: string
  word: string
  lang: 'en' | 'th'
  level: 1 | 2 | 3 | 4 | 5
  meaning: string
  faceBase?: string
  faceShadow?: string
  faceHighlight?: string
  faceExpression?: FaceExpression
  isSeen?: boolean
  isLearned?: boolean
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
}

const SIZE_CONFIG = {
  sm: { face: 40, cardClass: 'p-3 gap-2', wordClass: 'text-base', meaningClass: 'text-xs' },
  md: { face: 56, cardClass: 'p-4 gap-3', wordClass: 'text-lg', meaningClass: 'text-sm' },
  lg: { face: 72, cardClass: 'p-5 gap-4', wordClass: 'text-xl', meaningClass: 'text-base' },
}

export default function WordCard({
  id,
  word,
  lang,
  level,
  meaning,
  faceBase,
  faceShadow,
  faceHighlight,
  faceExpression = 'neutral',
  isSeen = false,
  isLearned = false,
  size = 'md',
  onClick,
  className,
}: WordCardProps) {
  const router = useRouter()
  const [pressed, setPressed] = useState(false)
  const cfg = SIZE_CONFIG[size]

  const handlePress = () => {
    setPressed(true)
    setTimeout(() => setPressed(false), 150)
    if (onClick) {
      onClick()
    } else {
      router.push(`/word/${id}`)
    }
  }

  return (
    <button
      onPointerDown={() => setPressed(true)}
      onPointerUp={handlePress}
      onPointerLeave={() => setPressed(false)}
      className={cn(
        'game-card flex items-center text-left w-full transition-transform select-none',
        cfg.cardClass,
        pressed ? 'scale-95' : 'scale-100',
        className,
      )}
    >
      {/* Face */}
      <div className="relative shrink-0">
        <MinecraftFace
          size={cfg.face}
          expression={faceExpression}
          faceColor={faceBase}
          shadowColor={faceShadow}
          highlightColor={faceHighlight}
        />
        {isLearned && (
          <span className="absolute -top-1 -right-1 text-[10px] bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
            ✓
          </span>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={cn('font-bold text-[var(--text-primary)] truncate', cfg.wordClass)}>
            {word}
          </span>
          <LevelBadge level={level} size="sm" />
        </div>
        <p className={cn('text-[var(--text-muted)] truncate', cfg.meaningClass)}>{meaning}</p>
      </div>

      {/* Status dots */}
      <div className="shrink-0 flex flex-col gap-1 items-center">
        <span
          className={cn(
            'w-2 h-2 rounded-full',
            isSeen ? 'bg-sky-400' : 'bg-[var(--bg-elevated)]',
          )}
          title="เห็นแล้ว"
        />
        <span
          className={cn(
            'w-2 h-2 rounded-full',
            isLearned ? 'bg-green-400' : 'bg-[var(--bg-elevated)]',
          )}
          title="เรียนรู้แล้ว"
        />
      </div>
    </button>
  )
}
