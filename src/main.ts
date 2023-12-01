import { createApp } from 'vue'
import { createPinia } from 'pinia'
import lazyPlugin from 'vue3-lazy'
import { PiniaLogger } from 'pinia-logger'

import defaultImg from './assets/images/default.png'
import loadingDirective from './components/base/loading/directive'
import noResultDirective from './components/base/noResult/directive'
import App from './App.vue'
import router from './router'
import { load, saveAll } from './assets/js/array-store'

import '@/assets/scss/index.scss'
import { FAVORITE_KEY, PLAY_KEY } from './assets/js/constant'
import { processSongs } from './service/song'
import useStore from './stores/store'

const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then((songs) => {
    useStore().setFavoriteList(songs)
    saveAll(songs, FAVORITE_KEY)
  })
}

const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    useStore().setPlayHistory(songs)
    saveAll(songs, PLAY_KEY)
  })
}

const app = createApp(App)

const pinia = createPinia()

pinia.use(
  PiniaLogger({
    expanded: true,
    disabled: import.meta.env.MODE === 'production',
    actions: [
      'selectPlay',
      'randomPlay',
      'changeMode',
      'addSongLyric',
      'removeSong',
      'setPlayingState',
    ],
  })
)

app.use(pinia)
app.use(router)

app.use(lazyPlugin, {
  loading: defaultImg,
})
app.directive('loading', loadingDirective)
app.directive('no-result', noResultDirective)

app.mount('#app')
