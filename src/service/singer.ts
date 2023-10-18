import type { Singer } from '@/views/types'
import { get } from './base'

export function getSingerList() {
  return get('/api/getSingerList')
}

export function getSingerDetail(singer: Singer) {
  return get('/api/getSingerDetail', {
    mid: singer.mid,
  })
}
