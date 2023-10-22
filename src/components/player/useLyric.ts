import { computed, ref, watch } from 'vue'
import useStore from '@/stores/store'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'

export default function useLyric() {
  const currentLyric = ref<any>(null)

  const store = useStore()
  const currentSong = computed(() => store.currentSong)

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.mid) return

    const lyric = await getLyric(newSong)
    store.addSongLyric({
      song: newSong,
      lyric,
    })
    if (currentSong.value.lyric !== lyric) return

    currentLyric.value = new Lyric(lyric, handleLyric)
    console.log(lyric)
  })

  function handleLyric() {}
}
