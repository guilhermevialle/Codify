import { likedSongsAtom } from '@renderer/contexts/likedAtom'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export default function useLiked() {
  const [likedContent, setLikedContent] = useAtom(likedSongsAtom)

  useEffect(() => {
    const storedLikedContent = localStorage.getItem('fs-liked')

    if (!storedLikedContent) {
      localStorage.setItem('fs-liked', '[]')
      setLikedContent([])
    } else {
      setLikedContent(JSON.parse(storedLikedContent))
    }
  }, [setLikedContent])

  function addLikedItem(id: number) {
    if (!localStorage.getItem('fs-liked')) {
      localStorage.setItem('fs-liked', '[]')
    }

    setLikedContent((prev) => [...prev, id])
    localStorage.setItem('fs-liked', JSON.stringify([...likedContent, id]))
  }

  function removeLikedItem(id: number) {
    setLikedContent((prev) => prev.filter((itemId) => itemId !== id))
    const storedLikedContent = JSON.stringify(likedContent.filter((itemId) => itemId !== id))
    localStorage.setItem('fs-liked', storedLikedContent)
  }

  function isLiked(id: number) {
    if (likedContent.includes(id)) return true
    return false
  }

  return { likedContent, addLikedItem, removeLikedItem, isLiked }
}
