import useStore from '@/stores/store'
import type { Song } from '@/views/types'
import { computed } from 'vue'
import { remove, save } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'

export default function useFavorite() {
  const store = useStore()
  const favoriteList = computed(() => store.favoriteList)
  const maxLen = 100

  function toggleFavorite(song: Song) {
    let list: Song[] = []
    if (isFavorite(song)) {
      // remove
      list = remove(FAVORITE_KEY, compare)
    } else {
      // save
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    store.setFavoriteList(list)

    function compare(item: Song) {
      return item.id === song.id
    }
  }

  function getFavoriteIcon(song: Song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  function isFavorite(song: Song) {
    return (
      favoriteList.value.findIndex((item) => {
        return item.id === song.id
      }) > -1
    )
  }

  return {
    getFavoriteIcon,
    toggleFavorite,
  }
}
