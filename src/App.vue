<script setup lang="ts">
import MHeader from './components/header/Header.vue'
import Tab from './components/tab/Tab.vue'
import Player from './components/player/Player.vue'
</script>

<template>
  <m-header></m-header>
  <Tab></Tab>
  <router-view></router-view>
  <Player></Player>
</template>

<style scoped></style>
