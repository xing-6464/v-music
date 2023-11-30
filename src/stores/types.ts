import type { Song } from '@/views/types'

export type StoreState = {
  sequencesList: Song[]
  playList: Song[]
  playing: boolean
  playMode: number
  currentIndex: number
  fullScreen: boolean
  favoriteList: Song[]
  searchHistory: string[]
}
