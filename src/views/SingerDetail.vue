<template>
  <div class="singer-detail">
    hello {{ props.singer }}
  </div>
</template>

<script setup lang="ts">
import { getSingerDetail } from '@/service/singer'
import { onMounted } from 'vue'
import type { Singer } from './types'

const props = defineProps<{ singer: Singer }>()

onMounted(async () => {
  const result = await getSingerDetail(props.singer)
  console.log(result)
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