type EmptyProgressProps = {
  width: string
}

export default function EmptyProgress({ width }: EmptyProgressProps) {
  return (
    <div
      id='emptyProgress'
      className='h-full absolute top-0 right-0 z-10 backdrop-grayscale'
      style={{
        width: width,
      }}
    ></div>
  )
}
