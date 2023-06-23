import Padding from '@renderer/components/Ident/Padding'
import NavButton from '@renderer/components/Lib/Buttons/NavButton'
import Player from '@renderer/components/Player'
import SongItem from '@renderer/components/SongItem'
import { baseURL, getLocalSongs } from '@renderer/services/api'
import { useState } from 'react'
import { RiHomeLine } from 'react-icons/ri'
import { useQuery } from 'react-query'

export default function Main() {
  const [currentTrackSource, setCurrentTrackSource] = useState<string | undefined>(undefined)

  const {
    data: localSongs,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['localSongs'],
    queryFn: async () => await getLocalSongs()
  })

  function updateCurrentTrack(id: number) {
    setCurrentTrackSource(`http://localhost:9090/song/${id}`)
  }

  function goToNextSong() {
    const id = currentTrackSource?.split('/').pop()
    if (localSongs && id === String(localSongs?.length - 1)) return

    setCurrentTrackSource((prev) => {
      if (prev) {
        const nextTrackSource = `${baseURL}/song/${Number(id) + 1}`
        return nextTrackSource
      }
    })
  }

  function goToPreviousSong() {
    const id = currentTrackSource?.split('/').pop()
    if (id === '0') return

    setCurrentTrackSource((prev) => {
      if (prev) {
        const nextTrackSource = `${baseURL}/song/${Number(id) - 1}`
        return nextTrackSource
      }
    })
  }

  return (
    <main className="w-screen h-screen bg-gray-950 text-neutral-300 select-none">
      <div className="w-full h-[9%]"></div>
      <div className="w-full h-[73.5%] flex">
        <div className="w-[23%] h-full border-r-[1px] border-r-gray-900">
          <Padding>
            <NavButton icon={<RiHomeLine />} text="Home" />
          </Padding>
        </div>
        <div className="w-[78%] h-full">
          {isLoading ? (
            <h1>Loading</h1>
          ) : isError ? (
            <h1>Try again</h1>
          ) : (
            <div className="w-full h-full py-2 space-y-3 overflow-y-auto">
              {localSongs?.map((song, index) => (
                <SongItem index={index} key={song.id} song={song} atClick={updateCurrentTrack} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[17.5%] border-t-[0.1rem] border-t-gray-800 bg bg-gray-900">
        <Padding>
          <Player
            goToNextSong={goToNextSong}
            goToPreviousSong={goToPreviousSong}
            source={currentTrackSource}
          />
        </Padding>
      </div>
    </main>
  )
}
