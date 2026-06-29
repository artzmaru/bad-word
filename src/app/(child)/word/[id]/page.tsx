'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MinecraftFace, LevelBadge } from '@/components/game'
import { useWord, useWordProgress } from '@/lib/queries/words'
import { useMarkWordSeenMutation, useMarkWordLearnedMutation } from '@/lib/mutations/index'
import { useAuthStore } from '@/lib/auth/store'
import { cn } from '@/lib/utils'
import type { Tables } from '@/lib/supabase/database.types'

type WordDetail = Tables<'word_details'>

function Chip({ label, variant }: { label: string; variant: 'green' | 'red' | 'blue' }) {
  const styles = {
    green: 'bg-green-900/50 text-green-300 border border-green-700',
    red: 'bg-red-900/50 text-red-300 border border-red-700',
    blue: 'bg-blue-900/50 text-blue-300 border border-blue-700',
  }
  return (
    <span className={cn('inline-block px-2.5 py-0.5 rounded-full text-xs font-medium', styles[variant])}>
      {label}
    </span>
  )
}

export default function WordDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const activeChildId = useAuthStore((s) => s.activeChildId)
  const { data: word, isLoading } = useWord(params.id)
  const { data: progressRows } = useWordProgress(activeChildId)
  const markSeen = useMarkWordSeenMutation()
  const markLearned = useMarkWordLearnedMutation()
  const hasSeen = useRef(false)
  const [toastVisible, setToastVisible] = useState(false)

  const detail = (word?.word_details?.[0] ?? null) as WordDetail | null

  const progress = progressRows?.find((p) => p.word_id === params.id)
  const isLearned = !!progress?.learned_at

  useEffect(() => {
    if (!hasSeen.current && activeChildId && word) {
      hasSeen.current = true
      markSeen.mutate({ childId: activeChildId, wordId: params.id })
    }
  }, [activeChildId, word])

  const handleLearn = () => {
    if (!activeChildId) return
    markLearned.mutate(
      { childId: activeChildId, wordId: params.id },
      {
        onSuccess: () => {
          setToastVisible(true)
          setTimeout(() => {
            setToastVisible(false)
            router.back()
          }, 1200)
        },
      },
    )
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[var(--text-muted)] text-sm">กำลังโหลด...</p>
      </div>
    )
  }

  if (!word) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[var(--text-muted)] text-sm">ไม่พบคำนี้</p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto pb-24">
      <div className="px-6 pt-4 pb-8 max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
        >
          ← กลับ
        </button>

        <div className="flex flex-col items-center gap-3 mb-6">
          <MinecraftFace
            size={120}
            expression={word.face_expression as 'happy' | 'excited' | 'neutral' | 'sad' | 'angry'}
            faceColor={word.face_base}
            shadowColor={word.face_shadow}
            highlightColor={word.face_highlight}
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{word.word}</h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <LevelBadge level={word.level as 1 | 2 | 3 | 4 | 5} size="md" showLabel />
              <span className="bg-[var(--bg-elevated)] text-[var(--text-muted)] text-xs px-2 py-0.5 rounded border border-[var(--game-border)] uppercase">
                {word.lang}
              </span>
            </div>
            <div className="flex items-center justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={cn('text-lg', i < word.level ? 'text-[var(--gold)]' : 'text-[var(--bg-elevated)]')}>
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="game-card p-4">
            <h2 className="text-[var(--xp-blue)] font-semibold text-sm mb-2">💬 ความหมาย</h2>
            <p className="text-[var(--text-primary)] leading-relaxed">{word.meaning}</p>
          </div>

          {detail && (detail.example_th || detail.example_en) && (
            <div className="game-card p-4">
              <h2 className="text-[var(--xp-blue)] font-semibold text-sm mb-3">📝 ตัวอย่างการใช้</h2>
              {detail.example_th && (
                <p className="text-[var(--text-primary)] text-sm mb-1.5">
                  <span className="text-[var(--text-muted)]">TH: </span>
                  {detail.example_th}
                </p>
              )}
              {detail.example_en && (
                <p className="text-[var(--text-primary)] text-sm">
                  <span className="text-[var(--text-muted)]">EN: </span>
                  {detail.example_en}
                </p>
              )}
            </div>
          )}

          {detail?.severity_text && (
            <div className="game-card p-4">
              <h2 className="text-[var(--xp-blue)] font-semibold text-sm mb-2">⚖️ ระดับความรุนแรง</h2>
              <p className="text-[var(--text-primary)] text-sm">{detail.severity_text}</p>
            </div>
          )}

          {detail?.has_danger_flag && (
            <div className="bg-red-900/50 border border-red-500 rounded-xl p-4">
              <p className="text-red-200 text-sm font-semibold">⚠️ คำนี้อันตราย — ห้ามใช้กับคนอื่นเด็ดขาด</p>
            </div>
          )}

          {detail && (
            <div className="game-card p-4 space-y-3">
              {detail.can_use_with && (detail.can_use_with as string[]).length > 0 && (
                <div>
                  <h2 className="text-[var(--xp-blue)] font-semibold text-sm mb-2">✅ ใช้ได้กับ</h2>
                  <div className="flex flex-wrap gap-2">
                    {(detail.can_use_with as string[]).map((item) => (
                      <Chip key={item} label={item} variant="green" />
                    ))}
                  </div>
                </div>
              )}

              {detail.never_use_with && (detail.never_use_with as string[]).length > 0 && (
                <div>
                  <h2 className="text-[var(--xp-blue)] font-semibold text-sm mb-2">❌ ห้ามใช้กับ</h2>
                  <div className="flex flex-wrap gap-2">
                    {(detail.never_use_with as string[]).map((item) => (
                      <Chip key={item} label={item} variant="red" />
                    ))}
                  </div>
                </div>
              )}

              {detail.alternatives && (detail.alternatives as string[]).length > 0 && (
                <div>
                  <h2 className="text-[var(--xp-blue)] font-semibold text-sm mb-2">💡 คำทดแทน</h2>
                  <div className="flex flex-wrap gap-2">
                    {(detail.alternatives as string[]).map((item) => (
                      <Chip key={item} label={item} variant="blue" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {detail?.impact && (
            <div className="game-card p-4">
              <h2 className="text-[var(--xp-blue)] font-semibold text-sm mb-2">💥 ผลกระทบ</h2>
              <p className="text-[var(--text-primary)] text-sm leading-relaxed">{detail.impact}</p>
            </div>
          )}
        </div>
      </div>

      {activeChildId && (
        <div className="fixed bottom-16 left-0 right-0 px-6 py-3 bg-[var(--bg-page)] border-t border-[var(--game-border)]">
          <button
            onClick={handleLearn}
            disabled={isLearned || markLearned.isPending}
            className={cn(
              'w-full py-3 rounded-xl font-bold text-base transition-all',
              isLearned
                ? 'bg-green-700/50 text-green-300 cursor-default'
                : 'bg-[var(--xp-blue)] text-[var(--bg-page)] active:scale-95',
            )}
          >
            {isLearned ? '✓ เรียนรู้แล้ว' : 'เรียนรู้แล้ว! ✓'}
          </button>
        </div>
      )}

      {toastVisible && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg animate-[slide-in_0.2s_ease-out]">
          🎉 บันทึกแล้ว!
        </div>
      )}
    </div>
  )
}
