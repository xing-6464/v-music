import { defineStore } from 'pinia'
import type { StoreState } from './types'
import { FAVORITE_KEY, PLAY_MODE, SEARCH_KEY } from '@/assets/js/constant'
import type { Song } from '@/views/types'
import { shuffle } from '@/assets/js/util'
import { load } from '@/assets/js/array-store'

function findIndex(list: Song[], song: Song) {
  return list.findIndex((item) => item.id === song.id)
}

const useStore = defineStore('store', {
  state: (): StoreState => {
    return {
      sequencesList: [],
      playList: [],
      playing: false,
      playMode: PLAY_MODE.sequence,
      currentIndex: 0,
      fullScreen: false,
      favoriteList: load(FAVORITE_KEY),
      searchHistory: load(SEARCH_KEY),
    }
  },
  getters: {
    currentSong(state) {
      return state.playList[state.currentIndex] || {}
    },
  },
  actions: {
    addSong(song: Song): void {
      const playList = [...this.playList]
      const sequenceList = [...this.sequencesList]
      let currentIndex = this.currentIndex
      const playIndex = findIndex(playList, song)
      if (playIndex > -1) {
        currentIndex = playIndex
      } else {
        playList.push(song)
        currentIndex = playList.length - 1
      }

      const sequenceIndex = findIndex(sequenceList, song)
      if (sequenceIndex === -1) {
        sequenceList.push(song)
      }

      this.setSequenceList(sequenceList)
      this.setPlayList(playList)
      this.setCurrentIndex(currentIndex)
      this.setPlayingState(true)
      this.setFullScreen(true)
    },
    clearSongList() {
      this.setSequenceList([])
      this.setPlayList([])
      this.setCurrentIndex(0)
      this.setPlayingState(false)
    },
    removeSong(song: Song): void {
      const sequencesList = this.sequencesList.slice()
      const playList = this.playList.slice()

      const sequenceIndex = findIndex(sequencesList, song)
      const playIndex = findIndex(playList, song)
      if (sequenceIndex < 0 || playIndex < 0) return

      sequencesList.splice(sequenceIndex, 1)
      playList.splice(playIndex, 1)

      let currentIndex = this.currentIndex
      if (playIndex < currentIndex || currentIndex === playList.length) {
        currentIndex--
      }

      this.setSequenceList(sequencesList)
      this.setPlayList(playList)
      this.setCurrentIndex(currentIndex)
      if (!playList.length) {
        this.setPlayingState(false)
      }
    },
    addSongLyric({ song, lyric }: { song: Song; lyric: string }) {
      this.sequencesList.map((item) => {
        if (item.mid === song.mid) {
          item.lyric = lyric
        }
        return item
      })
    },
    changeMode(mode: number) {
      const currentId = this.currentSong.id
      if (mode === PLAY_MODE.random) {
        this.setPlayList(shuffle(this.sequencesList))
      } else {
        this.setPlayList(this.sequencesList)
      }

      const index = this.playList.findIndex((song) => {
        return song.id === currentId
      })

      this.setCurrentIndex(index)
      this.setPlayMode(mode)
    },
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
    setSequenceList(list: Song[]) {
      this.sequencesList = list
    },
    setPlayList(list: Song[]) {
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
    setFavoriteList(list: Song[]) {
      this.favoriteList = list
    },
    setSearchHistory(searches: string[]) {
      this.searchHistory = searches
    },
  },
})

export default useStore
