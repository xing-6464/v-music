import type { Song } from '@/views/types'
import { get } from './base'

export function processSongs(songs: { [key: string]: string }[]) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  return get('/api/getSongsUrl', {
    mid: songs.map((song) => {
      return song.mid
    }),
  }).then((result) => {
    const map = result.map
    return songs
      .map((song) => {
        song.url = map[song.mid]
        return song
      })
      .filter((song) => {
        return song.url.indexOf('vkey') > -1
      })
  })
}

const lyricMap: { [key: string]: string } = {}
export function getLyric(song: Song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  const mid = song.mid
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric)
  }

  return get('/api/getLyric', {
    mid,
  }).then((result) => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'

    lyricMap.mid = lyric
    return lyric
  })
}
