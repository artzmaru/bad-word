'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/auth/store'
import { cn } from '@/lib/utils'

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        'w-12 h-6 rounded-full transition-colors flex items-center',
        value ? 'bg-[var(--xp-blue)]' : 'bg-[var(--bg-elevated)]'
      )}
    >
      <div
        className={cn(
          'w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5',
          value ? 'translate-x-6' : ''
        )}
      />
    </button>
  )
}

export default function ParentSettingsPage() {
  const router = useRouter()
  const exitParentMode = useAuthStore((s) => s.exitParentMode)
  const [parentId, setParentId] = useState<string | null>(null)
  const [showLevel45, setShowLevel45] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      const uid = data.user?.id ?? null
      setParentId(uid)
      if (uid) {
        createClient()
          .from('parent_settings')
          .select('*')
          .eq('parent_id', uid)
          .single()
          .then(({ data: settings }) => {
            if (settings) {
              setShowLevel45(settings.show_level_4_5_to_child ?? false)
            }
          })
      }
    })
  }, [])

  async function handleToggle(newValue: boolean) {
    if (!parentId) return
    setShowLevel45(newValue)
    setSaving(true)
    await createClient()
      .from('parent_settings')
      .upsert({ parent_id: parentId, show_level_4_5_to_child: newValue })
    setSaving(false)
  }

  async function handleSignOut() {
    await createClient().auth.signOut()
    router.push('/login')
  }

  function handleExitParentMode() {
    exitParentMode()
    router.push('/home')
  }

  return (
    <div className="p-6 max-w-lg">
      <h2 className="text-2xl font-bold text-[var(--text-primary)]">ตั้งค่าผู้ปกครอง</h2>

      <div className="game-card p-5 mt-4">
        <h3 className="font-bold text-[var(--text-primary)] mb-3">ความปลอดภัย</h3>
        <button
          onClick={() => router.push('/pin-setup')}
          className="game-btn-3d bg-[var(--bg-elevated)] text-[var(--text-primary)] px-4 py-2.5 rounded-xl text-sm font-medium border border-[var(--game-border)]"
        >
          เปลี่ยน PIN
        </button>
      </div>

      <div className="game-card p-5 mt-4">
        <h3 className="font-bold text-[var(--text-primary)] mb-3">การแสดงผล</h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-[var(--text-primary)] text-sm font-medium">
              แสดงคำระดับ 4-5 ให้เด็กเห็น
            </div>
            <div className="text-[var(--text-muted)] text-xs mt-0.5">
              ระดับ 4-5 มีคำหยาบคาย ปิดไว้เพื่อความปลอดภัย
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {saving && <span className="text-xs text-[var(--text-muted)]">บันทึก...</span>}
            <Toggle value={showLevel45} onChange={handleToggle} />
          </div>
        </div>
      </div>

      <div className="game-card p-5 mt-4 space-y-3">
        <h3 className="font-bold text-[var(--text-primary)] mb-3">ข้อมูลบัญชี</h3>
        <button
          onClick={handleExitParentMode}
          className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors game-btn-3d"
        >
          ออกจากโหมดผู้ปกครอง
        </button>
        <button
          onClick={handleSignOut}
          className="w-full py-2.5 rounded-xl border border-[var(--game-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors font-medium"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  )
}
