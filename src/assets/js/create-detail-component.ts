import MusicList from '@/components/musicList/MusicList.vue'
import storage from 'good-storage'
import { processSongs } from '@/service/song'
import { defineComponent } from 'vue'
import type { Song } from '@/views/types'
import type { getSingerDetail } from '@/service/singer'
import type { getAlbum } from '@/service/recommend'

type Fetch = typeof getSingerDetail | typeof getAlbum

export default function createDetailComponent(
  name: string,
  key: string,
  fetch: Fetch
) {
  return defineComponent({
    name,
    components: { MusicList },
    props: {
      data: Object,
    },
    data() {
      return {
        songs: [] as Song[],
        loading: true,
      }
    },
    computed: {
      computedData() {
        let ret = null
        const data = this.data
        if (data) {
          ret = data
        } else {
          const cached = storage.session.get(key)
          if (
            cached &&
            (cached.mid || cached.id + '') === this.$route.params.id
          ) {
            ret = cached
          }
        }
        return ret
      },
      pic() {
        const data = this.computedData
        return data && data.pic
      },
      title() {
        const data = this.computedData
        return data && (data.name || data.title)
      },
    },
    async created() {
      const data = this.computedData
      if (!data) {
        const path = this.$route.matched[0].path
        this.$router.push({
          path,
        })
        return
      }
      const result = await fetch(data)
      this.songs = await processSongs((result as any).songs)
      this.loading = false
    },
  })
}
