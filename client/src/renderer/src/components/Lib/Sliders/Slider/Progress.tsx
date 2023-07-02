type ProgressProps = {
  width: string
}

export default function Progress({ width }: ProgressProps) {
  return (
    <div
      id='progress'
      className='h-full relative z-10'
      style={{
        width: width,
      }}
    ></div>
  )
}
