import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '../views/Recommend.vue'
import Singer from '../views/Singer.vue'
import TopList from '../views/TopList.vue'
import Search from '../views/Search.vue'
import SingerDetail from '../views/SingerDetail.vue'
import Album from '@/views/Album.vue'
import TopDetail from '@/views/TopDetail.vue'
import UserCenter from '@/views/UserCenter.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/recommend',
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Album,
        },
      ],
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail,
        },
      ],
    },
    {
      path: '/top-list',
      component: TopList,
      children: [
        {
          path: ':id',
          component: TopDetail,
        },
      ],
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail,
        },
      ],
    },
    {
      path: '/user',
      component: UserCenter,
    },
  ],
})

export default router
