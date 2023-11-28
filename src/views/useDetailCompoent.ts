import storage from 'good-storage'
import { processSongs } from '@/service/song'
import { computed, onMounted, ref } from 'vue'
import type { Albums, Singer, Song } from '@/views/types'
import type { getSingerDetail } from '@/service/singer'
import type { getAlbum } from '@/service/recommend'
import { useRoute, useRouter } from 'vue-router'

type Fetch = typeof getSingerDetail | typeof getAlbum

// export default function createDetailComponent(
//   name: string,
//   key: string,
//   fetch: Fetch
// ) {
//   return defineComponent({
//     name,
//     components: { MusicList },
//     props: {
//       data: Object,
//     },
//     data() {
//       return {
//         songs: [] as Song[],
//         loading: true,
//       }
//     },
//     computed: {
//       computedData() {
//         let ret = null
//         const data = this.data
//         if (data) {
//           ret = data
//         } else {
//           const cached = storage.session.get(key)
//           if (
//             cached &&
//             (cached.mid || cached.id + '') === this.$route.params.id
//           ) {
//             ret = cached
//           }
//         }
//         return ret
//       },
//       pic() {
//         const data = this.computedData
//         return data && data.pic
//       },
//       title() {
//         const data = this.computedData
//         return data && (data.name || data.title)
//       },
//     },
//     async created() {
//       const data = this.computedData
//       if (!data) {
//         const path = this.$route.matched[0].path
//         this.$router.push({
//           path,
//         })
//         return
//       }
//       const result = await fetch(data)
//       console.log(result)
//       this.songs = await processSongs((result as any).songs)
//       this.loading = false
//     },
//   })
// }

export default function useDetailComponent(
  props: { data: Singer | Albums },
  key: string,
  fetch: Fetch
) {
  // const props = defineProps<{ singer: Singer }>()

  const route = useRoute()
  const router = useRouter()

  const songs = ref<Song[]>([])
  const loading = ref<boolean>(true)

  const computedData = computed(() => {
    let ret = null
    const data = props.data
    if (data) {
      ret = data
    } else {
      const cachedSinger = storage.session.get(key)
      if (
        cachedSinger &&
        (cachedSinger.mid || cachedSinger.id + '') === route.params.id
      ) {
        ret = cachedSinger
      }
    }
    return ret
  })

  const pic = computed(() => {
    const data = computedData.value
    return data && data.pic
  })
  const title = computed(() => {
    const data = computedData.value
    return data && (data.name || data.title)
  })

  onMounted(async () => {
    const data = computedData.value
    if (!data) {
      const path = route.matched[0].path
      router.push({
        path,
      })
    }
    const result = await fetch(data)
    songs.value = await processSongs(result.songs)
    loading.value = false
  })

  return {
    songs,
    pic,
    title,
    loading,
  }
}
