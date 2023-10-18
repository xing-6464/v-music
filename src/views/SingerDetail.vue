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

const props = defineProps<{ singer: Singer }>()

const songs = ref<Song[]>([])
const loading = ref<boolean>(true)

const pic = computed(() => {
  return props.singer && props.singer.pic
})
const title = computed(() => {
  return props.singer && props.singer.name
})

onMounted(async () => {
  const result = await getSingerDetail(props.singer)
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