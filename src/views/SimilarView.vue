
<template>
      
    <div class="w-100">

          <!-- Link BACK -->
          <div class="w-100 text-center mt-2 mb-3" >
              <router-link class="text-decoration-none"  :to="{
              name: 'pelicula', params: { pelicula: route.params.current, id: route.params.currentId}
          }">
            <i class="bi bi-arrow-left-circle-fill text-white h2 m-auto text-decoration-none"> 
            <small class="m-2 text-info" > {{ route.params.current }}</small>
            </i>
          </router-link>
          </div>

          <!-- Titulo -->
          <h3 class="text-white d-flex text-center flex-wrap gap-2 align-items-center justify-content-center" style="font-size: 1.8em;" > 
              <i>{{ pelicula?.title }}</i> <small v-if="pelicula?.release_date" class="h5 m-0" >({{ pelicula?.release_date?.slice(0, -6)}})</small>
              <AgregarFavorito class="mx-3" :titulo="pelicula"
          ></AgregarFavorito>
  
          </h3>

          <!-- Imagen y sinopsis -->
          <div class="row p-2 m-auto" >
             
            <!-- POSTER -->
            <div class="col-12 col-sm-4 col-md-4 p-2" >
              <img  v-if="pelicula?.poster_path" height="300" 
              class="rounded w-100 img-thumbnail" 
              :src="`https://image.tmdb.org/t/p/w500/${pelicula?.poster_path}`" alt="imagen no disponible" >
            </div>

            <div class="col-12 col-sm-8 col-md-8 p-2" >
              <small class="text-white" >
              
                <i class="text-justify" >{{ pelicula?.overview }}</i>
              <div class="d-flex gap-2 flex-wrap mt-2 mb-1">
              <strong v-for="g of genres" :key="g.id" class="text-info" >
                {{ g.name }}
              </strong>
              </div>
              <div class="mt-1 mb-2" v-if="director[0]?.name" >
                <strong>Director: <strong class="text-info" >{{ director[0]?.name }}</strong> </strong>
              </div>
              <div class="mt-1 mb-2" v-if="pelicula?.runtime" >
                <strong>Duracion: <strong class="text-info" >{{ pelicula?.runtime }} Min</strong> </strong>
              </div>

               <!-- RATING IMDB ETC.. -->
                  <div v-if="!spinner" class="d-flex gap-3">

                  <span class="rounded text-white fw-bold d-flex align-items-center" > 
                    <img src="../assets/img/imdb.png" width="50" height="50" alt="">
                    <strong class="m-1 h5" >{{ rating.imDb }}</strong>
                  </span>
                  <span class="rounded text-white fw-bold d-flex align-items-center" > 
                    <img src="../assets/img/filmaffinity.png" width="30" height="25" alt="">
                    <strong class="m-1 h5" >{{  rating.filmAffinity  }}</strong>
                  </span>
                  <span class="rounded text-white fw-bold d-flex align-items-center" > 
                    <img src="../assets/img/tomato.png" width="35" height="35" alt="">
                    <strong class="m-1 h5" >{{ rating.rottenTomatoes }}</strong>
                  </span>
                  <span class="rounded text-white fw-bold d-flex align-items-center my-1" > 
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/1280px-Tmdb.new.logo.svg.png" 
                  width="30" height="23" alt="">
                  <strong class="m-1 h5" >{{ pelicula.vote_average }}</strong>
                </span>

                  </div>

                   <!-- STREAMING -->
             <div class="d-flex gap-3 flex-wrap mt-1" >
                <div v-for="prov of proovedores?.flatrate" :key="prov.id" >
                  <span class="d-flex gap-1 align-items-center" >
                    <img width="25" class="rounded-circle" height="25" :src="`https://image.tmdb.org/t/p/w500/${prov.logo_path}`" alt=""> 
                    <strong>{{ prov?.provider_name }}</strong>
                  </span>
                </div>
              </div>

              </small>
            
            </div>

            
          
          </div>



          <YoutubeComponent :trailers="trailers"  ></YoutubeComponent>
      
          <ProovedoresComponent v-if="!spinner" :proovedores="proovedores"></ProovedoresComponent>

          <div v-if="spinner" class="w-100 text-center" >
          <SpinnerComponent></SpinnerComponent>
          </div>

         
          
          <SliderRepartopeli v-if="!spinner"
            :reparto="reparto"
            ></SliderRepartopeli>
        
          
            <!-- Galeria -->
            <div class="row mt-4 w-100 m-auto"  >
            <img class="img-thumbnail col-12 col-sm-6" v-if="pelicula?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.backdrop_path}`" alt="imagen no disponible" >
            <img class="img-thumbnail col-12 col-sm-6" v-if="pelicula?.belongs_to_collection?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.belongs_to_collection?.backdrop_path}`" alt="imagen no disponible" >
          </div>


    </div>

</template>

<script setup >
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";
import DetallesComponent from "../components/DetallesComponent.vue";
import ProovedoresComponent from "../components/ProovedoresComponent.vue";
import YoutubeComponent from "../components/YoutubeComponent.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import SliderRepartopeli from "../components/sliders/SliderRepartopeli.vue";
import Swal from "sweetalert2";
import { keyApi } from "../funciones/key";
import AgregarFavorito from "../components/users/AgregarFavorito.vue";

const route = useRoute()

const pelicula = ref({})
const trailers = ref({})
const reviews = ref([])
const proovedores = ref([])
const director = ref([])
const escritor = ref([])
const reparto = ref([])
const genres = ref([])
const rating = ref({})

const spinner = ref(true)

onMounted( async () => {
  
  let key = keyApi 

  let find = `https://api.themoviedb.org/3/movie/${route.params.id}/external_ids${key}`
  const imdbApi = await axios.get(find)
  
  let movie = `https://api.themoviedb.org/3/movie`
  let lenguage = `&language=es-MX`
  let imdbid = imdbApi.data.imdb_id 

  let apitrailers = `${movie}/${route.params.id}/videos${key}`
  let api = `${movie}/${route.params.id}${key}${lenguage}`
  let apireviews = `${movie}/${route.params.id}/reviews${key}${lenguage}`
  let apiproovedores = `${movie}/${route.params.id}/watch/providers${key}`
  let apiCreditos = `${movie}/${route.params.id}/credits${key}`
  let apiImdb = `https://imdb-api.com/en/API/Ratings/k_8i45ej83/${imdbid}`

  try {

    const res = await axios.get(api)
    const resTrailers = await axios.get(apitrailers)
    const resReviews = await axios.get(apireviews)
    const resProovedores = await axios.get(apiproovedores)
    const resCreditos = await axios.get(apiCreditos)
    const resIMDB = await axios.get(apiImdb)

    rating.value = resIMDB.data
    pelicula.value = res.data
    genres.value = res.data.genres
    trailers.value = resTrailers.data.results
    reviews.value = resReviews.data.results
    proovedores.value = resProovedores.data.results.CO
    director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
    escritor.value = resCreditos.data.crew.filter(field => field.job === 'Writer')
    reparto.value = resCreditos.data.cast

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
  genres.value = res.data.genres
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
