

<template>
     
    <div class="w-100 mt-2 box-vista">

      <div class="w-100 d-flex justify-content-between mt-3 mb-2" >

          <!-- Router back -->
          <router-link to="/buscarpelicula" >
          <i class="bi bi-arrow-left-circle-fill text-white h1 m-4"></i>
        </router-link>
        
          <AgregarFavorito class="mx-3" :titulo="pelicula"
          ></AgregarFavorito>

        </div>
      
          <!-- SPINNER #1 -->
          <div v-if="spinner" class="w-100 text-center" >
          <SpinnerComponent></SpinnerComponent>
          </div>

          <!-- Titulo -->
          <h3 class="text-white px-2 d-flex text-center flex-wrap gap-2 align-items-center justify-content-center" style="font-size: 1.8em;" > 
              <i>{{ pelicula?.title }}</i> <small v-if="pelicula?.release_date" class="h5 m-0" >({{ pelicula?.release_date?.slice(0, -6)}})</small>
            
          </h3>
          
          <!-- Imagen y sinopsis  MUCHOS DATOS-->
          <div class="row p-2 m-auto" >
            
            <!-- POSTER -->
            <PosterComponent
            :imagen="pelicula?.poster_path">
            </PosterComponent>

            <!-- sinopsis -->
            <div class="col-12 col-sm-8 col-md-8 p-2" >

              <small class="text-white" >
              <i class="text-justify fw-bold" 
              style="font-size: .9em;" >{{ pelicula?.overview }}</i>

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

                <span v-if="rating.imDb" class="rounded text-white fw-bold d-flex align-items-center" > 
                  <img src="../assets/img/imdb.png" width="50" height="50" alt="">
                  <strong class="m-1 h5" >{{ rating.imDb }}</strong>
                </span>
                <span v-if="rating.imDb" class="rounded text-white fw-bold d-flex align-items-center" > 
                  <img src="../assets/img/filmaffinity.png" width="30" height="25" alt="">
                  <strong class="m-1 h5" >{{  rating.filmAffinity  }}</strong>
                </span>
                <span v-if="rating.imDb" class="rounded text-white fw-bold d-flex align-items-center" > 
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
                    <img width="30" class="rounded-circle" style="object-fit:cover;"
                    height="30" :src="`https://image.tmdb.org/t/p/w500/${prov?.logo_path}`" alt=""> 
                    <strong>{{ prov?.provider_name }}</strong>
                  </span>
                </div>
              </div>

                  
            </small>
  
            </div>
          
          </div>

          <YoutubeComponent :trailers="trailers"  ></YoutubeComponent>

           <!-- DETALLES -->
           <div v-if="!spinner" class="w-100 row p-3" >

            <!-- TAGLINE -->
            <h4 class="mt-2 m-0 text-center text-white col-12" >
                <i> 
                <blockquote >- {{ pelicula?.tagline }}</blockquote>
                </i> 
            </h4>

          </div>



            
          <!-- SPINNER #2 -->
          <div v-if="spinner" class="w-100 text-center" >
          <SpinnerComponent></SpinnerComponent>
          </div>

          <ProovedoresComponent v-if="!spinner" :proovedores="proovedores" ></ProovedoresComponent>

        
          <SliderRepartopeli v-if="!spinner"
          :reparto="reparto">
          </SliderRepartopeli>
           

            <!-- Galeria -->
          <div class="row mt-4 w-100 m-auto"  >
            <img class="img-thumbnail col-12 col-sm-6" v-if="pelicula?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.backdrop_path}`" alt="imagen no disponible" >
            <img class="img-thumbnail col-12 col-sm-6" v-if="pelicula?.belongs_to_collection?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${pelicula?.belongs_to_collection?.backdrop_path}`" alt="imagen no disponible" >
          </div>


          <!-- RECOMENDACIONES -->
          <div  class="w-100 text-center mt-5" v-if="!spinner" >
          <h4 class="text-white m-auto mb-4 px-2">
            <i>Recomendaciones a partir de <strong class="text-info" >{{ route.params.pelicula }}</strong> </i></h4>
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
import DetallesComponent from "../components/DetallesComponent.vue";
import ProovedoresComponent from "../components/ProovedoresComponent.vue";
import YoutubeComponent from "../components/YoutubeComponent.vue";
import PeliculasSimilares from "../components/PeliculasSimilares.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import SliderRepartopeli from "../components/sliders/SliderRepartopeli.vue";
import Swal from "sweetalert2";
import { keyApi } from "../funciones/key";
import AgregarFavorito from "../components/users/AgregarFavorito.vue";
import PosterComponent from "../components/PosterComponent.vue";

const route = useRoute()
const router = useRouter()

const pelicula = ref({})

const trailers = ref({})
const proovedores = ref([])
const director = ref([])
const reparto = ref([])
const similares = ref([])
const genres = ref([])
const rating = ref({})

const spinner = ref(true)

onMounted( async () => {

    let key = keyApi 

    let find = `https://api.themoviedb.org/3/movie/${route.params.id}/external_ids${key}`
    const imdbApi = await axios.get(find)

    let n = 1
    let movie = `https://api.themoviedb.org/3/movie`
    let lenguage = `&language=es-ES`
    let imdbid = imdbApi.data.imdb_id 
       
    let apitrailers = `${movie}/${route.params.id}/videos${key}`
    let api = `${movie}/${route.params.id}${key}${lenguage}`
    let apiproovedores = `${movie}/${route.params.id}/watch/providers${key}`
    let apiCreditos = `${movie}/${route.params.id}/credits${key}`
    let apiSimilares = `${movie}/${route.params.id}/recommendations${key}${lenguage}&page=${n}`
    let apiImdb = `https://imdb-api.com/en/API/Ratings/k_8i45ej83/${imdbid}`
    
  try {
  
    const res = await axios.get(api)
    const resTrailers = await axios.get(apitrailers)
    const resProovedores = await axios.get(apiproovedores)
    const resCreditos = await axios.get(apiCreditos)
    const resSimilares = await axios.get(apiSimilares)
    const resIMDB = await axios.get(apiImdb)
    
    rating.value = resIMDB.data
    pelicula.value = res.data
    genres.value = res.data.genres
    trailers.value = resTrailers.data.results
    proovedores.value = resProovedores.data.results.CO
    director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
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
  let apiSimilares = `https://api.themoviedb.org/3/movie/${route.params.id}/recommendations${keyApi}&page=${data}&language=es-MX`
  const resSimilaresDos = await axios.get(apiSimilares)
  similares.value = resSimilaresDos.data
}

const netxPage = (data) => {
  router.push( { name: 'similar', params: { current: route.params.pelicula, currentId: route.params.id, pelicula: data.title, id: data.id } } ) 
}

// AFREGLA ERROR
const realoadData = async  () => {

    let n = 1
    let movie = `https://api.themoviedb.org/3/movie`
    let key = keyApi
    let lenguage = `&language=es-MX`

    let apitrailers = `${movie}/${route.params.id}/videos${key}`
    let api = `${movie}/${route.params.id}${key}${lenguage}`
    let apireviews = `${movie}/${route.params.id}/reviews${key}${lenguage}`
    let apiproovedores = `${movie}/${route.params.id}/watch/providers${key}`
    let apiCreditos = `${movie}/${route.params.id}/credits${key}`
    let apiSimilares = `${movie}/${route.params.id}/recommendations${key}&page=${n}${lenguage}`

    const res = await axios.get(api)
    const resTrailers = await axios.get(apitrailers)
    const resProovedores = await axios.get(apiproovedores)
    const resCreditos = await axios.get(apiCreditos)
    const resSimilares = await axios.get(apiSimilares)

    pelicula.value = res.data
    genres.value = res.data.genres
    trailers.value = resTrailers.data.results
    proovedores.value = resProovedores.data.results.CO
    director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
    escritor.value = resCreditos.data.crew.filter(field => field.job === 'Writer')
    reparto.value = resCreditos.data.cast
    similares.value = resSimilares.data

    spinner.value = false

}


</script>

<style scoped>

.box-vista{
  min-height: 100vh;
}

.box-imagenes {
  margin-top: 40px;
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

    .box-box{
      position: absolute;
      width: 100%;
      height: 50px;
      border: 1px solid red;
      top: 7px;
      border-radius: 10px;

    }


</style>
