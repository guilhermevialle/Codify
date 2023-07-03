import Liked from '../Lib/Icons/Liked'

type TrackLikeProps = {
  id: number | undefined
}

export default function TrackLike({ id }: TrackLikeProps) {
  if (Number.isNaN(id) || id == undefined) return null

  return (
    <span className="w-[10%] flex justify-center text-[0.8rem]">
      <Liked id={id} />
    </span>
  )
}
