import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function xpToLevel(xp: number): number {
  return Math.max(1, Math.min(99, Math.floor(xp / 100) + 1))
}

export function xpProgressInLevel(xp: number): number {
  return xp % 100
}

export function levelLabel(level: number): string {
  const labels: Record<number, string> = {
    1: 'ระดับ 1 — คำสุภาพ',
    2: 'ระดับ 2 — คำไม่สุภาพ',
    3: 'ระดับ 3 — คำหยาบ',
    4: 'ระดับ 4 — คำรุนแรง',
    5: 'ระดับ 5 — คำอันตราย',
  }
  return labels[level] ?? `ระดับ ${level}`
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}
