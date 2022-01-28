import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import('@/views/note/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
