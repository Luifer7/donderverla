

<template>
    
    <div class="w-100" >

          <!-- Link BACK -->
          <div class="w-100 text-center mb-3" >
            <router-link class="text-decoration-none"  :to="{
            name: 'serie', params: { serie: route.params.current, id: route.params.currentId}}">

          <i class="bi bi-arrow-left-circle-fill text-white h2 m-auto text-decoration-none"> 
           <small class="m-2 text-info" > {{ route.params.current }}</small>
          </i>

        </router-link>
        
          </div>

          <h3 class="text-center fw-bold text-white" >{{ route.params.genero }}</h3>

          <div class="w-100" >

            <SeriesBusqueda
        :series="contenidoGenero?.results"
        :resultados="contenidoGenero"
        :peticion="contenidoGeneroPeticion"
        @pasar-pagina="(n) => 
        changePage(n)"
        ></SeriesBusqueda>
            
          </div>

    </div>

</template>

<script setup >
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";
import { keyApi } from "../funciones/key";

const route = useRoute()

const contenidoGenero = ref([])
const contenidoGeneroPeticion = ref('')

onMounted(async() => {
    let api = `https://api.themoviedb.org/3/discover/tv${keyApi}&language=es-ES&with_genres=${route.params.id}`
    const res = await axios.get(api)
    contenidoGenero.value = res.data
    contenidoGeneroPeticion.value = route.params.genero
})

const changePage = async (p) => {
    let api = `https://api.themoviedb.org/3/discover/tv${keyApi}&language=es-ES&with_genres=${route.params.id}&page=${p}`
    const res = await axios.get(api)
    contenidoGenero.value = res.data
}

</script>

<style scoped>

</style>