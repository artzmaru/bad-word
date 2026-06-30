'use client'

import Image from 'next/image'

export type FaceExpression = 'happy' | 'excited' | 'neutral' | 'sad' | 'angry'

interface MinecraftFaceProps {
  size?: number
  expression?: FaceExpression
  faceColor?: string
  shadowColor?: string
  highlightColor?: string
  className?: string
  /** Word key or level-based key, e.g. "dumb", "stupid", "level_3_dizzy" */
  wordKey?: string
}

// Words that have dedicated PNG faces
const WORD_FACE_KEYS = new Set([
  'dumb', 'fat', 'idiot', 'loser', 'stupid', 'ugly',
  'level_3_5_placeholder',
  'level_3_dizzy', 'level_3_heartbreak', 'level_3_quiet', 'level_3_smirk',
  'level_4_furious', 'level_4_rude', 'level_4_yelling',
  'level_5_censored', 'level_5_snarling', 'level_5_taunting',
])

const EXPRESSIONS: Record<FaceExpression, { leftEye: string; rightEye: string; mouth: string }> = {
  happy: {
    leftEye:   'M2 2h1v1H2z M3 3h1v1H3z',
    rightEye:  'M5 2h1v1H5z M4 3h1v1H4z',
    mouth:     'M2 5h1v1H2z M3 6h1v1H3z M4 6h1v1H4z M5 5h1v1H5z',
  },
  excited: {
    leftEye:   'M2 2h2v2H2z',
    rightEye:  'M5 2h2v2H5z',
    mouth:     'M2 5h1v1H2z M3 6h3v1H3z M6 5h1v1H6z',
  },
  neutral: {
    leftEye:   'M2 2h2v2H2z',
    rightEye:  'M5 2h2v2H5z',
    mouth:     'M2 5h5v1H2z',
  },
  sad: {
    leftEye:   'M2 3h1v1H2z M3 2h1v1H3z',
    rightEye:  'M5 2h1v1H5z M6 3h1v1H6z',
    mouth:     'M2 6h1v1H2z M3 5h1v1H3z M4 5h1v1H4z M5 6h1v1H5z',
  },
  angry: {
    leftEye:   'M2 2h2v1H2z M2 3h2v1H2z',
    rightEye:  'M5 2h2v1H5z M5 3h2v1H5z',
    mouth:     'M2 5h5v1H2z M3 6h1v1H3z M5 6h1v1H5z',
  },
}

export default function MinecraftFace({
  size = 64,
  expression = 'neutral',
  faceColor = '#4ade80',
  shadowColor = '#16a34a',
  highlightColor = '#86efac',
  className = '',
  wordKey,
}: MinecraftFaceProps) {
  // Use PNG face if a matching asset exists
  if (wordKey && WORD_FACE_KEYS.has(wordKey)) {
    return (
      <div
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={`/assets/word_faces/wordface_${wordKey}@2x.png`}
          alt={wordKey}
          fill
          className="object-contain"
          sizes={`${size}px`}
        />
      </div>
    )
  }

  // SVG fallback
  const expr = EXPRESSIONS[expression]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      className={`pixel-face ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="0.5" y="0.5" width="8" height="8" fill={shadowColor} rx="0.5" />
      <rect width="8" height="8" fill={faceColor} rx="0.5" />
      <rect width="2" height="2" fill={highlightColor} opacity="0.4" />
      <g fill="#0b1837">
        <path d={expr.leftEye} />
        <path d={expr.rightEye} />
      </g>
      <g fill="#0b1837">
        <path d={expr.mouth} />
      </g>
    </svg>
  )
}
