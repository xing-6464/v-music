import { defineStore } from 'pinia'
import type { StoreState } from './types'
import { PLAY_MODE } from '@/assets/js/constant'
import type { Song } from '@/views/types'
import { shuffle } from '@/assets/js/util'

const useStore = defineStore('store', {
  state: (): StoreState => {
    return {
      sequencesList: [],
      playList: [],
      playing: false,
      playMode: PLAY_MODE.sequence,
      currentIndex: 0,
      fullScreen: false,
    }
  },
  getters: {
    currentSong(state) {
      return state.playList[state.currentIndex]
    },
  },
  actions: {
    selectPlay({ list, index }: { list: Song[]; index: number }) {
      this.setPlayMode(PLAY_MODE.sequence)
      this.setSequenceList(list)
      this.setPlayingState(true)
      this.setFullScreen(true)
      this.setPlayList(list)
      this.setCurrentIndex(index)
    },
    randomPlay(list: Song[]) {
      this.setPlayMode(PLAY_MODE.random)
      this.setSequenceList(list)
      this.setPlayingState(true)
      this.setFullScreen(true)
      this.setPlayList(shuffle(list))
      this.setCurrentIndex(0)
    },
    setPlayingState(playing: boolean) {
      this.playing = playing
    },
    setSequenceList(list: any[]) {
      this.sequencesList = list
    },
    setPlayList(list: any[]) {
      this.playList = list
    },
    setPlayMode(mode: number) {
      this.playMode = mode
    },
    setCurrentIndex(index: number) {
      this.currentIndex = index
    },
    setFullScreen(fullScreen: boolean) {
      this.fullScreen = fullScreen
    },
  },
})

export default useStore
