type Props = React.HTMLAttributes<HTMLDivElement>

export default function Peak({ ...rest }: Props) {
  return <div {...rest} className="w-[4px] bg-zinc-300 rounded-md shadow-sm candle-4 peak"></div>
}
