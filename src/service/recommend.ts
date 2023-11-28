import type { Albums } from '@/views/types'
import { get } from './base'

export function getRecommend() {
  return get('/api/getRecommend')
}

export function getAlbum(album: Albums) {
  return get('/api/getAlbum', {
    id: album.id,
  })
}
