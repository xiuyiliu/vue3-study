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
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/views/layout/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
