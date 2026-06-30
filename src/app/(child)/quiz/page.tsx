'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { quizData, type QuizQuestionData } from '@/content/quiz-data'
import { useAuthStore } from '@/lib/auth/store'
import { useQuizCompleteMutation } from '@/lib/mutations/index'
import PageBackground from '@/components/game/PageBackground'

type Phase = 'idle' | 'question' | 'revealing' | 'summary'

const CHEST_COLORS = ['brown', 'purple', 'red'] as const
type ChestColor = typeof CHEST_COLORS[number]

const CHEST_KEY: Record<ChestColor, string> = {
  brown: 'brown_gold',
  purple: 'purple',
  red: 'red_gold',
}

function ChestImage({
  color,
  isOpen,
  isScaling,
}: {
  color: ChestColor
  isOpen: boolean
  isScaling: boolean
}) {
  const key = CHEST_KEY[color]
  const suffix = isOpen ? '_open' : ''
  const src = `/assets/props/prop_chest_${key}${suffix}@2x.png`

  return (
    <div
      className={cn(
        'relative transition-transform duration-300',
        isScaling && 'scale-110',
        isOpen && !isScaling && 'scale-105',
      )}
      style={{ width: 96, height: 80 }}
    >
      <Image
        src={src}
        alt={`chest ${color}`}
        fill
        className="object-contain"
        sizes="96px"
      />
    </div>
  )
}

export default function QuizPage() {
  const router = useRouter()
  const activeChildId = useAuthStore((s) => s.activeChildId)
  const quizComplete = useQuizCompleteMutation()
  const [phase, setPhase] = useState<Phase>('idle')
  const [localQuestions, setLocalQuestions] = useState<QuizQuestionData[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<{ isCorrect: boolean }[]>([])
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null)
  const [openingIdx, setOpeningIdx] = useState<number | null>(null)
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedSummaryRef = useRef(false)

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (phase === 'summary' && !savedSummaryRef.current && activeChildId) {
      savedSummaryRef.current = true
      quizComplete.mutate({ childId: activeChildId, xpEarned: score * 10 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, activeChildId])

  function startQuiz() {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5).slice(0, 10)
    setLocalQuestions(shuffled)
    setCurrentIdx(0)
    setAnswers([])
    setSelectedOptionIdx(null)
    setOpeningIdx(null)
    savedSummaryRef.current = false
    setPhase('question')
  }

  function handleOptionSelect(optionIdx: number) {
    if (phase !== 'question') return
    const q = localQuestions[currentIdx]
    const isCorrect = q.options[optionIdx].isCorrect
    setSelectedOptionIdx(optionIdx)
    setOpeningIdx(optionIdx)
    setTimeout(() => {
      setPhase('revealing')
      setOpeningIdx(null)
    }, 400)
    setAnswers((prev) => [...prev, { isCorrect }])

    if (revealTimerRef.current) clearTimeout(revealTimerRef.current)
    revealTimerRef.current = setTimeout(() => {
      const nextIdx = currentIdx + 1
      if (nextIdx >= 10) {
        setPhase('summary')
      } else {
        setCurrentIdx(nextIdx)
        setSelectedOptionIdx(null)
        setOpeningIdx(null)
        setPhase('question')
      }
    }, 1900)
  }

  const score = answers.filter((a) => a.isCorrect).length
  const q = localQuestions[currentIdx]

  if (phase === 'idle') {
    return (
      <div className="relative h-full flex flex-col items-center justify-center gap-6">
        <PageBackground name="background_quiz_arena" />
        <div className="game-card p-10 flex flex-col items-center gap-5 max-w-sm w-full mx-4">
          <div className="text-7xl">🎯</div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">แบบทดสอบ</h1>
            <p className="text-[var(--text-muted)] mt-2 text-base">ทดสอบความเข้าใจ 10 ข้อ</p>
          </div>
          <button
            onClick={startQuiz}
            className="game-btn-3d bg-sky-400 text-white text-xl font-bold px-10 py-4 rounded-xl w-full mt-2"
          >
            เริ่มเลย!
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'summary') {
    const excellent = score >= 8
    return (
      <div className="relative h-full flex flex-col items-center justify-center gap-6 px-4">
        <PageBackground name="background_quiz_arena" />
        <div className="game-card p-10 flex flex-col items-center gap-5 max-w-sm w-full">
          <div className="text-6xl">🏆</div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">จบแบบทดสอบ!</h2>
          <div className="text-center">
            <p className="text-[var(--text-muted)] text-base">คะแนน</p>
            <p className="text-5xl font-bold text-[var(--xp-blue)] mt-1">
              {score} <span className="text-2xl text-[var(--text-muted)]">/ 10</span>
            </p>
          </div>
          <div className="bg-[var(--bg-elevated)] rounded-xl px-6 py-3 text-center">
            <p className="text-[var(--gold)] font-bold text-lg">⭐ +{score * 10} XP</p>
          </div>
          <p className="text-xl font-bold mt-1" style={{ color: excellent ? '#22c55e' : '#f59e0b' }}>
            {excellent ? '🎉 ยอดเยี่ยม!' : '💪 ฝึกอีกนิด!'}
          </p>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={startQuiz}
              className="game-btn-3d bg-sky-400 text-white font-bold px-4 py-3 rounded-xl flex-1"
            >
              ทำอีกครั้ง
            </button>
            <button
              onClick={() => router.push('/home')}
              className="game-btn-3d bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold px-4 py-3 rounded-xl flex-1 border border-[rgba(56,189,248,0.25)]"
            >
              กลับหน้าหลัก
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!q) return null

  const isRevealing = phase === 'revealing'
  const correctIdx = q.options.findIndex((o) => o.isCorrect)

  return (
    <div className="relative h-full flex flex-col p-4 gap-3">
      <PageBackground name="background_quiz_arena" />
      <div className="game-card px-5 py-3 flex items-center gap-4">
        <span className="text-[var(--text-muted)] text-sm font-semibold whitespace-nowrap">
          ข้อ {currentIdx + 1} / 10
        </span>
        <div className="flex-1 bg-[var(--bg-elevated)] rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(currentIdx / 10) * 100}%`,
              background: 'var(--xp-blue)',
            }}
          />
        </div>
        <span className="text-[var(--xp-blue)] text-sm font-bold whitespace-nowrap">
          {score} ✓
        </span>
      </div>

      <div className="game-card flex-1 flex flex-col items-center justify-center gap-4 px-6 py-5 min-h-0">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold text-lg px-4 py-1.5 rounded-full border border-[rgba(56,189,248,0.3)]">
              {q.word}
            </span>
            <span
              className={cn(
                'text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide',
                q.lang === 'en'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
              )}
            >
              {q.lang === 'en' ? 'EN' : 'TH'}
            </span>
          </div>
          <p className="text-[var(--text-primary)] text-lg font-semibold leading-snug max-w-xl mt-1">
            {q.questionText}
          </p>
        </div>

        <div className="flex gap-4 justify-center items-start mt-2 w-full max-w-2xl">
          {q.options.map((option, idx) => {
            const color = CHEST_COLORS[idx]
            const isSelected = selectedOptionIdx === idx
            const isCorrectChest = idx === correctIdx
            const isOpening = openingIdx === idx
            const isOpen = isRevealing && (isSelected || isCorrectChest)

            let ringClass = ''
            if (isRevealing) {
              if (isCorrectChest) {
                ringClass = 'ring-4 ring-green-400 ring-offset-2 ring-offset-[var(--bg-card)]'
              } else if (isSelected && !isCorrectChest) {
                ringClass = 'ring-4 ring-red-400 ring-offset-2 ring-offset-[var(--bg-card)]'
              }
            }

            let labelEl: React.ReactNode = null
            if (isRevealing) {
              if (isCorrectChest) {
                labelEl = (
                  <span className="text-green-400 font-bold text-sm mt-1">✓ ถูกต้อง!</span>
                )
              } else if (isSelected) {
                labelEl = (
                  <span className="text-red-400 font-bold text-sm mt-1">✗ ผิด!</span>
                )
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={phase !== 'question'}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 select-none flex-1',
                  phase === 'question' && 'hover:bg-[var(--bg-elevated)] active:scale-95 cursor-pointer',
                  isRevealing && !isCorrectChest && !isSelected && 'opacity-40',
                  ringClass,
                )}
              >
                <ChestImage
                  color={color}
                  isOpen={isOpen}
                  isScaling={isOpening}
                />
                {labelEl}
                <p
                  className={cn(
                    'text-center text-sm font-medium leading-snug max-w-[120px]',
                    isRevealing && isCorrectChest
                      ? 'text-green-300'
                      : isRevealing && isSelected && !isCorrectChest
                      ? 'text-red-300'
                      : 'text-[var(--text-primary)]',
                  )}
                >
                  {option.optionText}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
