import Background from '@renderer/components/Background'
import Padding from '@renderer/components/Ident/Padding'
import ThePlayer from '@renderer/components/Player/Player'
import { baseURL, getLocalSongs } from '@renderer/services/api'
import { useState } from 'react'
import { MdHomeFilled, MdMusicNote } from 'react-icons/md'
import { IoMdHeart } from 'react-icons/io'
import { useQuery } from 'react-query'
import { getRandomInt } from '@renderer/utils/getRandomInt'
import { Track } from '@renderer/components/Track'
import { Link } from 'react-router-dom'

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
      return prev
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
        <div className="w-full h-[9%] bg-zinc-800 bg-opacity-20 backdrop-blur-sm drop-shadow-lg"></div>
        <div className="w-full h-[71%] flex bg-zinc-800 bg-opacity-20 backdrop-blur-sm drop-shadow-lg">
          <div className="w-[15%] h-full border-r-[1px] border-r-zinc-900 border-opacity-60">
            <Padding>
              <div className="space-y-8 flex flex-col items-center">
                <button className="text-white ">
                  <MdHomeFilled size={23} className="candle" />
                </button>
                <button className="text-woodsmoke-600">
                  <MdMusicNote
                    className="svg-shadow hover:text-neutral-200 transition-all ease-in-out duration-[400]"
                    size={23}
                  />
                </button>
                <Link to={'/liked'}>
                  <button className="text-woodsmoke-600">
                    <IoMdHeart
                      className="svg-shadow hover:text-neutral-200 transition-all ease-in-out duration-[400]"
                      size={23}
                    />
                  </button>
                </Link>
              </div>
            </Padding>
          </div>
          <div className="w-[85%] h-full">
            <Padding>
              {isLoading ? (
                <h1>Loading</h1>
              ) : isError ? (
                <h1>Try again</h1>
              ) : (
                <div className="w-full h-full">
                  <div className="w-full h-[10%] flex justify-end">
                    <Padding>
                      <div className="flex justify-end"></div>
                    </Padding>
                  </div>
                  <div className="w-full h-[90%] py-2 overflow-y-auto">
                    {localSongs?.map((song, index) => (
                      <Track.Provider
                        updateCurrentTrack={updateCurrentTrack}
                        index={index}
                        song={song}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Padding>
          </div>
        </div>
        <div className="w-full h-[20%] bg-zinc-800 bg-opacity-20">
          <div className="w-full h-full bg-dpurple-900 bg-opacity-30 backdrop-blur-sm drop-shadow-lg rounded-t-[40px]">
            <Padding>
              <ThePlayer
                goToNextSong={goToNextSong}
                goToPreviousSong={goToPreviousSong}
                goToNextRandomSong={goToNextRandomSong}
                source={currentTrackSource}
              />
            </Padding>
          </div>
        </div>
      </main>
    </>
  )
}
