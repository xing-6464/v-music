import { computed } from 'vue'
import type { IndexListProps } from './types'

export default function useShortcut(props: IndexListProps) {
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  return {
    shortcutList,
  }
}
