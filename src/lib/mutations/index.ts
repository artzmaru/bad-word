'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { queryKeys } from './keys'

export function useAddXPMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      childId,
      amount,
    }: {
      childId: string
      amount: number
    }) => {
      const supabase = createClient()
      const { error } = await supabase.rpc('add_child_xp', {
        p_child_id: childId,
        p_amount: amount,
      })
      if (error) throw error
    },
    onSettled: (_data, _err, { childId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.progress(childId) })
    },
  })
}

export function useMarkWordSeenMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      childId,
      wordId,
    }: {
      childId: string
      wordId: string
    }) => {
      const supabase = createClient()
      const { error } = await supabase.from('word_progress').upsert(
        { child_id: childId, word_id: wordId, seen_at: new Date().toISOString() },
        { onConflict: 'child_id,word_id', ignoreDuplicates: false }
      )
      if (error) throw error
      await supabase.rpc('increment_words_seen', { p_child_id: childId })
    },
    onSettled: (_data, _err, { childId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.wordProgress(childId) })
    },
  })
}

export function useMarkWordLearnedMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      childId,
      wordId,
    }: {
      childId: string
      wordId: string
    }) => {
      const supabase = createClient()
      const { error } = await supabase.from('word_progress').upsert(
        {
          child_id: childId,
          word_id: wordId,
          learned_at: new Date().toISOString(),
        },
        { onConflict: 'child_id,word_id', ignoreDuplicates: false }
      )
      if (error) throw error
      await supabase.rpc('increment_words_learned', { p_child_id: childId })
    },
    onSettled: (_data, _err, { childId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.wordProgress(childId) })
      qc.invalidateQueries({ queryKey: queryKeys.progress(childId) })
    },
  })
}

export function useRecordScenarioAttemptMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      childId,
      scenarioId,
      choiceId,
      outcomeType,
      xpEarned,
      starsEarned,
    }: {
      childId: string
      scenarioId: string
      choiceId: string
      outcomeType: string
      xpEarned: number
      starsEarned: number
    }) => {
      const supabase = createClient()
      const { error } = await supabase.from('scenario_attempts').insert({
        child_id: childId,
        scenario_id: scenarioId,
        choice_id: choiceId,
        outcome_type: outcomeType,
        xp_earned: xpEarned,
        stars_earned: starsEarned,
      })
      if (error) throw error
      await supabase.rpc('increment_scenarios_completed', {
        p_child_id: childId,
        p_xp: xpEarned,
      })
    },
    onSettled: (_data, _err, { childId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.progress(childId) })
    },
  })
}

export function useCompleteQuizSessionMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      childId,
      sessionId,
      score,
      totalQuestions,
      xpEarned,
    }: {
      childId: string
      sessionId: string
      score: number
      totalQuestions: number
      xpEarned: number
    }) => {
      const supabase = createClient()
      const { error } = await supabase
        .from('quiz_sessions')
        .update({ completed_at: new Date().toISOString(), score, total_questions: totalQuestions })
        .eq('id', sessionId)
      if (error) throw error
      await supabase.rpc('increment_quiz_sessions', {
        p_child_id: childId,
        p_xp: xpEarned,
      })
    },
    onSettled: (_data, _err, { childId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.progress(childId) })
    },
  })
}
