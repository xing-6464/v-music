import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import {
  onMounted,
  onUnmounted,
  ref,
  type ComputedRef,
  type Ref,
  onDeactivated,
  onActivated,
} from 'vue'

type UsePullUpLoad = {
  scroll: Ref<BScroll | null>
  rootRef: Ref<HTMLDivElement | null>
  isPullUpLoad: Ref<boolean>
}

BScroll.use(PullUp)
BScroll.use(ObserveDOM)

export default function usePullUpLoad(
  requestData: () => Promise<any>,
  preventPullUpLoad: ComputedRef<boolean>
): UsePullUpLoad {
  const scroll = ref<BScroll | null>(null)
  const rootRef = ref<HTMLDivElement | null>(null)
  const isPullUpLoad = ref(false)

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(
      rootRef.value as HTMLDivElement,
      {
        pullUpLoad: true,
        observeDOM: true,
        click: true,
      }
    ))

    scrollVal.on('pullingUp', pullingUpHandler)

    async function pullingUpHandler() {
      if (preventPullUpLoad.value) {
        scrollVal.finishPullUp()
        return
      }
      isPullUpLoad.value = true

      await requestData()

      scrollVal.finishPullUp()
      scrollVal.refresh()
      isPullUpLoad.value = false
    }
  })

  onUnmounted(() => {
    scroll.value?.destroy()
  })

  onActivated(() => {
    scroll.value?.enable()
    scroll.value?.refresh()
  })

  onDeactivated(() => {
    scroll.value?.disable()
  })

  return {
    scroll: scroll as Ref<BScroll | null>,
    rootRef,
    isPullUpLoad,
  }
}
