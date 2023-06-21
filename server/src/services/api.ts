import { Song } from './../types/index.d'
import path from 'path'
import fs from 'fs'
import os from 'os'

export async function getAllSongs(): Promise<Song[] | undefined> {
  const downloads = path.join(os.homedir(), 'Downloads')
  const allSongsWithMetadata: Song[] = []

  try {
    const files = await fs.promises.readdir(downloads)
    const songs = files.filter(
      (file) => path.extname(file).toLowerCase() === '.mp3'
    )

    songs.forEach(async (song) => {
      const songPath = path.join(downloads, song)
      const stats = fs.statSync(songPath)

      allSongsWithMetadata.push({
        id: allSongsWithMetadata.length,
        absolutePath: song,
        title: song.slice(0, -4),
        lastModified: new Date(stats.mtime).toLocaleDateString(),
      })
    })

    return allSongsWithMetadata
  } catch (error) {
    return undefined
  }
}
