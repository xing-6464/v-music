import useStore from '@/stores/store'
import { computed, ref, watch } from 'vue'

export default function useCd() {
  const cdRef = ref<HTMLDivElement | null>(null)
  const cdImageRef = ref<HTMLDivElement | null>(null)

  const store = useStore()

  const playing = computed(() => store.playing)

  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })

  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value!, cdImageRef.value!)
    }
  })

  function syncTransform(wrapper: HTMLDivElement, inner: HTMLDivElement) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform =
      wrapperTransform === 'none'
        ? innerTransform
        : innerTransform.concat(' ', wrapperTransform)
  }

  return {
    cdCls,
    cdRef,
    cdImageRef,
  }
}
