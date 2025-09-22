import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import RunEditView from '@/views/edit/RunEditView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'RunEditView'
    }
  },
  {
    path: '/edit',
    name: 'RunEditView',
    component: RunEditView
  },
  {
    path: '/edit/v4',
    name: 'RunEditView',
    component: RunEditView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
