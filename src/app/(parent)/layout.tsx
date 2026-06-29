import { ParentTopNav } from '@/components/navigation/ParentTopNav'

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-navy-900 flex flex-col">
      <ParentTopNav />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
