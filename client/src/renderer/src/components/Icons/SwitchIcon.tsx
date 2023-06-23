import { HTMLAttributes, useState } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  startsWith: boolean | undefined
  initial: React.ReactNode
  after: React.ReactNode
}

export default function SwitchIcon({ startsWith, initial, after, ...rest }: Props) {
  if (startsWith == undefined) return null

  return <button {...rest}>{!startsWith ? initial : after}</button>
}
