import useStore from '@/stores/store'
import type { Song } from '@/views/types'
import { computed } from 'vue'
import { save } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'

export default function useFavorite() {
  const store = useStore()
  const favoriteList = computed(() => store.favoriteList)

  function toggleFavorite(song: Song) {
    let list: Song[] = []
    if (isFavorite(song)) {
      // remove
    } else {
      // save
      list = save(song, FAVORITE_KEY, compare)
    }
    store.setFavoriteList(list)

    function compare(item: Song) {
      return item.ide === song.id
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
