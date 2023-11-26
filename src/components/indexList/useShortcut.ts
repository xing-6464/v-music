import { computed, ref, type Ref } from 'vue'
import type { IndexListProps } from './types'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

export default function useShortcut(props: IndexListProps, groupRef: Ref<HTMLUListElement | null>) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref<HTMLElement | null>(null)
  
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  const touch: { [index: string]: number } = {}

  function onShortTouchStart(e: any) {
    console.log(e.target!.dataset.index)
    const anchorIndex = parseInt(e.target!.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex

    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove(e: any) {
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta

    scrollTo(anchorIndex)
  }

  function scrollTo(index: number) {
    if (isNaN(index)) return
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value!.children[index]
    const scroll = scrollRef.value?.scroll as unknown as BScrollConstructor<{}> | undefined 
    scroll!.scrollToElement(targetEl as HTMLElement, 0, 0, 0)
  }

  return {
    scrollRef,
    shortcutList,
    onShortTouchStart,
    onShortcutTouchMove
  }
}
