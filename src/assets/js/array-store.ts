import storage from 'good-storage'

type Compare = (val: any, index?: number, obj?: any[]) => boolean

function insertArray(
  arr: any[],
  val: any,
  compare: Compare,
  maxLen?: number
): void {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr: any[], compare: Compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function save(
  item: any,
  key: string,
  compare: Compare,
  maxLen?: number
) {
  const items = storage.get(key, [])
  insertArray(items, item, compare, maxLen)
  storage.set(key, items)
  return items
}

export function remove(key: string, compare: Compare) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

export function load(key: string) {
  return storage.get(key, [])
}

export function clear(key: string) {
  storage.remove(key)
  return []
}

export function saveAll(items: any, key: string) {
  storage.set(key, items)
}
