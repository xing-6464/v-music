<template>
  <div class="singer-detail">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading"></MusicList>
  </div>
</template>

<script setup lang="ts">
import { getSingerDetail } from '@/service/singer'
import type { Singer } from './types'
import MusicList from '../components/musicList/MusicList.vue'
import { SINGER_KEY } from '../assets/js/constant'
import useDetailComponent from './useDetailCompoent'


const props = defineProps<{ data: Singer }>()

const { songs, title, pic, loading } = useDetailComponent(props, SINGER_KEY, getSingerDetail)

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