

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBodegaStore = defineStore('bodega', () => {


///////PELICULAS////////
const peliculasPopulares = ref(null)
const peticion = ref('')


///////SERIES////////
const seriesPopulares = ref(null)
const seriePeticion = ref('')


const resultadoBusqueda = ref({})


  return { 
    peliculasPopulares, peticion, seriePeticion, seriesPopulares, resultadoBusqueda
  }

})
