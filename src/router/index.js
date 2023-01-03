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
      path: '/:lasturl/:pelicula/:id',
      name: 'pelicula',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:lasturl/:current/:currentId/:pelicula/:id',
      name: 'similar',
      component: () => import('../views/SimilarView.vue')
    },
    {
      path: '/buscarseries',
      name: 'buscarseries',
      component: () => import('../views/BuscarserieView.vue')
    },
    {
      path: '/buscarpeliculas',
      name: 'buscarpeliculas',
      component: () => import('../views/BuscarpeliculaView.vue')
    }
  ],
})

export default router
