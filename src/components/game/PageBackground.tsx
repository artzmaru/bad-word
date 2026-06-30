import Image from 'next/image'

interface PageBackgroundProps {
  name: string
  overlay?: string
}

export default function PageBackground({
  name,
  overlay = 'rgba(10,14,30,0.65)',
}: PageBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Image
        src={`/assets/backgrounds/${name}@2x.png`}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  )
}
