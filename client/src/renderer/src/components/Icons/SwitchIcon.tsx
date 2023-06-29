import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  conditional: boolean | undefined
  icon1: React.ReactNode
  icon2: React.ReactNode
}

export default function SwitchIcon({ conditional, icon1, icon2, ...rest }: Props) {
  if (conditional == undefined) return null

  return (
    <button
      className="bg-gradient-to-br from-purple-700 via-pink-400 to-sky-400 rounded-full transition-all text-white p-[1px] shadow-md"
      {...rest}
    >
      {conditional ? icon1 : icon2}
    </button>
  )
}
