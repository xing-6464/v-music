import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

BScroll.use(ObserveDOM)

export type ScrollProps = {
  click: boolean
}

export default function useScroll(
  wrapperRef: Ref<HTMLElement | null>,
  options: ScrollProps
) {
  const scroll = ref<BScrollConstructor>()

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value!, {
      observeDOM: true,
      ...options,
    })
  })

  onUnmounted(() => {
    scroll.value?.destroy()
  })
}
