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
      className="bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-600 rounded-full transition-all text-white p-[0.000001rem] svg-shadow glow hover:-translate-y-[1px] hover:scale-[1.05] hover:drop-shadow-2xl"
      {...rest}
    >
      {conditional ? icon1 : icon2}
    </button>
  )
}
