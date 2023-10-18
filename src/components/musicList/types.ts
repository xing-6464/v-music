import type { Song } from '@/views/types'

export type MusicListProps = {
  songs: Song[]
  title: string
  pic: string
  loading: boolean
}
