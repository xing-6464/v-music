<template>
  <div class="recommend" v-loading:[loadingText]="loading">
    <Scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders"></slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单列表</h1>
          <ul>
            <li v-for="item in albums" class="item" :key="item.id" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.pic" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <RouterView v-slot="{ Component }">
      <Transition appear name="slide">
        <component :is="Component" :data="selectAlbum"></component>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getRecommend } from '../service/recommend'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import { ALBUM_KEY } from '@/assets/js/constant'

// 组件
import Slider from '../components/base/slider/Slider.vue'
import Scroll from '@/components/wrapScroll/index'

import type { Sliders, Albums } from './types'

// 轮播图数据
const sliders = ref<Sliders[]>([])
// 歌单数据
const albums = ref<Albums[]>([])
const selectAlbum = ref<Albums | null>(null)

const router = useRouter()

const loadingText = ref('正在加载中...')

const loading = computed(() => {
  return !sliders.value.length && !albums.value.length
})

function selectItem(album: Albums) {
  selectAlbum.value = album
  cacheAlbum(album)
  router.push({
    path: `/recommend/${album.id}`
  })
}

function cacheAlbum(album: Albums) {
  storage.session.set(ALBUM_KEY, album)
}

onMounted(async () => {
  const result = await getRecommend()
  console.log(result)
  sliders.value = result.sliders
  albums.value = result.albums
})
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }

        .name {
          margin-bottom: 10px;
          color: $color-text;
        }

        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>