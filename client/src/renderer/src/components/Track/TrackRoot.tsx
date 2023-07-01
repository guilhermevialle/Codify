import { memo } from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function TrackRoot({ children, ...rest }: Props) {
  return (
    <div
      {...rest}
      className="w-full h-[88px] flex items-center justify-between rounded-xl hover:bg-dpurple-950 hover:bg-opacity-20 hover:backdrop-blur-sm hover:drop-shadow-lg transition-all cursor-pointer "
    >
      {children}
    </div>
  )
}

export default memo(TrackRoot)
