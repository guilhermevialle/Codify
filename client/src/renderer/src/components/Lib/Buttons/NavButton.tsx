type NavButtonProps = {
  icon: React.ReactNode
  text: string
}

export default function NavButton({ icon, text }: NavButtonProps) {
  return (
    <button className="flex gap-x-2 items-center w-full h-11 border-[1px] hover:border-woodsmoke-700 border-woodsmoke-900 focus:border-woodsmoke-600 focus:bg-woodsmoke-900 rounded-md px-3 transition-all">
      {icon}
      {text}
    </button>
  )
}
