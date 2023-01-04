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
      path: '/pelicula/:lasturl/:pelicula/:id',
      name: 'pelicula',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:lasturl/:current/:currentId/:pelicula/:id',
      name: 'similar',
      component: () => import('../views/SimilarView.vue')
    },
    {
      path: '/:lasturl/:current/:currentId/person/:id',
      name: 'person',
      component: () => import('../views/PersonView.vue')
    },
    {
      path: '/:serie/:id',
      name: 'serie',
      component: () => import('../views/SeriesView.vue')
    },
    {
      path: '/:current/:currentId/:person/:id',
      name: 'personserie',
      component: () => import('../views/PersonserieView.vue')
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
