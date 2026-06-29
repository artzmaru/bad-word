'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/auth/store'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/parent/dashboard', label: 'ภาพรวม' },
  { href: '/parent/profiles', label: 'โปรไฟล์' },
  { href: '/parent/settings', label: 'ตั้งค่า' },
  { href: '/parent/reports', label: 'รายงาน' },
]

export function ParentTopNav() {
  const pathname = usePathname()
  const exitParentMode = useAuthStore((s) => s.exitParentMode)
  const router = useRouter()

  const handleExit = () => {
    exitParentMode()
    router.push('/home')
  }

  return (
    <header className="flex-shrink-0 border-b border-[var(--game-border)] bg-[var(--bg-card)]">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                pathname.startsWith(href)
                  ? 'bg-[var(--bg-elevated)] text-[var(--xp-blue)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          onClick={handleExit}
          className="text-xs text-[var(--text-muted)] hover:text-red-400 transition-colors px-3 py-1.5"
        >
          ออก 🔒
        </button>
      </div>
    </header>
  )
}
