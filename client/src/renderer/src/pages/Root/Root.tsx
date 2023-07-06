import { useState } from 'react'
import { useQuery } from 'react-query'

import Background from '@renderer/components/Background'
import Padding from '@renderer/components/Ident/Padding'
import Player from '@renderer/components/Player/Player'

import { baseURL, getLocalSongs } from '@renderer/services/api'
import { getId } from '@renderer/utils/getId'
import { getRandomInt } from '@renderer/utils/getRandomInt'

import RootPlaylist from './RootPlaylist'
import RootSidebar from './RootSidebar'
import RootTopbar from './RootTopbar'

export default function Root() {
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
    const id = getId(currentTrackSource)
    if (localSongs && id === String(localSongs?.length - 1)) return

    setCurrentTrackSource((prev) => {
      if (prev) {
        const nextTrackSource = `${baseURL}/song/${Number(id) + 1}`
        return nextTrackSource
      }
      return prev
    })
  }

  function goToPreviousSong() {
    const id = getId(currentTrackSource)
    if (id === '0') return

    setCurrentTrackSource((prev) => {
      if (prev) {
        const nextTrackSource = `${baseURL}/song/${Number(id) - 1}`
        return nextTrackSource
      }
      return prev
    })
  }

  function goToNextRandomSong() {
    if (localSongs) {
      const id = getRandomInt(0, localSongs?.length - 1)

      setCurrentTrackSource((prev) => {
        if (prev) {
          const nextTrackSource = `${baseURL}/song/${Number(id)}`
          return nextTrackSource
        }
        return prev
      })
    }
  }

  return (
    <>
      <Background />
      <main className="w-screen h-screen text-neutral-300 select-none relative z-20">
        <div className="w-full h-[9%] bg-zinc-800 bg-opacity-20 backdrop-blur-sm drop-shadow-lg">
          <Padding>
            <RootTopbar />
          </Padding>
        </div>
        <div className="w-full h-[71%] flex bg-zinc-800 bg-opacity-20 backdrop-blur-sm drop-shadow-lg">
          <div className="w-[15%] h-full border-r-[1px] border-r-zinc-900 border-opacity-60">
            <Padding>
              <RootSidebar />
            </Padding>
          </div>
          <div className="w-[85%] h-full">
            <Padding>
              <RootPlaylist
                controls={{
                  updateCurrentTrack
                }}
                events={{
                  isError,
                  isLoading
                }}
                playlist={localSongs}
              />
            </Padding>
          </div>
        </div>
        <div className="w-full h-[20%] bg-zinc-800 bg-opacity-20">
          <div className="w-full h-full bg-dpurple-900 bg-opacity-30 backdrop-blur-sm drop-shadow-lg rounded-t-[40px]">
            <Padding>
              <Player
                controls={{
                  goToNextSong,
                  goToPreviousSong,
                  goToNextRandomSong,
                  updateCurrentTrack
                }}
                source={currentTrackSource}
                playlistLength={localSongs?.length}
              />
            </Padding>
          </div>
        </div>
      </main>
    </>
  )
}
