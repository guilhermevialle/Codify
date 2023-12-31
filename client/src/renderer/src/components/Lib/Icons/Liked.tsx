import useLiked from '@renderer/hooks/useLiked'
import { BsStar, BsStarFill } from 'react-icons/bs'

type LikedButtonProps = {
  id: number | undefined
}

export default function Liked({ id }: LikedButtonProps) {
  if (Number.isNaN(id) || id == undefined) return null

  const { addLikedItem, isLiked, removeLikedItem } = useLiked()

  function handleLikeSong() {
    if (!Number.isNaN(id) && id !== undefined) {
      if (isLiked(id)) return removeLikedItem(id)
      addLikedItem(id)
    }
  }

  return (
    <button onClick={handleLikeSong}>
      {isLiked(id) ? (
        <i className="text-orange-400 star-glow">
          <BsStarFill className="svg-shadow" size={14} />
        </i>
      ) : (
        <i className="hover:text-orange-200">{<BsStar className="svg-shadow" size={14} />}</i>
      )}
    </button>
  )
}
