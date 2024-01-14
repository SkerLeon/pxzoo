import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 新增路由都用下面的寫法，不要用上面這個

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('../views/TicketView.vue')
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/animal',
      name: 'animal',
      component: () => import('../views/AnimalView.vue')
    },
    {
      path: '/park',
      name: 'park',
      component: () => import('../views/ParkView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/school',
      name: 'school',
      component: () => import('../views/SchoolView.vue')
    },
    {
      path: '/vote',
      name: 'vote',
      component: () => import('../views/VoteView.vue')
    }
  ]
})

export default router
