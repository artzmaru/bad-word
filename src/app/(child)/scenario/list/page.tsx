'use client'

import { useRouter } from 'next/navigation'
import { scenarioData } from '@/content/scenario-data'

const categoryChip: Record<string, string> = {
  gaming: 'bg-purple-900/60 text-purple-300',
  school: 'bg-blue-900/60 text-blue-300',
  online: 'bg-yellow-900/60 text-yellow-300',
  home: 'bg-green-900/60 text-green-300',
}

export default function ScenarioListPage() {
  const router = useRouter()

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 pt-4 pb-2">
        <h1 className="text-xl font-bold text-[var(--text-primary)]">🎮 เลือกสถานการณ์</h1>
        <p className="text-[var(--text-muted)] text-sm mt-0.5">ฝึกเลือกคำพูดที่ดีในสถานการณ์ต่างๆ</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
        <div className="grid grid-cols-2 gap-4">
          {scenarioData.map((s) => (
            <button
              key={s.id}
              onClick={() => router.push(`/scenario/${s.id}`)}
              className="game-card p-4 flex items-start gap-4 text-left active:scale-95 hover:border-[var(--xp-blue)] transition-all cursor-pointer"
            >
              <span className="text-3xl">{s.imageSituation === 'gaming' ? '🎮' : s.imageSituation === 'school' ? '🏫' : s.imageSituation === 'online' ? '💻' : s.imageSituation === 'home' ? '🏠' : s.imageSituation}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[var(--text-primary)] leading-tight">{s.titleTh}</p>
                <p className="text-[var(--text-muted)] text-xs mt-0.5">{s.titleEn}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryChip[s.category] ?? 'bg-gray-700 text-gray-300'}`}>
                    {s.category}
                  </span>
                  <span className="text-xs text-[var(--gold)]">
                    {'⭐'.repeat(s.difficultyLevel)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
