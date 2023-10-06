<template>
  <div class="singer">
    歌手页面
  </div>
</template>

<script setup lang="ts">
import { getSingerList } from '@/service/singer'
import { onMounted } from 'vue'

onMounted(async () => {
  const result = await getSingerList()
  console.log(result)
})


</script>

<style lang="scss" scoped></style>