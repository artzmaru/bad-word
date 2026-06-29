'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/home', label: 'หน้าหลัก', icon: '🏠' },
  { href: '/encyclopedia', label: 'คำศัพท์', icon: '📖' },
  { href: '/quiz', label: 'แบบทดสอบ', icon: '🎯' },
]

export function ChildBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-shrink-0 border-t border-[var(--game-border)] bg-[var(--bg-card)]">
      <div className="flex justify-around items-center h-16">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg transition-colors',
                active
                  ? 'text-[var(--xp-blue)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              )}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
