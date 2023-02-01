

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBodegaStore = defineStore('bodega', () => {


///////SERIES////////
const seriesPopulares = ref(null)
const seriePeticion = ref('')

const resultadoBusqueda = ref({})

////////AUTH/////////
const currentUser = ref({})
const isLogin = ref(null)

/////// FAV //////
const favoritos = ref([])


  return { 
    seriePeticion, seriesPopulares, 
    resultadoBusqueda, currentUser, isLogin, favoritos
  }

})
