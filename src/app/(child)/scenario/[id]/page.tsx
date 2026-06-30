'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { scenarioData, ScenarioChoiceData } from '@/content/scenario-data'
import { Character } from '@/components/game'
import { useAuthStore } from '@/lib/auth/store'
import { useScenarioCompleteMutation } from '@/lib/mutations/index'

const categoryChip: Record<string, string> = {
  gaming: 'bg-purple-900/60 text-purple-300',
  school: 'bg-blue-900/60 text-blue-300',
  online: 'bg-yellow-900/60 text-yellow-300',
  home: 'bg-green-900/60 text-green-300',
}

const choiceLetters = ['A', 'B', 'C', 'D']

const situationEmoji: Record<string, string> = {
  gaming: '🎮',
  school: '🏫',
  online: '💻',
  home: '🏠',
}

export default function ScenarioPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const activeChildId = useAuthStore((s) => s.activeChildId)
  const scenarioComplete = useScenarioCompleteMutation()
  const savedRef = useRef(false)
  const [phase, setPhase] = useState<'situation' | 'choosing' | 'outcome'>('situation')
  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoiceData | null>(null)

  const scenario = scenarioData.find((s) => s.id === params.id)

  if (!scenario) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <p className="text-[var(--text-primary)] text-lg font-bold">ไม่พบสถานการณ์</p>
        <button
          onClick={() => router.back()}
          className="game-card px-4 py-2 text-[var(--text-muted)] text-sm hover:border-[var(--xp-blue)] transition-all"
        >
          ← กลับ
        </button>
      </div>
    )
  }

  if (phase === 'situation') {
    return (
      <div className="h-full flex gap-6 p-6">
        <div className="flex-1 flex flex-col">
          <button
            onClick={() => router.back()}
            className="self-start text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] transition-colors mb-4"
          >
            ← กลับ
          </button>

          <div className="flex-1 flex flex-col justify-center">
            <div className="text-8xl text-center mb-4">
              {situationEmoji[scenario.imageSituation] ?? scenario.imageSituation}
            </div>

            <h1 className="text-2xl font-bold text-[var(--text-primary)] text-center">{scenario.titleTh}</h1>
            <p className="text-[var(--text-muted)] text-sm text-center mt-1">{scenario.titleEn}</p>

            <div className="flex items-center justify-center gap-2 mt-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryChip[scenario.category] ?? 'bg-gray-700 text-gray-300'}`}>
                {scenario.category}
              </span>
              <span className="text-xs text-[var(--gold)]">
                {'⭐'.repeat(scenario.difficultyLevel)}
              </span>
            </div>

            <p className="text-base leading-relaxed mt-4 text-[var(--text-primary)] max-w-prose mx-auto text-center">
              {scenario.descriptionTh}
            </p>
          </div>
        </div>

        <div className="w-72 flex flex-col items-center justify-center gap-6">
          <Character mood="thinking" size={180} animate color="#7c3aed" />

          <button
            onClick={() => setPhase('choosing')}
            className="game-btn-3d bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl text-base"
          >
            เลือกคำพูดได้เลย →
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'choosing') {
    return (
      <div className="h-full flex flex-col py-4">
        <h2 className="text-center text-[var(--text-primary)] font-bold text-lg pb-2">
          เลือกสิ่งที่คุณจะพูด...
        </h2>
        <p className="text-sm text-[var(--text-muted)] text-center px-8 pb-4">
          {scenario.descriptionTh}
        </p>

        <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-6">
          {scenario.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedChoice(choice)
                setPhase('outcome')
                if (choice.isGoodChoice && activeChildId && !savedRef.current) {
                  savedRef.current = true
                  scenarioComplete.mutate({ childId: activeChildId, xpEarned: choice.xpReward })
                }
              }}
              className="game-card p-4 cursor-pointer active:scale-[0.98] hover:border-sky-500/50 transition-all text-left flex items-center gap-4"
            >
              <span className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-sm font-bold text-[var(--text-muted)] flex-shrink-0">
                {choiceLetters[idx]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[var(--text-primary)]">{choice.choiceText}</p>
                {choice.xpReward > 0 && (
                  <p className="text-sky-400 text-xs mt-0.5">+{choice.xpReward} XP</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'outcome' && selectedChoice) {
    const good = selectedChoice.isGoodChoice

    return (
      <div className="h-full flex flex-col items-center justify-center px-6 py-6 gap-4">
        <Character
          mood={good ? 'happy' : 'sad'}
          color={good ? '#22c55e' : '#ef4444'}
          size={120}
          animate
        />

        {good ? (
          <>
            <p className="text-2xl text-green-400 font-bold">✓ เลือกได้ดีมาก!</p>
            <p className="text-sky-400 text-xl font-bold">+{selectedChoice.xpReward} XP</p>
          </>
        ) : (
          <p className="text-2xl text-red-400 font-bold">✗ ลองคิดดูใหม่...</p>
        )}

        <div className="game-card p-4 mt-4 max-w-lg text-center mx-auto">
          <p className="text-base leading-relaxed text-[var(--text-primary)]">
            {selectedChoice.feedbackTh}
          </p>
        </div>

        <div className="flex gap-3 mt-2">
          {!good && (
            <button
              onClick={() => { savedRef.current = false; setPhase('choosing') }}
              className="game-card px-5 py-2.5 text-[var(--text-primary)] font-medium hover:border-[var(--xp-blue)] transition-all text-sm"
            >
              เลือกอีกครั้ง
            </button>
          )}

          <Link
            href="/scenario/list"
            className="game-btn-3d bg-sky-500 hover:bg-sky-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm inline-flex items-center"
          >
            {good ? 'สถานการณ์ถัดไป →' : 'กลับไปเลือก'}
          </Link>
        </div>
      </div>
    )
  }

  return null
}
