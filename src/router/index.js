import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 新增路由都用下面的寫法，不要用上面這個

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        title:'PxZoO'
      }
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('../views/TicketView.vue'),
      meta:{
        title:'立即購票 | PxZoO'
      }
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue'),
      meta:{
        title:'會員中心 | PxZoO'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta:{
        title:'登入註冊 | PxZoO'
      }
    },
    {
      path: '/animal',
      name: 'animal',
      component: () => import('../views/AnimalView.vue'),
      meta:{
        title:'動物資訊 | PxZoO'
      }
    },
    {
      path: '/park',
      name: 'park',
      component: () => import('../views/ParkView.vue'),
      meta:{
        title:'園區介紹 | PxZoO'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
      meta:{
        title:'最新消息 | PxZoO'
      }
    },
    {
      path: '/school',
      name: 'school',
      component: () => import('../views/SchoolView.vue'),
      meta:{
        title:'知識學堂 | PxZoO'
      }
    },
    {
      path: '/vote',
      name: 'vote',
      component: () => import('../views/VoteView.vue'),
      meta:{
        title:'人氣投票 | PxZoO'
      }
    },
    // 404頁面：沒有被配置的路由都會去NotFound
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

// 產生每一頁頁籤的title
router.beforeEach(async (to, from) => {
  if( to.meta && to.meta.title){
      document.title = to.meta.title
  }
})
export default router
