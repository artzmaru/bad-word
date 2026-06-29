'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { queryKeys } from '@/lib/mutations/keys'
import { type Tables } from '@/lib/supabase/database.types'

export type QuizQuestion = Tables<'quiz_questions'>
export type QuizOption = Tables<'quiz_options'>

export function useQuizQuestions(wordIds: string[]) {
  return useQuery({
    queryKey: queryKeys.quizQuestions(wordIds),
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*, quiz_options(*)')
        .in('word_id', wordIds)
      if (error) throw error
      return data
    },
    enabled: wordIds.length > 0,
  })
}

export function useQuizSessions(childId: string | null) {
  return useQuery({
    queryKey: ['quiz-sessions', childId],
    queryFn: async () => {
      if (!childId) return []
      const supabase = createClient()
      const { data, error } = await supabase
        .from('quiz_sessions')
        .select('*')
        .eq('child_id', childId)
        .order('started_at', { ascending: false })
        .limit(10)
      if (error) throw error
      return data
    },
    enabled: !!childId,
  })
}
