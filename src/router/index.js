import { createRouter, createWebHistory } from 'vue-router'
import InstituteView from '@/views/InstituteView.vue';
import PracticeView from '@/views/PracticeView.vue';
import UserView from '@/views/UserView'
import AuthView from '@/views/AuthView.vue'
import UpdateView from '@/views/UpdateView.vue'
import AdminView from '@/views/AdminView.vue'
const routes = [
  { 
    
    path: '/out',
    name: 'home',
    component: InstituteView
  },{
    path: '/out/partner',
    name: 'partner',
    component: PracticeView
  },
  {
    path: '/out/auth',
    name: 'auth',
    component: UserView
  },
  {
    path: '/out/user',
    name: 'user',
    component: AuthView
  },
  {
    path: '/out/update',
    name: 'update',
    component: UpdateView
  },
  {
    path: "/out/admin",
    name: "admin",
    component: AdminView
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
