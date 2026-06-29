import { ChildBottomNav } from '@/components/navigation/ChildBottomNav'
import { ParentModeButton } from '@/components/navigation/ParentModeButton'
import { PINGateOverlay } from '@/components/auth/PINGateOverlay'

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-navy-900 flex flex-col">
      <div className="relative flex-1 overflow-hidden">{children}</div>
      <ChildBottomNav />
      <ParentModeButton />
      <PINGateOverlay />
    </div>
  )
}
