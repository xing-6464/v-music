<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ props.title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div v-show="props.songs.length > 0" class="play-btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <Scroll class="list" :style="scrollStyle" v-loading="props.loading" v-no-result="noResult" :probe-type="3"
      @scroll="onScroll">
      <div class="song-list-wrapper">
        <song-list :songs="props.songs" @select="selectItem" :rank="rank"></song-list>
      </div>
    </Scroll>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type CSSProperties, onMounted } from 'vue'
import SongList from '../base/songList/SongList.vue'
import Scroll from '@/components/wrapScroll/index'
import type { MusicListProps } from './types'
import { useRouter } from 'vue-router'
import useStore from '@/stores/store'
import type { Song } from '@/views/types'

const RESERVED_HEIGHT = 40

const props = withDefaults(defineProps<MusicListProps>(), {
  songs: () => [],
  noResultText: '抱歉，没有找到默认的歌曲',
  rank: false
})

const store = useStore()
const router = useRouter()

const bgImage = ref<HTMLElement>()
const imageHeight = ref<number>(0)
const scrollY = ref<number>(0)
const maxTranslateY = ref<number>(0)

const playBtnStyle = computed<CSSProperties>(() => {
  let display = ''
  if (scrollY.value >= maxTranslateY.value) {
    display = 'none'
  }
  return {
    display
  }
})
const bgImageStyle = computed<CSSProperties>(() => {
  let zIndex = 0
  let paddingTop: number | string = '70%'
  let height: number | string = 0
  let translateZ = 0

  const scrollYVal = scrollY.value

  if (scrollYVal > maxTranslateY.value) {
    zIndex = 10
    paddingTop = 0
    height = `${RESERVED_HEIGHT}px`
    translateZ = 1
  }

  let scale = 1
  if (scrollYVal < 0) {
    scale = 1 + Math.abs(scrollYVal / imageHeight.value)
  }
  return { backgroundImage: `url(${props.pic})`, zIndex, paddingTop, height, transform: `scale(${scale})translateZ(${translateZ})` }
})
const scrollStyle = computed<CSSProperties>(() => {
  const bottom = store.playList.length ? '60px' : ''
  return { top: `${imageHeight.value}px`, bottom }
})
const filterStyle = computed<CSSProperties>(() => {
  let blur = 0
  const scrollYVal = scrollY.value
  const imageHeightVal = imageHeight.value
  if (scrollYVal >= 0) {
    blur = Math.min(maxTranslateY.value / imageHeightVal, scrollYVal / imageHeightVal) * 20
  }
  return {
    backdropFilter: `blur(${blur}px)`
  }
})

const noResult = computed(() => {
  return !props.loading && !props.songs.length
})

onMounted(() => {
  imageHeight.value = bgImage.value?.clientHeight ? bgImage.value?.clientHeight : 0
  maxTranslateY.value = imageHeight.value - RESERVED_HEIGHT
})

function goBack() {
  router.back()
}

function onScroll(pos: any) {
  scrollY.value = -pos.y
}

function selectItem({ song, index }: { song: Song, index: number }) {
  store.selectPlay({
    list: props.songs,
    index
  })
}

function random() {
  store.randomPlay(props.songs)
}

</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;

    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;

      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }

      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }

      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;

    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
