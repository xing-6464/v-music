<template>
  <div class="singer-detail">
  </div>
</template>

<script setup lang="ts">
import { getSingerDetail } from '@/service/singer'
import { onMounted } from 'vue'
import type { Singer } from './types'
import { processSongs } from '../service/song'

const props = defineProps<{ singer: Singer }>()

onMounted(async () => {
  const result = await getSingerDetail(props.singer)
  const songs = await processSongs(result.songs)
  console.log(songs)
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