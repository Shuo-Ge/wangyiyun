import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../components/home/Home.vue')
const Find = () => import('../components/home/Find.vue')
const ListView = () => import('../components/home/children/ListView.vue')
const PlayMusicList = () => import('../components/home/playmusic/PlayMusicList.vue')
const MusicMv = () => import('../components/home/musicmv/MusicMv.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: 'home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/find',
      },
      {
        path: '/find',
        component: Find
      }, {
        path: '/listview',
        component: ListView
      },
      {
        path: '/musicmv',
        component: MusicMv
      }

    ]
  },
  {
    path: '/playmusiclist',
    component: PlayMusicList
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
