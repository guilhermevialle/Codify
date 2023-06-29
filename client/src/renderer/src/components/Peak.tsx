interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Peak({ ...rest }: Props) {
  return <div {...rest} className="w-[4px] bg-white rounded-md shadow-sm candle-4"></div>
}
