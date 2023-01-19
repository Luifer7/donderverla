
<template>

    <div class="w-100">

      <div class="w-100 d-flex justify-content-between mt-3 mb-2" >

        <router-link to="/buscarseries" >
                <i class="bi bi-arrow-left-circle-fill text-white h1 m-4"></i>
            </router-link>

            <AgregarFavorito
         
         class="mx-3"
         :titulo="serie"
         ></AgregarFavorito>

      </div>
           

            <div v-if="spinner" class="w-100 text-center p-4" >
            <SpinnerComponent></SpinnerComponent>
            </div>

         <!-- Titulo -->
            <h3 class="text-white d-flex text-center flex-column gap-1 align-items-center justify-content-center m-2" style="font-size: 1.8em;" > 
              <i>{{ serie?.name }}</i> <small v-if="serie?.first_air_date" class="h5" >({{ serie?.first_air_date?.slice(0, -6)}})</small>
            </h3>

           <!-- Imagen y sinopsis -->
            <div class="row p-2 m-auto" >
            
          
              <!-- POSTER -->
              <PosterComponent
            :imagen="serie?.poster_path"
            >
            </PosterComponent>
          

            <div v-if="!spinner" class="col-12 col-sm-8 col-md-8 p-2" >

                <small class="text-white" >
                <i class="text-justify" >{{ serie?.overview }}</i>
                
                <GeneroComponent :generos="contenido?.genres"></GeneroComponent>

                <!-- DETALLES -->
                <div class="text-white col-6 col-sm-4 d-flex gap-2 justify-content-start align-items-center flex-wrap" >
                  <strong class="m-0" >Episodios: <small class="fw-bold text-info"> <i>{{serie?.number_of_episodes}}</i> </small> </strong>
                  <strong class="m-0" >Temporadas: <small class="fw-bold text-info"> <i>{{ serie?.number_of_seasons}}</i> </small></strong>
                  
                  <!-- ESTADO de la serie -->
                  <strong class="m-0" >Estado: 

                    <small class="fw-bold w-100" v-if="serie?.status === 'Returning Series'">
                    <i class="text-info text-uppercase" >Habrá otra temporada</i></small>

                    <small class="fw-bold w-100" v-if="serie?.status === 'Planned'">
                    <i class="text-info text-uppercase" >En planes</i></small>

                    <small class="fw-bold w-100" v-if="serie?.status === 'Canceled'">
                    <i class="text-danger text-uppercase" >Cancelada</i></small>

                    <small class="fw-bold w-100" v-if="serie?.status === 'Ended'">
                    <i class="text-info text-uppercase" >Finalizada</i></small>

                    <small class="fw-bold w-100" v-if="serie?.status === 'Production'">
                    <i class="text-info text-uppercase" >En produccion</i></small>

                  </strong>
                  
                  <!-- Ultimo episodio -->
                  <strong class="m-0" >Ultimo episodio: <small class="fw-bold text-info"> <i>
                    {{serie?.last_episode_to_air?.name}} - {{serie?.last_episode_to_air?.air_date.slice(0, -6)}}
                  </i> </small> </strong>
                </div>

                </small>
                   <!-- Rating PARA AMBAS -->
                   <div v-if="!spinner"  class="d-flex gap-3">

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
                      <strong class="m-1 h5" >{{ serie.vote_average }}</strong>
                      </span>

                    </div>

            </div>
          
            </div>

            <div class="w-100" >
              <YoutubeComponent :trailers="trailers"  ></YoutubeComponent>
            </div>

            <!-- DETALLES -->
            <div v-if="!spinner" class="w-100 row p-3" >

              <!-- TAGLINE -->
              <h4 class="mt-2 m-0 text-center text-white col-12" >
                  <i> 
                  <blockquote >- {{ serie?.tagline }}</blockquote>
                  </i> 
              </h4>

            </div>
          
            <!-- SPINNER -->
            <div v-if="spinner" class="w-100 text-center p-4" >
            <SpinnerComponent></SpinnerComponent>
            </div>

            <!-- PROOVEDORES -->
            <ProovedoresComponent  v-if="!spinner" :proovedores="proovedores" ></ProovedoresComponent>

            
            <SliderTemporadas v-if="!spinner"
            :temporadas="contenido"
            :nombre="'Temporadas'">
            </SliderTemporadas>

            
            <SliderReparto v-if="!spinner"
            :reparto="reparto"
            :nombre="'Reparto'"
            >
            </SliderReparto>

         
              <!-- Galeria -->
            <div class="w-100 row mt-4 m-auto"  >
              <img class="img-thumbnail col-12 col-sm-6" v-if="serie?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${serie?.backdrop_path}`" alt="imagen no disponible" >
              <img class="img-thumbnail col-12 col-sm-6" v-if="serie?.last_episode_to_air?.still_path" :src="`https://image.tmdb.org/t/p/w500/${serie?.last_episode_to_air?.still_path}`" alt="imagen no disponible" >
            </div>
       

    </div>

</template>

<script setup >
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import YoutubeComponent from "../components/YoutubeComponent.vue";
import ProovedoresComponent from "../components/ProovedoresComponent.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import GeneroComponent from "../components/GeneroComponent.vue";
import { keyApi } from "../funciones/key";
import SliderTemporadas from "../components/SliderTemporadas.vue";
import SliderReparto from "../components/SliderReparto.vue";
import AgregarFavorito from "../components/users/AgregarFavorito.vue";
import PosterComponent from "../components/PosterComponent.vue";


const route = useRoute()
const router = useRouter()

const serie = ref({})
const trailers = ref({})
const proovedores = ref([])
const reparto = ref([])
const contenido = ref([])
const rating = ref({})

const spinner = ref(true)


onMounted( async () => {

    let series = `https://api.themoviedb.org/3/tv/`
    let key = keyApi
    let lenguage = `&language=es-ES`

    let find = `${series}/${route.params.id}/external_ids${key}`
    const imdbApi = await axios.get(find)
    let imdbid = imdbApi.data.imdb_id 

    let api = `${series}${route.params.id}${key}${lenguage}`
    let apitrailers = `${series}${route.params.id}/videos${key}`
    let apiproovedores = `${series}${route.params.id}/watch/providers${key}`
    let apiCreditos = `${series}${route.params.id}/credits${key}`
    let imdb = `https://imdb-api.com/en/API/Ratings/k_8i45ej83/${imdbid}`

    try {
        const res = await axios.get(api)
        const resTrailers = await axios.get(apitrailers)
        const resProovedores = await axios.get(apiproovedores)
        const resCreditos = await axios.get(apiCreditos)
        const resIMDB = await axios.get(imdb)

        serie.value = res.data
        trailers.value = resTrailers.data.results
        proovedores.value = resProovedores.data.results.CO
        reparto.value = resCreditos.data.cast
        contenido.value = res.data.seasons  
        rating.value = resIMDB.data

        spinner.value = false

    } catch (error) {
        Swal.fire({
          icon: 'info', html: `<strong>Ha ocurrido un error inesperado</strong>`, position: 'top',
      allowOutsideClick: false, confirmButtonText: 'solucionar!', confirmButtonColor: '#00b347'
        }).then((r)=>{
        if (r.isConfirmed) {
        realoadData()   
        Swal.fire({icon: 'success', title: 'solucionado!', timer: 1000, showConfirmButton: false })     
        }
     })
    }

})

const realoadData = async () => {
    
    let series = `https://api.themoviedb.org/3/tv/`
    let key = keyApi
    let lenguage = `&language=es-MX`

    let api = `${series}${route.params.id}${key}${lenguage}`
    let apitrailers = `${series}${route.params.id}/videos${key}${lenguage}`
    let apiproovedores = `${series}${route.params.id}/watch/providers${key}`
        
    const res = await axios.get(api)
    const resTrailers = await axios.get(apitrailers)
    const resProovedores = await axios.get(apiproovedores)

    serie.value = res.data
    trailers.value = resTrailers.data.results
    proovedores.value = resProovedores.data.results.CO

      
}

</script>

<style scoped>


    .box-imagenes {
      overflow: auto;
      max-height: 300px;
      box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    }


    .box-temp{
      overflow: auto;
    }

    .box-season{
      width: 140px;
      min-width: 110px;
    }

    .img-season{
      width: 100%;
      height: 100%;
      border: 3px solid white; border-radius: 10px;
      object-fit: contain;
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