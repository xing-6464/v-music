<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger" />
    <!-- <RouterView :singer="selectedSinger"></RouterView> -->
    <RouterView v-slot="{ Component }">
      <Transition appear name="slide">
        <component :is="Component" :data="selectedSinger"></component>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { getSingerList } from '@/service/singer'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Singer, Singers } from './types'
import IndexList from '../components/indexList/IndexList.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '../assets/js/constant'

const singers = ref<Singers[]>([])
const selectedSinger = ref<Singer>()
const router = useRouter()

onMounted(async () => {
  const result = await getSingerList()
  singers.value = result.singers
})

function selectSinger(singer: Singer) {
  selectedSinger.value = singer
  cacheSinger(singer)
  router.push({
    path: `/singer/${singer.mid}`
  })
}

function cacheSinger(singer: Singer) {
  storage.session.set(SINGER_KEY, singer)
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