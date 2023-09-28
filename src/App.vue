<script setup lang="ts">
import MHeader from './components/header/Header.vue'
import Tab from './components/tab/Tab.vue'
</script>

<template>
  <m-header></m-header>
  <tab></tab>
  <router-view></router-view>
</template>

<style scoped></style>
