<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" />
  </div>
</template>

<script setup lang="ts">
import { getSingerList } from '@/service/singer'
import { onMounted, ref } from 'vue'
import IndexList from '../components/base/indexList/IndexList.vue'
import type { Singers } from './types'

const singers = ref<Singers[]>([])

onMounted(async () => {
  const result = await getSingerList()
  singers.value = result.singers
})

</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>