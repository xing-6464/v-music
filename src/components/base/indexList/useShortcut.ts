import { computed, ref, type Ref } from 'vue'
import type { IndexListProps } from './types'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

export default function useShortcut(props: IndexListProps, groupRef: Ref<HTMLUListElement | null>) {
  const scrollRef = ref<HTMLElement | null>(null)
  
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  function onShortTouchStart(e: TouchEvent) {
    const anchorIndex = e.target!.dataset.index
    const targetEl = groupRef.value!.children[anchorIndex]
    const scroll = scrollRef.value?.scroll as unknown as BScrollConstructor<{}> | undefined 
    scroll!.scrollToElement(targetEl as HTMLElement, 0, true, true)
  }

  return {
    scrollRef,
    shortcutList,
    onShortTouchStart,
  }
}
