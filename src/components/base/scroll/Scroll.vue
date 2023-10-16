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
  click: true,
  probeType: 0
})

const emits = defineEmits<ScrollEmits>()

const rootRef = ref<HTMLElement | null>(null)

const scroll = useScroll(rootRef, props, emits)

defineExpose({
  scroll
})

</script>

<style scoped lang="scss"></style>