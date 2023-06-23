type Props = {
  icon: React.ReactNode
  text: string
}

export default function NavButton({ icon, text }: Props) {
  return (
    <button className="flex gap-x-2 items-center w-full h-11 border-[1px] hover:border-gray-700 border-gray-900 focus:border-gray-600 focus:bg-gray-900 rounded-md px-3 transition-all">
      {icon}
      {text}
    </button>
  )
}
