<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <scroll ref="scrollRef" class="search-content" v-show="!query">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKeys" :key="item.id" @click="addQuery(item.key)">
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <confirm ref="confirmRef" text="是否清空所有历史" confirm-btn-text="清空" @confirm="clearSearch"></confirm>
          <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearch"></search-list>
        </div>
      </div>
    </scroll>
    <div class="search-result" v-show="query">
      <suggest :query="query" @select-song="selectSong" @select-singer="selectSinger"></suggest>
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slider">
        <component :is="Component" :data="selectedSinger"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';

import storage from 'good-storage'
import { useRouter } from 'vue-router'
import useStore from '@/stores/store'
import useSearchHistory from '../components/search/useSearchHistory'

import Confirm from '@/components/base/confirm/confirm.vue'
import Scroll from '@/components/wrapScroll/index'
import SearchInput from '@/components/search/SearchInput.vue'
import Suggest from '@/components/search/Suggest.vue'
import SearchList from '@/components/base/searchList/SearchList.vue'
import { getHotKeys } from '@/service/search'
import { SINGER_KEY } from '@/assets/js/constant'
import type { Singer, Song } from './types'
import type BScroll from '@better-scroll/core'
import confirm from '@/components/base/confirm/confirm.vue';

type HotKey = {
  key: string,
  id: number
}

const router = useRouter()
const store = useStore()
const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

const query = ref<string>('')
const hotKeys = ref<HotKey[]>([])
const selectedSinger = ref<Singer | null>(null)
const scrollRef = ref<BScroll | null>(null)
const confirmRef = ref<HTMLElement | null>(null)

const searchHistory = computed(() => store.searchHistory)

getHotKeys().then((res) => {
  hotKeys.value = res.hotKeys
})

watch(query, async (nweQ) => {
  if (!nweQ) {
    await nextTick()
    refreshScroll()
  }
})

function refreshScroll() {
  scrollRef.value?.scroll.refresh()
}

function addQuery(key: string) {
  query.value = key
}

function selectSong(song: Song) {
  saveSearch(query.value)
  store.addSong(song)
}

function selectSinger(singer: Singer) {
  saveSearch(query.value)
  selectedSinger.value = singer
  cacheSinger(singer)

  router.push({
    path: `/search/${singer.mid}`
  })
}

function cacheSinger(singer: Singer) {
  storage.session.set(SINGER_KEY, singer)
}

function showConfirm() {
  (confirmRef.value as any).show()
}


</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .search-input-wrapper {
    margin: 20px;
  }

  .search-content {
    flex: 1;
    overflow: hidden;

    .hot-keys {
      margin: 0 20px 20px 20px;

      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }

      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }

    .search-history {
      position: relative;
      margin: 0 20px;

      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;

        .text {
          flex: 1;
        }

        .clear {
          @include extend-click();

          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }

  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>