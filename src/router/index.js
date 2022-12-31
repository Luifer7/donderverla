import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:pelicula/:id',
      name: 'pelicula',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:current/:currentId/:pelicula/:id',
      name: 'similar',
      component: () => import('../views/SimilarView.vue')
    }
  ],
})

export default router
