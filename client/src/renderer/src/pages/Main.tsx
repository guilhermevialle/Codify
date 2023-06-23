import Padding from '@renderer/components/Ident/Padding'
import Dropdown from '@renderer/components/Lib/Dropdowns/Dropdown'
import Player from '@renderer/components/Player'
import SongItem from '@renderer/components/SongItem'
import { baseURL, getLocalSongs } from '@renderer/services/api'
import { useState } from 'react'
import { BiHomeAlt2, BiHeart, BiSearch } from 'react-icons/bi'
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
      return prev // Add this return statement
    })
  }

  const options = [
    {
      text: 'Date',
      clickFn: () => ''
    },
    {
      text: 'Alphabet',
      clickFn: () => ''
    }
  ]

  return (
    <main className="w-screen h-screen bg-woodsmoke-950 text-neutral-300 select-none">
      <div className="w-full h-[9%]"></div>
      <div className="w-full h-[73.5%] flex">
        <div className="w-[8%] h-full border-r-[1px] border-r-woodsmoke-900 border-opacity-50">
          <Padding>
            <div className="space-y-8 flex flex-col items-center">
              <button className="text-neutral-200">
                <BiHomeAlt2 size={23} />
              </button>
              <button className="text-woodsmoke-600">
                <BiHeart size={23} />
              </button>
              <button className="text-woodsmoke-600">
                <BiSearch size={23} />
              </button>
            </div>
          </Padding>
        </div>
        <div className="w-[92%] h-full">
          {isLoading ? (
            <h1>Loading</h1>
          ) : isError ? (
            <h1>Try again</h1>
          ) : (
            <div className="w-full h-full">
              <div className="w-full h-[10%] flex justify-end">
                <Padding>
                  <div className="flex justify-end">
                    <Dropdown
                      buttonTitle="Sort playlist"
                      buttonSize="w-[140px]"
                      sectionSize="w-[150px]"
                      sectionTitle=""
                      options={options}
                    />
                  </div>
                </Padding>
              </div>
              <div className="w-full h-[90%] py-2 overflow-y-auto">
                {localSongs?.map((song, index) => (
                  <SongItem index={index} key={song.id} song={song} atClick={updateCurrentTrack} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[17.5%] border-t-[0.1rem] border-t-woodsmoke-800 bg bg-woodsmoke-900 bg-opacity-70">
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
