<template>
  <div class="recommend">
    推荐页面
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { getRecommend } from '../service/recommend';

onMounted(async () => {
  const result = await getRecommend()
  console.log(result)
})
</script>

<style lang="scss" scoped></style>