import type { Ref } from 'vue'
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'

import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

BScroll.use(Slide)

export default function useSlider(wrapperRef: Ref<HTMLElement | null>) {
  const slider = ref<BScrollConstructor>()
  const currentPageIndex = ref(0)

  onMounted(() => {
    const sliderValue = (slider.value = new BScroll(wrapperRef.value!, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    }))

    sliderValue.on('slideWillChange', (page: { pageX: number }) => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value?.destroy()
  })

  onActivated(() => {
    slider.value?.enable()
    slider.value?.refresh()
  })

  onDeactivated(() => {
    slider.value?.disable()
  })

  return { slider, currentPageIndex }
}
