type Sliders = { id: string; pic: string; link: string }
type Albums = {
  id: string
  pic: string
  title: string
  username: string
}

type Singer = {
  id: number
  mid: string
  name: string
  pic: string
}

type Singers = {
  title: string
  list: Singer[]
}

type Song = {
  album: string
  duration: number
  id: number
  mid: string
  name: string
  pic: string
  singer: string
  url: string
  lyric?: string
}

export type { Sliders, Albums, Singer, Singers, Song }
