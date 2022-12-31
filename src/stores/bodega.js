

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBodegaStore = defineStore('bodega', () => {


///////PELICULAS////////
const peliculasPopulares = ref(null)
const peticion = ref('')


///////SERIES////////



  return { 
    peliculasPopulares, peticion
  }

})
