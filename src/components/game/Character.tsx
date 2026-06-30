'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export type CharacterName = 'fifok' | 'noon' | 'nong_guy'
export type CharacterMood = 'idle' | 'happy' | 'sad' | 'surprised' | 'thinking' | 'excited' | 'normal'

interface CharacterProps {
  name?: CharacterName
  mood?: CharacterMood
  size?: number
  animate?: boolean
  className?: string
  /** @deprecated kept for backwards-compat, ignored when using PNG */
  color?: string
}

function moodToState(mood: CharacterMood): 'normal' | 'happy' | 'sad' | 'excited' {
  switch (mood) {
    case 'happy': return 'happy'
    case 'sad': return 'sad'
    case 'surprised':
    case 'excited': return 'excited'
    case 'thinking':
    case 'idle':
    case 'normal':
    default: return 'normal'
  }
}

export default function Character({
  name = 'fifok',
  mood = 'idle',
  size = 120,
  animate = true,
  className,
}: CharacterProps) {
  const state = moodToState(mood)
  const src = `/assets/characters/character_${name}_${state}@2x.png`

  return (
    <div
      className={cn(
        'relative select-none flex-shrink-0',
        animate && (mood === 'happy' || mood === 'excited') && 'animate-[bob_0.6s_ease-in-out_infinite]',
        animate && (mood === 'idle' || mood === 'normal' || mood === 'thinking') && 'animate-[bob_2s_ease-in-out_infinite]',
        className,
      )}
      style={{ width: size, height: size * 1.4 }}
    >
      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
      <Image
        src={src}
        alt={`${name} ${state}`}
        fill
        className="object-contain"
        priority={false}
        sizes={`${size}px`}
      />
    </div>
  )
}
