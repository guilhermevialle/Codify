import Padding from '@renderer/components/Ident/Padding'
import { Track } from '@renderer/components/Track'
import { Song } from '@renderer/types'

type RootPlaylistProps = {
  controls: {
    updateCurrentTrack: (id: number) => void
  }
  events: {
    isLoading: boolean
    isError: boolean
  }
  playlist: Song[] | undefined
}

export default function RootPlaylist({ controls, events, playlist }: RootPlaylistProps) {
  if (!playlist) return null

  const { updateCurrentTrack } = controls
  const { isError, isLoading } = events

  return (
    <>
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
            {playlist?.map((song, index) => (
              <Track.Provider
                key={index + song.title}
                updateCurrentTrack={updateCurrentTrack}
                index={index}
                song={song}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
