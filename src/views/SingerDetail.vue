<template>
  <div class="singer-detail">
    <MusicList :songs="getSongs" :title="title" :pic="pic"></MusicList>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '../service/song'
import type { Singer, Song } from './types'
import MusicList from '../components/musicList/MusicList.vue'

const props = defineProps<{ singer: Singer }>()

const getSongs = ref<Song[]>([])

const pic = computed(() => {
  return props.singer && props.singer.pic
})
const title = computed(() => {
  return props.singer && props.singer.name
})

onMounted(async () => {
  const result = await getSingerDetail(props.singer)
  const songs = await processSongs(result.songs)
  getSongs.value = songs
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