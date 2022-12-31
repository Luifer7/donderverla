
<template>
      
    <div class="w-100">

        <!-- Link BACK -->
        <div class="w-100 text-center " >
            <router-link class="text-decoration-none"  :to="{
            name: 'pelicula', params: { pelicula: route.params.current, id: route.params.currentId}
        }">

          <i class="bi bi-arrow-left-circle-fill text-white h2 m-auto text-decoration-none"> 
           <small class="m-2 text-secondary" > {{ route.params.current }}</small>
          </i>
        </router-link>
        </div>

        <div v-if="spinner" class="w-100 text-center" >
          <SpinnerComponent></SpinnerComponent>
          </div>
       
        
          <!-- Titulo -->
          <h2 class="mt-4 text-white d-flex text-center flex-column gap-1 align-items-center justify-content-center m-2" style="font-size: 1.8em;" > 
              <i>{{ pelicula?.title }}</i> <small class="h5" >{{ pelicula?.release_date}}</small>
          </h2>

         
          <!-- Imagen y sinopsis -->
          <div class="row p-2 m-auto" >
            
            <div class="col-12 col-sm-4 col-md-4 p-2" >
              <img v-if="pelicula?.poster_path" height="300" class="rounded w-100" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.poster_path}`" alt="imagen no disponible" >
            </div>

            <div class="col-12 col-sm-8 col-md-8 p-2" >
              <small class="text-white" >
              <i class="text-justify" >{{ pelicula?.overview }}</i>
            </small>

            <YoutubeComponent :trailers="trailers"  ></YoutubeComponent>
            
          </div>
          
          </div>

      
          <DetallesComponent :pelicula="pelicula" :director="director" :escritor="escritor"></DetallesComponent>

          <ProovedoresComponent :proovedores="proovedores" ></ProovedoresComponent>

          <div v-if="spinner" class="w-100 text-center" >
          <SpinnerComponent></SpinnerComponent>
          </div>

          <RepartoComponent :reparto="reparto" ></RepartoComponent>

          <div v-if="spinner" class="w-100 text-center" >
          <SpinnerComponent></SpinnerComponent>
          </div>
            
          <ReviewsComppnent :reviews="reviews"></ReviewsComppnent>

            <!-- Galeria -->
            <div class="d-flex box-imagenes"  >
            <img v-if="pelicula?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.backdrop_path}`" alt="imagen no disponible" >
            <img  v-if="pelicula?.belongs_to_collection?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.belongs_to_collection?.backdrop_path}`" alt="imagen no disponible" >
            </div>

    </div>

</template>

<script setup >
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";
import ReviewsComppnent from "../components/ReviewsComppnent.vue";
import DetallesComponent from "../components/DetallesComponent.vue";
import ProovedoresComponent from "../components/ProovedoresComponent.vue";
import RepartoComponent from "../components/RepartoComponent.vue";
import YoutubeComponent from "../components/YoutubeComponent.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import Swal from "sweetalert2";

const route = useRoute()

const pelicula = ref({})
const trailers = ref({})
const reviews = ref([])
const proovedores = ref([])
const director = ref([])
const escritor = ref([])
const reparto = ref([])

const spinner = ref(true)

onMounted( async () => {

  let n = Math.floor(Math.random() * 10)
  let movie = `https://api.themoviedb.org/3/movie`
  let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
  let lenguage = `&language=es-MX`

  let apitrailers = `${movie}/${route.params.id}/videos${key}`
  let api = `${movie}/${route.params.id}${key}${lenguage}`
  let apireviews = `${movie}/${route.params.id}/reviews${key}${lenguage}`
  let apiproovedores = `${movie}/${route.params.id}/watch/providers${key}`
  let apiCreditos = `${movie}/${route.params.id}/credits${key}`

  try {

    const res = await axios.get(api)
    const resTrailers = await axios.get(apitrailers)
    const resReviews = await axios.get(apireviews)
    const resProovedores = await axios.get(apiproovedores)
    const resCreditos = await axios.get(apiCreditos)

    pelicula.value = res.data
    trailers.value = resTrailers.data.results
    reviews.value = resReviews.data.results
    proovedores.value = resProovedores.data.results.CO
    director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
    escritor.value = resCreditos.data.crew.filter(field => field.job === 'Writer')
    reparto.value = resCreditos.data.cast

    spinner.value = false
    
  } catch (error) {
    Swal.fire({
      icon: 'error', title: 'Ha ocurrido un error inesperado!', position: 'top',
      allowOutsideClick: false, confirmButtonText: 'solucionar!'
    }).then((r)=>{
      if (r.isConfirmed) {
       spinner.value = true
       realoadData()   
       Swal.fire({icon: 'success', title: 'solucionado!', timer: 1000, showConfirmButton: false })     
      }
    })
  }
  
 
})


const realoadData = async () => {
  let n = Math.floor(Math.random() * 10)
  let movie = `https://api.themoviedb.org/3/movie`
  let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
  let lenguage = `&language=es-MX`

  let apitrailers = `${movie}/${route.params.id}/videos${key}`
  let api = `${movie}/${route.params.id}${key}${lenguage}`
  let apireviews = `${movie}/${route.params.id}/reviews${key}${lenguage}`
  let apiproovedores = `${movie}/${route.params.id}/watch/providers${key}`
  let apiCreditos = `${movie}/${route.params.id}/credits${key}`
  
  const res = await axios.get(api)
  const resTrailers = await axios.get(apitrailers)
  const resReviews = await axios.get(apireviews)
  const resProovedores = await axios.get(apiproovedores)
  const resCreditos = await axios.get(apiCreditos)

  pelicula.value = res.data
  trailers.value = resTrailers.data.results
  reviews.value = resReviews.data.results
  proovedores.value = resProovedores.data.results.CO
  director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
  escritor.value = resCreditos.data.crew.filter(field => field.job === 'Writer')
  reparto.value = resCreditos.data.cast

  spinner.value = false
}

</script>

<style scoped>

.box-imagenes {
  overflow: auto;
  max-height: 300px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
}

    ::-webkit-scrollbar {
    width: 10px;
    }

    ::-webkit-scrollbar-track {
    background-color:  rgba(102, 51, 153, 0.082);
    border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(102, 51, 153, 0.705);
    border-radius: 10px;
    }

</style>
