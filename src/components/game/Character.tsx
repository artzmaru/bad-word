'use client'

import { cn } from '@/lib/utils'

type CharacterMood = 'idle' | 'happy' | 'sad' | 'surprised' | 'thinking'

interface CharacterProps {
  mood?: CharacterMood
  color?: string       // skin/body tint
  size?: number
  animate?: boolean
  className?: string
}

// Simple blocky character — Minecraft-inspired
export default function Character({
  mood = 'idle',
  color = '#38bdf8',
  size = 120,
  animate = true,
  className,
}: CharacterProps) {
  const eyeY = mood === 'happy' ? '38' : mood === 'sad' ? '42' : '38'
  const mouthPath =
    mood === 'happy'    ? 'M28 54 Q36 62 44 54'
    : mood === 'sad'    ? 'M28 60 Q36 52 44 60'
    : mood === 'surprised' ? 'M30 56 Q36 64 42 56 Q36 72 30 56'
    : 'M28 56 L44 56'

  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 72 108"
      className={cn(
        'select-none',
        animate && mood === 'idle' && 'animate-[bob_2s_ease-in-out_infinite]',
        animate && mood === 'happy' && 'animate-[bob_0.6s_ease-in-out_infinite]',
        className,
      )}
      style={{ imageRendering: 'pixelated' }}
    >
      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      {/* Shadow */}
      <ellipse cx="36" cy="106" rx="20" ry="4" fill="rgba(0,0,0,0.25)" />

      {/* Body */}
      <rect x="18" y="56" width="36" height="32" rx="2" fill={color} />
      <rect x="18" y="56" width="36" height="6" rx="1" fill="rgba(0,0,0,0.15)" />

      {/* Left arm */}
      <rect x="6" y="58" width="10" height="26" rx="3" fill={color} />
      <rect x="6" y="58" width="10" height="4" rx="1" fill="rgba(0,0,0,0.15)" />

      {/* Right arm */}
      <rect x="56" y="58" width="10" height="26" rx="3" fill={color} />
      <rect x="56" y="58" width="10" height="4" rx="1" fill="rgba(0,0,0,0.15)" />

      {/* Left leg */}
      <rect x="20" y="88" width="13" height="18" rx="3" fill={color} />
      {/* Right leg */}
      <rect x="39" y="88" width="13" height="18" rx="3" fill={color} />

      {/* Head */}
      <rect x="12" y="10" width="48" height="48" rx="4" fill={color} />
      {/* Head shading */}
      <rect x="12" y="10" width="48" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
      <rect x="12" y="10" width="8" height="48" rx="4" fill="rgba(255,255,255,0.1)" />

      {/* Eyes */}
      <rect x="22" y={eyeY} width="10" height="10" rx="2" fill="#0b1837" />
      <rect x="40" y={eyeY} width="10" height="10" rx="2" fill="#0b1837" />
      {/* Eye shine */}
      <rect x="24" y={String(Number(eyeY) + 1)} width="3" height="3" rx="1" fill="white" opacity="0.7" />
      <rect x="42" y={String(Number(eyeY) + 1)} width="3" height="3" rx="1" fill="white" opacity="0.7" />

      {/* Mouth */}
      <path
        d={mouthPath}
        stroke="#0b1837"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Mood accessory */}
      {mood === 'thinking' && (
        <g>
          <circle cx="54" cy="12" r="3" fill="white" opacity="0.8" />
          <circle cx="60" cy="7" r="4" fill="white" opacity="0.7" />
          <circle cx="68" cy="3" r="5" fill="white" opacity="0.6" />
          <text x="65" y="6" fontSize="6" fill="#0b1837" textAnchor="middle">?</text>
        </g>
      )}
      {mood === 'surprised' && (
        <text x="60" y="16" fontSize="14" textAnchor="middle">!</text>
      )}
    </svg>
  )
}
