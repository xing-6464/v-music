<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger" />
    <RouterView :singer="selectedSinger"></RouterView>
  </div>
</template>

<script setup lang="ts">
import { getSingerList } from '@/service/singer'
import { onMounted, ref } from 'vue'
import IndexList from '../components/base/indexList/IndexList.vue'
import type { Singer, Singers } from './types'
import { useRouter } from 'vue-router'

const singers = ref<Singers[]>([])
const selectedSinger = ref<Singer>()
const router = useRouter()

onMounted(async () => {
  const result = await getSingerList()
  singers.value = result.singers
})

function selectSinger(singer: Singer) {
  selectedSinger.value = singer
  router.push({
    path: `/singer/${singer.mid}`
  })
}

</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>