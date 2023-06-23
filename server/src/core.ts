import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import os from 'os'
import { getAllSongs } from './services/api'
import path from 'path'
import { Song } from './types'

const port = process.env.PORT ?? 9090
const server = express()

server.use(express.static('public'))
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
server.use(cors())
server.use(express.json())

let songs: Song[] | undefined = []

getAllSongs().then((res) => {
  songs = res
  return
})

const downloads = path.join(os.homedir(), 'Downloads')

server.get('/songs', async (req, res) => {
  try {
    res.json(songs)
  } catch (error) {
    res.status(500).send({ message: 'Error', error })
  }
})

server.get('/song/:id', async (req, res) => {
  const id = req.params.id

  try {
    const song = songs?.find((e) => e.id == Number(id))
    if (!song) return undefined

    return res.sendFile(path.join(downloads, song?.absolutePath))
  } catch (error) {
    return undefined
  }
})

server.listen(port, () => console.log(`Server running at port ${port}`))
