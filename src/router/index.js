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
      path: '/pelicula/:pelicula/:id',
      name: 'pelicula',
      component: () => import('../views/PeliculaView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/serie/:serie/:id',
      name: 'serie',
      component: () => import('../views/SerieView.vue')
    },
    {
      path: '/similar/:current/:currentId/:pelicula/:id',
      name: 'similar',
      component: () => import('../views/SimilarView.vue')
    },
    {
      path: '/:current/:currentId/personpelicula/:id',
      name: 'person',
      component: () => import('../views/PersonView.vue')
    },
    {
      path: '/:current/:currentId/:person/:id',
      name: 'personserie',
      component: () => import('../views/PersonserieView.vue')
    },
    {
      path: '/:current/:currentId/temporada/:numero/',
      name: 'temporada',
      component: () => import('../views/TemporadasView.vue')
    },
    {
      path: '/buscarseries',
      name: 'buscarseries',
      component: () => import('../views/BuscarserieView.vue')
    },
    {
      path: '/buscarpelicula',
      name: 'buscarpelicula',
      component: () => import('../views/BuscarpeliculaView.vue')
    },
    {
      path: '/sobrenosotros',
      name: 'sobrenosotros',
      component: () => import('../views/SobreNosotrosView.vue')
    },
    {
      path: '/:current/:currentId/genero/:genero/:id',
      name: 'genero',
      component: () => import('../views/GeneroView.vue')
    },
    {
      path: '/busqueda/:modo/:query',
      name: 'busqueda',
      component: () => import('../views/BusquedaView.vue')
    },
    {
      path: '/titulo/:modo/:titulo/:id',
      name: 'titulo',
      component: () => import('../views/BusquedatituloView.vue')
    },
    {
      path: '/perfil/:user/:id',
      name: 'perfil',
      component: () => import('../views/PerfilView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
  ],
})

export default router
