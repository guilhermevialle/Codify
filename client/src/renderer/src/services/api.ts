import { Song } from '@renderer/types'
import axios from 'axios'

export const baseURL = 'http://localhost:9090'

export const api = axios.create({
  baseURL
})

export async function getLocalSongs(): Promise<Song[] | undefined> {
  try {
    const { data } = await axios.get('http://localhost:9090/songs', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      }
    })

    return data
  } catch (error) {
    alert(error)
    return undefined
  }
}

export async function getUniqueSong(id: number): Promise<Song | undefined> {
  try {
    const { data } = await api.get(`/song/${id}`)
    return data
  } catch (error) {
    return undefined
  }
}
