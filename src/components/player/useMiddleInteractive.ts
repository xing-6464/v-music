import { ref, type CSSProperties } from 'vue'

export default function useMiddleInteractive() {
  const currentShow = ref<'cd' | 'lyric'>('cd')
  const middleLStyle = ref<CSSProperties>()
  const middleRStyle = ref<CSSProperties>()

  const touch: { startX?: number, percent?: number } = {}
  let currentView: 'cd' | 'lyric' = 'cd'

  function onMiddleTouchStart(e: any) {
    touch.startX = e.touches[0].pageX 
  }

  function onMiddleTouchMove(e: any) {
    const deltaX = e.touches[0].pageX - touch.startX!
    const left = currentView === 'cd' ? 0 : -window.innerWidth

    const offsetWidth = Math.min(0, Math.max(deltaX + left, -window.innerWidth))
    console.log(touch)
    
    touch.percent = Math.abs(offsetWidth / window.innerWidth)

    if (currentView === 'cd') {
      if (touch.percent > 0.2) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else {
      if (touch.percent < 0.8) {
        currentShow.value = 'cd'
      } else {
        currentShow.value = 'lyric'
      }
    }
    
    middleLStyle.value = {
      opacity: 1 - touch.percent,
      transitionDuration: '0ms'
    }

    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: '0ms'
    }
  }

  function onMiddleTouchEnd() {
    let offsetWidth: number
    let opacity: number
    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }

    const duration = 300


    middleLStyle.value = {
      opacity,
      transitionDuration: `${duration}ms`
    }

    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: `${duration}ms`
    }
  }
  
  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchEnd,
    onMiddleTouchMove,
    onMiddleTouchStart
  }
}
