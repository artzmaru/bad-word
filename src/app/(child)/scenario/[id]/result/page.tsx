'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ScenarioResultPage() {
  const router = useRouter()
  useEffect(() => { router.replace('/scenario/list') }, [router])
  return null
}
