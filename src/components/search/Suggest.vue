<template>
  <div ref="rootRef" class="suggest" v-loading:[loadingText]="loading" v-no-result:[noResultText]="noResult">
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li class="suggest-item" v-for="song in songs" :key="song.id" @click="selectSong(song)">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{ song.singer }}-{{ song.name }}
          </p>
        </div>
      </li>
      <div class="suggest-item" v-loading:[loadingText]="pullUpLoading"></div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Singer, Song } from '@/views/types'
import { ref, watch, computed, nextTick } from 'vue'
import { search } from '@/service/search'
import { processSongs } from '@/service/song'
import usePullUpLoad from '@/components/search/usePullUpLoad'

type SuggestProps = {
  query: string
  showSinger: boolean
}

const props = withDefaults(defineProps<SuggestProps>(), {
  showSinger: true
})
const emits = defineEmits<{ selectSong: [song: Song], selectSinger: [singer: Singer] }>()

const singer = ref<null | Singer>()
const songs = ref<Song[]>([])
const hasMore = ref(true)
const page = ref(1)
const loadingText = ref('')
const noResultText = ref('抱歉，暂无搜索结果')
const manualLoading = ref(false)


const noResult = computed(() => {
  return !singer.value && !songs.value.length && !hasMore.value
})
const loading = computed(() => {
  return !singer.value && !songs.value.length
})
const pullUpLoading = computed(() => {
  return isPullUpLoad.value && hasMore.value
})
const preventPullUpLoad = computed(() => {
  return loading.value || manualLoading.value
})
const { scroll, isPullUpLoad, rootRef } = usePullUpLoad(searchMore, preventPullUpLoad)

watch(() => props.query, async newQuery => {
  if (!newQuery) return

  await searchFirst()
})

async function searchMore() {
  if (!hasMore.value || !props.query) return

  page.value++
  const res = await search(props.query, page.value, props.showSinger)
  songs.value = songs.value.concat(await processSongs(res.songs))
  hasMore.value = res.hasMore

  await nextTick()
  await makeItScrollable()
}

async function searchFirst() {
  if (!props.query) return

  page.value = 1
  songs.value = []
  singer.value = null
  hasMore.value = true

  const res = await search(props.query, page.value, props.showSinger)

  songs.value = await processSongs(res.songs)
  singer.value = res.singer
  hasMore.value = res.hasMore

  await nextTick()
  await makeItScrollable()
}

async function makeItScrollable() {
  const scrollVal = scroll.value
  if (scrollVal && scrollVal.maxScrollY >= -1) {
    manualLoading.value = true
    await searchMore()
    manualLoading.value = false
  }
}

function selectSong(song: Song) {
  emits('selectSong', song)
}

function selectSinger(singer: Singer) {
  emits('selectSinger', singer)
}
</script>

<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;

      .icon {
        flex: 0 0 30px;
        width: 30px;

        [class^="icon-"] {
          font-size: 14px;
          color: $color-text-d;
        }
      }

      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;

        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>import usePullUpLoad from './usePullUpLoad.1'
