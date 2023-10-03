<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useScroll from './useScroll.ts'
import type { ScrollProps } from './useScroll'


const props = withDefaults(defineProps<ScrollProps>(), {
  click: () => true,
})

const rootRef = ref<HTMLElement | null>(null)

useScroll(rootRef, props)

</script>

<style scoped lang="scss"></style>