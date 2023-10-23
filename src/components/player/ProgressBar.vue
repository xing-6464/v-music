<template>
  <div class="progress-bar" ref="progressBarRef" @click="onClick">
    <div class="bar-inner">
      <div class="progress" ref="progressRef" :style="progressStyle"></div>
      <div class="progress-btn-wrapper" :style="btnStyle" @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove" @touchend.prevent="onTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, type CSSProperties } from 'vue'


type ProgressBarProps = {
  progress: number
}
type ProgressBarEmits = {
  progressChanging: [x: number]
  progressChanged: [x: number]
}

const progressBtnWidth = 16
const touch: { [key: string]: any } = {}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  progress: 0
})

const emits = defineEmits<ProgressBarEmits>()

const progressBarRef = ref<HTMLDivElement | null>(null)
const progressRef = ref<HTMLDivElement | null>(null)
const offset = ref(0)

const progressStyle = computed<CSSProperties>(() => {
  return { width: `${offset.value}px` }
})
const btnStyle = computed<CSSProperties>(() => {
  return { transform: `translate3d(${offset.value}px, 0, 0)` }
})

watch(() => props.progress, newProgress => {
  setOffset(newProgress)
})

function onTouchStart(e: any) {
  touch.x1 = e.touches[0].pageX
  touch.beginWidth = progressRef.value?.clientWidth
}

function onTouchMove(e: any) {
  const delta = e.touches[0].pageX - touch.x1
  const tempWidth = touch.beginWidth + delta
  const barWidth = progressBarRef.value!.clientWidth - progressBtnWidth
  const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
  offset.value = barWidth * progress
  emits('progressChanging', progress)
}
function onTouchEnd() {
  const barWidth = progressBarRef.value!.clientWidth - progressBtnWidth
  const progress = progressRef.value!.clientWidth / barWidth
  emits('progressChanged', progress)
}

function onClick(e: any) {
  const progressBarVal = progressBarRef.value
  const rect = progressBarVal!.getBoundingClientRect()
  const offsetWidth = e.pageX - rect!.left
  const barWidth = progressBarVal!.clientWidth - progressBtnWidth
  const progress = offsetWidth / barWidth
  emits('progressChanged', progress)
}

function setOffset(progress: number) {
  const barWidth = progressBarRef.value!.clientWidth - progressBtnWidth
  offset.value = barWidth * progress
}

defineExpose({
  setOffset
})
</script>


<style lang="scss" scoped>
.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
