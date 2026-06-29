'use client'

import { useMemo } from 'react'
import { WordCard } from '@/components/game'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'
import { useWords, useWordProgress } from '@/lib/queries/words'
import { useAuthStore } from '@/lib/auth/store'
import { cn } from '@/lib/utils'

const LEVEL_COLORS: Record<number, string> = {
  1: 'text-green-400',
  2: 'text-blue-400',
  3: 'text-yellow-400',
  4: 'text-red-400',
  5: 'text-purple-400',
}

export default function EncyclopediaPage() {
  const activeChildId = useAuthStore((s) => s.activeChildId)
  const { tab, langFilter, levelFilter, searchQuery, setTab, setLangFilter, setLevelFilter, setSearchQuery } =
    useEncyclopediaStore()

  const { data: words, isLoading } = useWords()
  const { data: progressRows } = useWordProgress(activeChildId)

  const progressMap = useMemo(() => {
    const map = new Map<string, { seen_at: string | null; learned_at: string | null }>()
    if (progressRows) {
      for (const row of progressRows) {
        map.set(row.word_id, { seen_at: row.seen_at, learned_at: row.learned_at })
      }
    }
    return map
  }, [progressRows])

  const filteredWords = useMemo(() => {
    if (!words) return []
    return words.filter((w) => {
      if (langFilter !== 'both' && w.lang !== langFilter) return false
      if (levelFilter !== null && w.level !== levelFilter) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (!w.word.toLowerCase().includes(q) && !w.meaning.toLowerCase().includes(q)) return false
      }
      if (tab === 'learned') {
        if (!progressMap.get(w.id)?.learned_at) return false
      }
      return true
    })
  }, [words, langFilter, levelFilter, searchQuery, tab, progressMap])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-shrink-0 bg-[var(--bg-card)] border-b border-[var(--game-border)] px-4 pt-3 pb-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setTab('all')}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors',
                tab === 'all'
                  ? 'bg-[var(--xp-blue)] text-[var(--bg-page)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]',
              )}
            >
              📚 ทั้งหมด
            </button>
            <button
              onClick={() => setTab('learned')}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors',
                tab === 'learned'
                  ? 'bg-[var(--gold)] text-[var(--bg-page)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]',
              )}
            >
              ⭐ เรียนรู้แล้ว
            </button>
          </div>
          <div className="flex gap-1">
            {(['th', 'en', 'both'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLangFilter(l)}
                className={cn(
                  'px-2.5 py-1 rounded text-xs font-semibold transition-colors',
                  langFilter === l
                    ? 'bg-[var(--xp-blue)] text-[var(--bg-page)]'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]',
                )}
              >
                {l === 'th' ? 'ไทย' : l === 'en' ? 'ENG' : 'ทั้งหมด'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาคำ..."
            className="w-full bg-[var(--bg-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-lg pl-9 pr-4 py-2 text-sm outline-none border border-[var(--game-border)] focus:border-[var(--xp-blue)]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
          <button
            onClick={() => setLevelFilter(null)}
            className={cn(
              'flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors',
              levelFilter === null
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--xp-blue)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]',
            )}
          >
            ทั้งหมด
          </button>
          {[1, 2, 3, 4, 5].map((lv) => (
            <button
              key={lv}
              onClick={() => setLevelFilter(lv === levelFilter ? null : lv)}
              className={cn(
                'flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors',
                levelFilter === lv
                  ? cn('bg-[var(--bg-elevated)] border', LEVEL_COLORS[lv], 'border-current')
                  : cn('bg-[var(--bg-elevated)]', LEVEL_COLORS[lv]),
              )}
            >
              Lv.{lv}
            </button>
          ))}
        </div>
      </div>

      <p className="flex-shrink-0 text-[var(--text-muted)] text-xs px-4 py-1">
        {filteredWords.length} คำ
      </p>

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="game-card animate-pulse h-32" />
            ))}
          </div>
        ) : filteredWords.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <span className="text-4xl">🔍</span>
            <p className="text-[var(--text-muted)] text-sm">ไม่พบคำ</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {filteredWords.map((w) => {
              const prog = progressMap.get(w.id)
              return (
                <WordCard
                  key={w.id}
                  id={w.id}
                  word={w.word}
                  lang={w.lang as 'th' | 'en'}
                  level={w.level as 1 | 2 | 3 | 4 | 5}
                  meaning={w.meaning}
                  faceBase={w.face_base}
                  faceShadow={w.face_shadow}
                  faceHighlight={w.face_highlight}
                  faceExpression={w.face_expression as 'happy' | 'excited' | 'neutral' | 'sad' | 'angry'}
                  isSeen={!!prog?.seen_at}
                  isLearned={!!prog?.learned_at}
                  size="sm"
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
