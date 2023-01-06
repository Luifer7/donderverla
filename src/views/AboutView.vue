

<template>
     
    <div class="w-100">

        <router-link to="/" >
          <i class="bi bi-arrow-left-circle-fill text-white h1 m-4"></i>
        </router-link>

          <div v-if="spinner" class="w-100 text-center" >
          <SpinnerComponent></SpinnerComponent>
          </div>

          <!-- Titulo -->
          <h3 class="text-white d-flex text-center flex-column gap-1 align-items-center justify-content-center m-2" style="font-size: 1.8em;" > 
              <i>{{ pelicula?.title }}</i> <small v-if="pelicula?.release_date" class="h5" >({{ pelicula?.release_date?.slice(0, -6)}})</small>
          </h3>

          <!-- Imagen y sinopsis -->
          <div class="row p-2 m-auto" >
            
            <div class="col-12 col-sm-4 col-md-4 p-2" >
              <img  v-if="pelicula?.poster_path" height="300" class="rounded w-100 img-thumbnail" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.poster_path}`" alt="imagen no disponible" >
            </div>

            <div class="col-12 col-sm-8 col-md-8 p-2" >
              <small class="text-white" >
              <i class="text-justify" >{{ pelicula?.overview }}</i>
            </small>

            <YoutubeComponent :trailers="trailers"  ></YoutubeComponent>
            
          </div>
          
          </div>

          
          <DetallesComponent 
          :pelicula="pelicula" :director="director" 
          :escritor="escritor" :genres="genres"
          ></DetallesComponent>
            
          <div v-if="spinner" class="w-100 text-center" >
          <SpinnerComponent></SpinnerComponent>
          </div>

          <ProovedoresComponent v-if="!spinner" :proovedores="proovedores" ></ProovedoresComponent>

          <RepartoComponent v-if="!spinner" :reparto="reparto" ></RepartoComponent>
  
          <ReviewsComppnent v-if="!spinner" :reviews="reviews"></ReviewsComppnent>
    
          <!-- Galeria -->
        <div class="d-flex box-imagenes"  >
          <img class="img-thumbnail" v-if="pelicula?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.backdrop_path}`" alt="imagen no disponible" >
          <img class="img-thumbnail" v-if="pelicula?.belongs_to_collection?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.belongs_to_collection?.backdrop_path}`" alt="imagen no disponible" >
        </div>


        <div class="w-100 text-center mt-5" v-if="!spinner" >
          <h4 class="text-white m-auto mb-4"> <i>Similares a <strong class="text-info" >{{ route.params.pelicula }}</strong> </i></h4>
          <PeliculasSimilares
          :peliculas="similares?.results"
          :peticion="'similares'"
          :resultados="similares"
          @pasar-dos="(p) => netxPage(p)"
          @pasar-page="(n) => 
          getPasar(n)"
          ></PeliculasSimilares>
        </div>
      
    </div>

</template>

<script setup >
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import ReviewsComppnent from "../components/ReviewsComppnent.vue";
import DetallesComponent from "../components/DetallesComponent.vue";
import ProovedoresComponent from "../components/ProovedoresComponent.vue";
import RepartoComponent from "../components/RepartoComponent.vue";
import YoutubeComponent from "../components/YoutubeComponent.vue";
import PeliculasSimilares from "../components/PeliculasSimilares.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import Swal from "sweetalert2";

const route = useRoute()
const router = useRouter()

const pelicula = ref({})
const trailers = ref({})
const reviews = ref([])
const proovedores = ref([])
const director = ref([])
const escritor = ref([])
const reparto = ref([])
const similares = ref([])
const genres = ref([])

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
    let apiSimilares = `${movie}/${route.params.id}/similar${key}&page=${n}${lenguage}`
    
  try {
  
    const res = await axios.get(api)
    const resTrailers = await axios.get(apitrailers)
    const resReviews = await axios.get(apireviews)
    const resProovedores = await axios.get(apiproovedores)
    const resCreditos = await axios.get(apiCreditos)
    const resSimilares = await axios.get(apiSimilares)

    pelicula.value = res.data
    genres.value = res.data.genres
    trailers.value = resTrailers.data.results
    reviews.value = resReviews.data.results
    proovedores.value = resProovedores.data.results.CO
    director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
    escritor.value = resCreditos.data.crew.filter(field => field.job === 'Writer')
    reparto.value = resCreditos.data.cast
    similares.value = resSimilares.data
    spinner.value = false
  
  } catch (error) {
    Swal.fire({
      icon: 'info', html: `<strong>Ha ocurrido un error inesperado</strong>`, position: 'top',
      allowOutsideClick: false, confirmButtonText: 'solucionar!', confirmButtonColor: '#00b347'
    }).then((r)=>{
      if (r.isConfirmed) {
        spinner.value = true
       realoadData()   
       Swal.fire({icon: 'success', title: 'solucionado!', timer: 1000, showConfirmButton: false })     
      }
    })
  }

})


const getPasar = async (data) =>{
  let apiSimilares = `https://api.themoviedb.org/3/movie/${route.params.id}/similar?api_key=9f7031622a3c84ce82bbf384f262391a&page=${data}&language=es-MX`
  const resSimilaresDos = await axios.get(apiSimilares)
  similares.value = resSimilaresDos.data
}

const netxPage = (data) => {
  router.push( { name: 'similar', params: { current: route.params.pelicula, currentId: route.params.id, pelicula: data.title, id: data.id } } ) 
}

// AFREGLA ERROR
const realoadData = async  () => {

    let n = Math.floor(Math.random() * 10)
    let movie = `https://api.themoviedb.org/3/movie`
    let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
    let lenguage = `&language=es-MX`

    let apitrailers = `${movie}/${route.params.id}/videos${key}`
    let api = `${movie}/${route.params.id}${key}${lenguage}`
    let apireviews = `${movie}/${route.params.id}/reviews${key}${lenguage}`
    let apiproovedores = `${movie}/${route.params.id}/watch/providers${key}`
    let apiCreditos = `${movie}/${route.params.id}/credits${key}`
    let apiSimilares = `${movie}/${route.params.id}/similar${key}&page=${n}${lenguage}`

    const res = await axios.get(api)
    const resTrailers = await axios.get(apitrailers)
    const resReviews = await axios.get(apireviews)
    const resProovedores = await axios.get(apiproovedores)
    const resCreditos = await axios.get(apiCreditos)
    const resSimilares = await axios.get(apiSimilares)

    pelicula.value = res.data
    genres.value = res.data.genres
    trailers.value = resTrailers.data.results
    reviews.value = resReviews.data.results
    proovedores.value = resProovedores.data.results.CO
    director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
    escritor.value = resCreditos.data.crew.filter(field => field.job === 'Writer')
    reparto.value = resCreditos.data.cast
    similares.value = resSimilares.data

    spinner.value = false

}


</script>

<style scoped>

.box-imagenes {
  overflow: auto;
  max-height: 300px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
}

    .box-imagenes::-webkit-scrollbar {
    height: 13px;
    }

    .box-imagenes::-webkit-scrollbar-track {
    background-color:  rgba(102, 51, 153, 0.082);
    border-radius: 6px;
    }

    .box-imagenes::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(102, 51, 153, 0.534);
    border-radius: 10px;
    }

</style>
