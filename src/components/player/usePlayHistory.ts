import { save } from '@/assets/js/array-store'
import { PLAY_KEY } from '@/assets/js/constant'
import useStore from '@/stores/store'
import type { Song } from '@/views/types'

export default function usePlayHistory() {
  const store = useStore()
  const maxLen = 200

  function savePlay(song: Song) {
    const songs = save(song, PLAY_KEY, (item) => item.id === song.id, maxLen)

    store.setPlayHistory(songs)
  }

  return {
    savePlay,
  }
}
