<template>
  <div class="singer-detail">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading"></MusicList>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '../service/song'
import type { Singer, Song } from './types'
import MusicList from '../components/musicList/MusicList.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '../assets/js/constant'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{ singer: Singer }>()

const route = useRoute()
const router = useRouter()

const songs = ref<Song[]>([])
const loading = ref<boolean>(true)

const computedSinger = computed(() => {
  let ret = null
  const singer = props.singer
  if (singer) {
    ret = singer
  } else {
    const cachedSinger = storage.session.get(SINGER_KEY)
    if (cachedSinger && cachedSinger.mid === route.params.id) {
      ret = cachedSinger
    }
  }
  return ret
})

const pic = computed(() => {
  const computedSingerVal = computedSinger.value
  return computedSingerVal && computedSingerVal.pic
})
const title = computed(() => {
  const computedSingerVal = computedSinger.value
  return computedSingerVal && computedSingerVal.name
})

onMounted(async () => {
  if (!computedSinger.value) {
    const path = route.matched[0].path
    router.push({
      path
    })
  }
  const result = await getSingerDetail(computedSinger.value)
  songs.value = await processSongs(result.songs)
  loading.value = false
})

</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>