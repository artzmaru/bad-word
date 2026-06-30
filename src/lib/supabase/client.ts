import { createBrowserClient } from '@supabase/ssr'
import { type Database } from './database.types'

const clean = (v: string | undefined) => (v ?? '').replace(/^﻿/, '').trim()

export function createClient() {
  return createBrowserClient<Database>(
    clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  )
}
