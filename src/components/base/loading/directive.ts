import { createApp } from 'vue'
import type { Directive } from 'vue'
import Loading from './loading.vue'

const loadingDirective: Directive = {
  mounted(el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance

    if (binding.value) {
      append(el)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  },
}

function append(el: any) {
  el.appendChild(el.instance.$el)
}
function remove(el: any) {
  el.removeChild(el.instance.$el)
}

export default loadingDirective
