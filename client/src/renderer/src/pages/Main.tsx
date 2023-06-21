import Padding from '@renderer/components/Ident/Padding'
import Player from '@renderer/components/Player'
import SongItem from '@renderer/components/SongItem'
import { getLocalSongs } from '@renderer/services/api'
import { useState } from 'react'
import { RiHomeLine } from 'react-icons/ri'
import { useQuery } from 'react-query'

export default function Main() {
  const [currentTrackSource, setCurrentTrackSource] = useState<string | undefined>(undefined)

  function updateCurrentTrack(id: number) {
    setCurrentTrackSource(`http://localhost:9090/song/${id}`)
  }

  const {
    data: localSongs,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['localSongs'],
    queryFn: async () => await getLocalSongs()
  })

  return (
    <main className="w-screen h-screen bg-neutral-950 text-neutral-300">
      <div className="w-full h-[9%] border-[0.1rem] border-zinc-900"></div>
      <div className="w-full h-[76%] border-[0.1rem] border-zinc-900 flex">
        <div className="w-[23%] h-full border-[0.1rem] border-zinc-900">
          <Padding>
            <h1 className="text-white">
              <RiHomeLine />
              Home
            </h1>
          </Padding>
        </div>
        <div className="w-[78%] h-full border-[0.1rem] border-zinc-900">
          {isLoading ? (
            <h1>Loading</h1>
          ) : isError ? (
            <h1>Try again</h1>
          ) : (
            <div className="py-2 space-y-3">
              {localSongs?.map((song) => (
                <SongItem key={song.id} song={song} atClick={updateCurrentTrack} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[15%] border-[0.1rem] border-zinc-900">
        <Player source={currentTrackSource} />
      </div>
    </main>
  )
}
