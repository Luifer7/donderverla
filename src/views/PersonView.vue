

<template>
    
    <div class="w-100" >

          <!-- Link BACK -->
          <div class="w-100 text-center mb-3" >
            <router-link class="text-decoration-none"  :to="{
            name: 'pelicula', params: { pelicula: route.params.current, id: route.params.currentId}}">

          <i class="bi bi-arrow-left-circle-fill text-white h2 m-auto text-decoration-none"> 
           <small class="m-2 text-info" > {{ route.params.current }}</small>
          </i>

        </router-link>
        
          </div>

          <div v-if="spinner" class="w-100 text-center p-4" >
            <SpinnerComponent></SpinnerComponent>
            </div>
        
          <!-- Imagen y sinopsis -->
          <div class="row p-2 m-auto" >
            
            <div class="col-12 col-sm-4 col-md-4 p-2" >
              <img  v-if="persona?.profile_path" height="300" class="rounded w-100 img-thumbnail" :src="`https://image.tmdb.org/t/p/w500/${persona?.profile_path}`" alt="imagen no disponible" >
            </div>

            <div class="col-12 col-sm-8 col-md-8 p-2" >
                <h2 class="m-0 text-white fw-bold">{{ persona?.name }}</h2>
              <small class="text-white" >
              <i class="text-justify" >{{ persona?.biography }}</i>
            </small>
  
          </div>
          
          </div>

            <h3 class="text-center text-white fw-bold m-0 p-3 mb-2" >Filmografia</h3>
          <div class="w-100" >
            <PeliculasModalidad
            :peliculas="personaPeliculas?.results"
            :resultados="personaPeliculas"
            :peticion="persona?.name"
            @pasar-pagina="(n) => 
            getPage(n)"
            >
            </PeliculasModalidad>
          </div>
        

    </div>

</template>

<script setup >
import { onMounted, ref } from "@vue/runtime-core";
import PeliculasModalidad from "../components/PeliculasModalidad.vue";
import axios from "axios";
import { useRoute } from "vue-router"
import SpinnerComponent from "../components/SpinnerComponent.vue";


const route = useRoute()
const persona = ref({})
const personaPeliculas = ref({})
const spinner = ref(true)

onMounted(async() => {

    let person = `https://api.themoviedb.org/3/person/`
    let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
    let lenguage = `&language=es-ES`

    let movie = `https://api.themoviedb.org/3/discover/movie`
    
    let api = `${person}${route.params.id}${key}${lenguage}`
    let apiPersonMovies = `${movie}${key}${lenguage}&with_cast=${route.params.id}`

    const res = await axios.get(api)
    const resM = await axios.get(apiPersonMovies)

    persona.value = res.data
    personaPeliculas.value = resM.data

    spinner.value = false

})

const getPage =async (n) => {
    let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
    let lenguage = `&language=es-ES`
    let movie = `https://api.themoviedb.org/3/discover/movie`
    let api = `${movie}${key}${lenguage}&with_cast=${route.params.id}&page=${n}`
    const res = await axios.get(api)
    personaPeliculas.value = res.data
}

</script>

<style scoped>



</style>