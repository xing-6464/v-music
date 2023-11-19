import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import useStore from '@/stores/store'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default function useMiniSlider() {
  const sliderWrapperRef = ref<HTMLDivElement | null>(null)
  const slider = ref<BScroll | null>(null)

  const store = useStore()
  const fullScreen = computed(() => store.fullScreen)
  const playlist = computed(() => store.playList)
  const currentIndex = computed(() => store.currentIndex)

  const sliderShow = computed(() => {
    return !fullScreen.value && !!playlist.value
  })

  onMounted(() => {
    let sliderVal: BScroll | null

    watch(sliderShow, async (newSliderShow) => {
      if (newSliderShow) {
        await nextTick()
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value!, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true,
            },
          })

          sliderVal.on('slidePageChanged', ({ pageX }: { pageX: number }) => {
            store.setCurrentIndex(pageX)
            store.setPlayingState(true)
          })
        } else {
          sliderVal.refresh()
        }
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })

    watch(currentIndex, (newIndex) => {
      if (sliderVal && sliderShow.value) {
        sliderVal.goToPage(newIndex, 0, 0)
      }
    })

    watch(playlist, async (newList) => {
      if (sliderVal && sliderShow.value && newList.length) {
        await nextTick()
        sliderVal.refresh()
      }
    })
  })

  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy()
    }
  })

  return {
    sliderWrapperRef,
    slider,
  }
}
