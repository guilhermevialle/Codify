import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  conditional: boolean | undefined
  icon1: React.ReactNode
  icon2: React.ReactNode
}

export default function SwitchIcon({ conditional, icon1, icon2, ...rest }: Props) {
  if (conditional == undefined) return null

  return (
    <button className="hover:text-neutral-400 transition-all" {...rest}>
      {conditional ? icon1 : icon2}
    </button>
  )
}
