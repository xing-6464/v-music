import { createApp } from 'vue'
import { createPinia } from 'pinia'
import lazyPlugin from 'vue3-lazy'
import defaultImg from './assets/images/default.png'
import loadingDirective from './components/base/loading/directive'
import noResultDirective from './components/base/noResult/directive'
import { PiniaLogger } from 'pinia-logger'

import App from './App.vue'
import router from './router'

import '@/assets/scss/index.scss'

const app = createApp(App)

const pinia = createPinia()

pinia.use(
  PiniaLogger({
    expanded: true,
    disabled: import.meta.env.MODE === 'production',
    actions: ['selectPlay', 'randomPlay', 'changeMode', 'addSongLyric'],
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
