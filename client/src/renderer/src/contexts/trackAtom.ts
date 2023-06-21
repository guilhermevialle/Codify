import { Track } from '@renderer/types'
import { atom } from 'jotai'

export const trackAtom = atom<Track | undefined>(undefined)
