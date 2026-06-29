export const colors = {
  bgPage: '#0b1837',
  bgCard: '#0f2347',
  bgElevated: '#162d5a',
  textPrimary: '#e8f4ff',
  textMuted: '#7a9cc0',
  gold: '#f5c842',
  xpBlue: '#38bdf8',
  levelGreen: '#22c55e',

  navy900: '#0b1837',
  navy800: '#0f2347',
  navy700: '#162d5a',
  navy600: '#1e3a6e',

  levelColors: {
    1: '#22c55e',
    2: '#3b82f6',
    3: '#f59e0b',
    4: '#ef4444',
    5: '#8b5cf6',
  } as Record<number, string>,
} as const

export const chestColors = {
  brown: { bg: '#92400e', shadow: '#78350f', label: '#fde68a' },
  purple: { bg: '#7c3aed', shadow: '#6d28d9', label: '#ede9fe' },
  red: { bg: '#dc2626', shadow: '#b91c1c', label: '#fee2e2' },
} as const

export type ChestColor = keyof typeof chestColors
