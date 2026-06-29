import { create } from 'zustand'

type QuizPhase = 'idle' | 'question' | 'revealing' | 'summary'

interface QuizAnswer {
  questionId: string
  selectedOptionId: string
  isCorrect: boolean
  timeMs: number
}

interface QuizState {
  phase: QuizPhase
  sessionId: string | null
  questionIds: string[]
  currentIndex: number
  answers: QuizAnswer[]
  startedAt: number | null

  startSession: (sessionId: string, questionIds: string[]) => void
  submitAnswer: (answer: QuizAnswer) => void
  nextQuestion: () => void
  finishSession: () => void
  reset: () => void

  // Computed
  score: () => number
  totalQuestions: () => number
  currentQuestionId: () => string | null
}

export const useQuizStore = create<QuizState>()((set, get) => ({
  phase: 'idle',
  sessionId: null,
  questionIds: [],
  currentIndex: 0,
  answers: [],
  startedAt: null,

  startSession: (sessionId, questionIds) =>
    set({
      phase: 'question',
      sessionId,
      questionIds,
      currentIndex: 0,
      answers: [],
      startedAt: Date.now(),
    }),

  submitAnswer: (answer) =>
    set((s) => ({
      phase: 'revealing',
      answers: [...s.answers, answer],
    })),

  nextQuestion: () => {
    const { currentIndex, questionIds } = get()
    const next = currentIndex + 1
    if (next >= questionIds.length) {
      set({ phase: 'summary' })
    } else {
      set({ currentIndex: next, phase: 'question' })
    }
  },

  finishSession: () => set({ phase: 'summary' }),

  reset: () =>
    set({
      phase: 'idle',
      sessionId: null,
      questionIds: [],
      currentIndex: 0,
      answers: [],
      startedAt: null,
    }),

  score: () => get().answers.filter((a) => a.isCorrect).length,
  totalQuestions: () => get().questionIds.length,
  currentQuestionId: () => {
    const { questionIds, currentIndex } = get()
    return questionIds[currentIndex] ?? null
  },
}))
