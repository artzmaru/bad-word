'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { queryKeys } from '@/lib/mutations/keys'
import { type Tables } from '@/lib/supabase/database.types'

export type ChildProgress = Tables<'child_progress'>
export type ChildProfile = Tables<'child_profiles'>

export function useChildProfiles(parentId: string | null) {
  return useQuery({
    queryKey: parentId ? queryKeys.childProfiles(parentId) : ['profiles-none'],
    queryFn: async () => {
      if (!parentId) return []
      const supabase = createClient()
      const { data, error } = await supabase
        .from('child_profiles')
        .select('*')
        .eq('parent_id', parentId)
        .order('created_at')
      if (error) throw error
      return data as ChildProfile[]
    },
    enabled: !!parentId,
  })
}

export function useChildProgress(childId: string | null) {
  return useQuery({
    queryKey: childId ? queryKeys.progress(childId) : ['progress-none'],
    queryFn: async () => {
      if (!childId) return null
      const supabase = createClient()
      const { data, error } = await supabase
        .from('child_progress')
        .select('*')
        .eq('child_id', childId)
        .single()
      if (error) throw error
      return data as ChildProgress
    },
    enabled: !!childId,
  })
}

export function useParentSettings(parentId: string | null) {
  return useQuery({
    queryKey: parentId ? queryKeys.parentSettings(parentId) : ['parent-settings-none'],
    queryFn: async () => {
      if (!parentId) return null
      const supabase = createClient()
      const { data, error } = await supabase
        .from('parent_settings')
        .select('*')
        .eq('parent_id', parentId)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!parentId,
  })
}
