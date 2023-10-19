import { createApp } from 'vue'
import { createPinia } from 'pinia'
import lazyPlugin from 'vue3-lazy'
import defaultImg from './assets/images/default.png'
import loadingDirective from './components/base/loading/directive'
import noResultDirective from './components/base/noResult/directive'

import App from './App.vue'
import router from './router'

import '@/assets/scss/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(lazyPlugin, {
  loading: defaultImg,
})
app.directive('loading', loadingDirective)
app.directive('no-result', noResultDirective)

app.mount('#app')
