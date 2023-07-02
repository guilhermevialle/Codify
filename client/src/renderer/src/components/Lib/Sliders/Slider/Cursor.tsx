type CursorProps = {
  xPosition: string
}

export default function Cursor({ xPosition }: CursorProps) {
  return (
    <div
      id="cursor"
      className="w-[2px] h-full bg-neutral-300 absolute top-0 z-10 rounded-sm shadow-md"
      style={{
        left: xPosition
      }}
    ></div>
  )
}
