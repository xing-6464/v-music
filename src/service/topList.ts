import { get } from './base'

export default function getTopList() {
  return get('/api/getTopList')
}
