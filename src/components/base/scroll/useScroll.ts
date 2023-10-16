import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

BScroll.use(ObserveDOM)

export type ScrollProps = {
  click: boolean
  probeType: number
}

export type ScrollEmits = {
  (e: 'scroll', height: any): void
}

export default function useScroll(
  wrapperRef: Ref<HTMLElement | null>,
  options: ScrollProps,
  emits: ScrollEmits
) {
  const scroll = ref<BScrollConstructor>()

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(wrapperRef.value!, {
      observeDOM: true,
      ...options,
    }))

    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos: any) => {
        emits('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value?.destroy()
  })
}
