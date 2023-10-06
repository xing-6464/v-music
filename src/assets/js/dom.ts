export function addClass(el: Element, className: string) {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}

export function removeClass(el: Element, className: string) {
  el.classList.remove(className)
}
