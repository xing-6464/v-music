<template>
  <div class="album">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading"></MusicList>
  </div>
</template>
<script lang="ts">
import { ALBUM_KEY } from '@/assets/js/constant'
import createDetailComponent from '@/assets/js/create-detail-component'
import { getAlbum } from '../service/recommend'

export default createDetailComponent('album', ALBUM_KEY, getAlbum)
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