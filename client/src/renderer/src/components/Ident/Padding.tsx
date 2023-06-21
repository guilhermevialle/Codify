import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function Padding({ children }: Props) {
  return <div className="w-full h-full p-4">{children}</div>
}
