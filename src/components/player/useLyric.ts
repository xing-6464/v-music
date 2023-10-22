import { computed, ref, watch, type Ref } from 'vue'
import useStore from '@/stores/store'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'

type UseLyricProps = { songReady:Ref<boolean>, currentTime: Ref<number> }

export default function useLyric({ songReady, currentTime }: UseLyricProps) {
  const currentLyric = ref<any>(null)
  const currentLineNum = ref(0)
  const lyricScrollRef = ref<any>(null)
  const lyricListRef = ref<HTMLDivElement | null>(null)

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
    if (songReady.value) {
      playLyric()
    }
    console.log(lyric)
  })

  function playLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  function stopLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  function handleLyric({ lineNum }: { lineNum: number }) {
    currentLineNum.value = lineNum
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl) return
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp?.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp?.scroll.scrollTo(0, 0, 1000)
    }
  }

  return {
    currentLyric,
    currentLineNum,
    playLyric,
    lyricScrollRef,
    lyricListRef,
    stopLyric
  }
}
