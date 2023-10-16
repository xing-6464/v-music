<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useScroll from './useScroll.ts'
import type { ScrollProps, ScrollEmits } from './useScroll'


const props = withDefaults(defineProps<ScrollProps>(), {
  click: () => true,
  probeType: () => 0
})

const emits = defineEmits<ScrollEmits>()

const rootRef = ref<HTMLElement | null>(null)

useScroll(rootRef, props, emits)

</script>

<style scoped lang="scss"></style>