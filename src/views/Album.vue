<template>
  <div class="album">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading"></MusicList>
  </div>
</template>
<script setup lang="ts">
import { ALBUM_KEY } from '@/assets/js/constant'
import MusicList from '@/components/musicList/MusicList.vue'
import { getAlbum } from '../service/recommend'
import useDetailComponent from './useDetailCompoent'
import type { Singer } from './types'

const props = defineProps<{ data: Singer }>()

const { songs, title, pic, loading } = useDetailComponent(props, ALBUM_KEY, getAlbum)
console.log(songs)

</script>

<style lang="scss" scoped>
.album {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>