<template>
  <div class="top-detail">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading" rank></music-list>
  </div>
</template>

<script setup lang="ts">
import MusicList from '@/components/musicList/MusicList.vue'
import { TOP_KEY } from '@/assets/js/constant'
import useDetailComponent from './useDetailComponent'
import { getTopDetail } from '../service/topList'

const props = defineProps<{ data: { [key: string]: string } }>()

const { songs, title, pic, loading } = useDetailComponent(props, TOP_KEY, getTopDetail)

</script>

<style lang="scss" scoped>
.top-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>