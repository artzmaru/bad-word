'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { queryKeys } from '@/lib/mutations/keys'
import { type Tables } from '@/lib/supabase/database.types'

export type Scenario = Tables<'scenarios'>
export type ScenarioChoice = Tables<'scenario_choices'>

export function useScenarios() {
  return useQuery({
    queryKey: queryKeys.scenarios,
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('scenarios')
        .select('*')
        .eq('is_active', true)
        .order('order_index')
      if (error) throw error
      return data as Scenario[]
    },
  })
}

export function useScenario(id: string) {
  return useQuery({
    queryKey: queryKeys.scenario(id),
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('scenarios')
        .select('*, scenario_choices(*)')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!id,
  })
}

export function useScenarioAttempts(childId: string | null) {
  return useQuery({
    queryKey: ['scenario-attempts', childId],
    queryFn: async () => {
      if (!childId) return []
      const supabase = createClient()
      const { data, error } = await supabase
        .from('scenario_attempts')
        .select('*')
        .eq('child_id', childId)
      if (error) throw error
      return data
    },
    enabled: !!childId,
  })
}
