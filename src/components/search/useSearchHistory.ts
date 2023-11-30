import { save } from '@/assets/js/array-store'
import { SEARCH_KEY } from '@/assets/js/constant'
import useStore from '@/stores/store'

export default function useSearchHistory() {
  const maxLen = 200

  const store = useStore()

  function saveSearch(query: string) {
    const searches = save(
      query,
      SEARCH_KEY,
      (item) => {
        return item === query
      },
      maxLen
    )

    store.setSearchHistory(searches)
  }

  return {
    saveSearch,
  }
}
