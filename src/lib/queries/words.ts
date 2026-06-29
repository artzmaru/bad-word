'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { queryKeys } from '@/lib/mutations/keys'
import { type Tables } from '@/lib/supabase/database.types'

export type Word = Tables<'words'>
export type WordDetail = Tables<'word_details'>

export function useWords(lang?: string) {
  return useQuery({
    queryKey: [...queryKeys.words, lang],
    queryFn: async () => {
      const supabase = createClient()
      let q = supabase.from('words').select('*').order('level').order('word')
      if (lang) q = q.eq('lang', lang)
      const { data, error } = await q
      if (error) throw error
      return data as Word[]
    },
  })
}

export function useWord(id: string) {
  return useQuery({
    queryKey: queryKeys.word(id),
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('words')
        .select('*, word_details(*)')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!id,
  })
}

export function useWordProgress(childId: string | null) {
  return useQuery({
    queryKey: childId ? queryKeys.wordProgress(childId) : ['word-progress-none'],
    queryFn: async () => {
      if (!childId) return []
      const supabase = createClient()
      const { data, error } = await supabase
        .from('word_progress')
        .select('*')
        .eq('child_id', childId)
      if (error) throw error
      return data
    },
    enabled: !!childId,
  })
}
