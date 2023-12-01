<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import MHeader from './components/header/Header.vue'
import Tab from './components/tab/Tab.vue'
import Player from './components/player/Player.vue'
import useStore from './stores/store'

const store = useStore()

const viewStyle = computed<CSSProperties>(() => {
  const bottom = store.playList.length ? '60px' : ''
  return {
    bottom
  }
})


</script>

<template>
  <m-header></m-header>
  <Tab></Tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <router-view :style="viewStyle" name="user" v-slot="{ Component }">
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
  <Player></Player>
</template>

<style scoped></style>
