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
  [key: string]: string
}

export type { Sliders, Albums, Singer, Singers, Song }
