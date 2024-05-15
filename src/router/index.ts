import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import EditView from '@/views/EditView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'EditView'
    }
  },
  {
    path: '/edit',
    name: 'EditView',
    component: EditView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
