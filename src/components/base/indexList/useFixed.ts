import type { Singers } from '@/views/types'
import { ref, watch, nextTick } from 'vue'

export default function useFixed(props: { data: Singers[] }) {
  const groupRef = ref<HTMLUListElement | null>(null)
  const listHeights = ref<number[]>([])
  const scrollY = ref(0)

  watch(
    () => props.data,
    async () => {
      await nextTick()
      calculate()
    }
  )

  function calculate() {
    const list = groupRef.value?.children
    const listHeightsVal = listHeights.value
    let height = 0

    listHeightsVal.length = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list!.length; i++) {
      height += list![i].clientHeight
      listHeightsVal.push(height)
    }
  }

  function onScroll(pos: any) {
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
  }
}
