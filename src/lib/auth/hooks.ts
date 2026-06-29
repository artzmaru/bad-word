'use client'

import { useEffect } from 'react'
import { useAuthStore } from './store'

export function useActiveChild() {
  return useAuthStore((s) => s.activeChildId)
}

export function useIsParentMode() {
  const isParentMode = useAuthStore((s) => s.isParentMode)
  const checkExpiry = useAuthStore((s) => s.checkParentModeExpiry)

  useEffect(() => {
    checkExpiry()
    const interval = setInterval(checkExpiry, 60_000)
    return () => clearInterval(interval)
  }, [checkExpiry])

  return isParentMode
}

export function useParentModeActions() {
  const enterParentMode = useAuthStore((s) => s.enterParentMode)
  const exitParentMode = useAuthStore((s) => s.exitParentMode)
  const recordPinAttempt = useAuthStore((s) => s.recordPinAttempt)
  const isLockedOut = useAuthStore((s) => s.isLockedOut)
  const pinLockoutUntil = useAuthStore((s) => s.pinLockoutUntil)
  const pinAttempts = useAuthStore((s) => s.pinAttempts)

  return {
    enterParentMode,
    exitParentMode,
    recordPinAttempt,
    isLockedOut,
    pinLockoutUntil,
    pinAttempts,
  }
}
