type Props = {
  text: string
  icon?: {
    asset: React.ReactNode
    side: 'left' | 'right'
  }
}

export default function DefaultButton({ text, icon }: Props) {
  return (
    <button
      type="button"
      className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded border border-transparent font-semibold bg-white text-woodsmoke-600 hover:bg-woodsmoke-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-lg dark:focus:ring-offset-woodsmoke-800 gap-x-4"
    >
      {icon?.side == 'left' && <span>{icon.asset}</span>}
      {text}
      {icon?.side == 'right' && <span>{icon.asset}</span>}
    </button>
  )
}
