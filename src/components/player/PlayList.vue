<template>
  <teleport to="body">
    <transition name="list-fade">
      <div class="playlist" v-show="visible && playlist.length" @click="hide">
        <div class="list-wrapper" @click.stop>
          <div class="list-header">
            <h1 class="title">
              <i class="icon" :class="modeIcon" @click="changeMode">
              </i>
              <span class="text">{{ modeText }}</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
          </div>
          <scroll class="list-content" ref="scrollRef">
            <transition-group tag="ul" name="list" ref="listRef">
              <li class="item" v-for="song in sequenceList" :key="song.id" @click="selectItem(song)">
                <i class="current" :class="getCurrentIcon(song)"></i>
                <span class="text">{{ song.name }}</span>
                <span class="favorite" @click.stop="toggleFavorite(song)">
                  <i :class="getFavoriteIcon(song)"></i>
                </span>
                <span class="delete" :class="{ 'disable': removing }" @click.stop="removeSong(song)">
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </scroll>
          <div class="list-add">
            <div class="add" @click="showAddSong">
              <i class="icon-add"></i>
              <span class="text">添加歌曲到队列</span>
            </div>
          </div>
          <div class="list-footer" @click="hide">
            <span>关闭</span>
          </div>
        </div>
        <confirm ref="confirmRef" @confirm="confirmClear" text="是否清空播放列表" confirm-btn-text="清空"></confirm>
        <add-song ref="addSongRef"></add-song>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import Scroll from '@/components/base/scroll/Scroll.vue'
import Confirm from '@/components/base/confirm/confirm.vue'
import AddSong from '@/components/addSong/AddSong.vue'
import { computed, ref, nextTick, watch } from 'vue'
import useStore from '@/stores/store'
import useMode from './useMode'
import useFavorite from './useFavorite'
import type { Song } from '@/views/types'
import type Scroller from '@better-scroll/core/dist/types/scroller/Scroller'

const visible = ref(false)
const removing = ref(false)
const confirmRef = ref<HTMLElement | null>(null)
const scrollRef = ref<Scroller | null>(null)
const listRef = ref<HTMLElement | null>(null)
const addSongRef = ref<HTMLElement | null>(null)

const store = useStore()
const playlist = computed(() => store.playList)
const sequenceList = computed(() => store.sequencesList)
const currentSong = computed(() => store.currentSong)


const { getFavoriteIcon, toggleFavorite } = useFavorite()
const { modeIcon, changeMode, modeText } = useMode()

watch(currentSong, async (newSong) => {
  if (!visible.value || !newSong.id) return

  await nextTick()
  scrollToCurrent()
})

function getCurrentIcon(song: Song) {
  if (song.id === currentSong.value.id) {
    return 'icon-play'
  }
}

function hide() {
  visible.value = false
}

async function show() {
  visible.value = true

  await nextTick()
  refreshScroll()
  scrollToCurrent()
}

function removeSong(song: Song) {
  if (removing.value === true) return

  removing.value = true
  store.removeSong(song)
  if (!playlist.value.length) {
    hide()
  }
  setTimeout(() => {
    removing.value = false
  }, 300)
}


function selectItem(song: Song) {
  const index = playlist.value.findIndex(item => song.id === item.id)

  store.setCurrentIndex(index)
  store.setPlayingState(true)
}

function refreshScroll() {
  scrollRef.value!.scroll.refresh()
}

function scrollToCurrent() {
  const index = sequenceList.value.findIndex((song) => {
    return currentSong.value.id === song.id
  })

  if (index === -1) {
    return
  }

  const target = (listRef.value! as any).$el.children[index]

  scrollRef.value!.scroll.scrollToElement(target, 300)
}

function showConfirm() {
  (confirmRef.value as any).show()
}

function confirmClear() {
  store.clearSongList()
  hide()
}

function showAddSong() {
  (addSongRef.value as any).show()
}

defineExpose({
  show
})


</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;

  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity .3s;

    .list-wrapper {
      transition: all .3s;
    }
  }

  &.list-fade-enter-from,
  &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  .list-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 210;
    width: 100%;
    background-color: $color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 24px;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
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

    .list-content {
      max-height: 240px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }

        .favorite {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;

          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }
        }
      }
    }

    .list-add {
      width: 140px;
      margin: 20px auto 30px auto;

      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;

        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }

        .text {
          font-size: $font-size-small;
        }
      }
    }

    .list-footer {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>