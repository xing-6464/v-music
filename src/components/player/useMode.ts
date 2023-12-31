import { computed } from 'vue'
import useStore from '../../stores/store'
import { PLAY_MODE } from '@/assets/js/constant'

export default function useMode() {
  const store = useStore()
  const playMode = computed(() => store.playMode)

  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? 'icon-sequence'
      : playModeVal === PLAY_MODE.random
      ? 'icon-random'
      : 'icon-loop'
  })

  const modeText = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? '顺序播放'
      : playModeVal === PLAY_MODE.random
      ? '循环播放'
      : '单曲循环'
  })

  function changeMode() {
    const mode = (playMode.value + 1) % 3
    store.changeMode(mode)
  }

  return {
    playMode,
    modeIcon,
    changeMode,
    modeText,
  }
}
