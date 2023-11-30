<template>
  <div class="suggest" v-loading:[loadingText]="!singer && !songs.length">
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li class="suggest-item" v-for="song in songs" :key="song.id">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{ song.singer }}-{{ song.name }}
          </p>
        </div>
      </li>
      <div class="suggest-item"></div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Singer, Song } from '@/views/types'
import { ref, watch } from 'vue'
import { search } from '../../service/search'
import { processSongs } from '@/service/song'


type SuggestProps = {
  query: string
  showSinger: boolean
}

const props = withDefaults(defineProps<SuggestProps>(), {
  showSinger: true
})

const singer = ref<null | Singer>()
const songs = ref<Song[]>([])
const hasMore = ref(true)
const page = ref(1)
const loadingText = ref('')

watch(() => props.query, async newQuery => {
  if (!newQuery) return

  await searchFirst()
})

async function searchFirst() {
  page.value = 1
  songs.value = []
  singer.value = null
  hasMore.value = true

  const res = await search(props.query, page.value, props.showSinger)

  songs.value = await processSongs(res.songs)
  singer.value = res.singer
  hasMore.value = res.hasMore


  // songs
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
</style>