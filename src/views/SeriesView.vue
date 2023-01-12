
<template>

    <div class="w-100">

            <router-link to="/buscarseries" >
                <i class="bi bi-arrow-left-circle-fill text-white h1 m-4"></i>
            </router-link>

            <div v-if="spinner" class="w-100 text-center p-4" >
            <SpinnerComponent></SpinnerComponent>
            </div>

         <!-- Titulo -->
            <h3 class="text-white d-flex text-center flex-column gap-1 align-items-center justify-content-center m-2" style="font-size: 1.8em;" > 
              <i>{{ serie?.name }}</i> <small v-if="serie?.first_air_date" class="h5" >({{ serie?.first_air_date?.slice(0, -6)}})</small>
            </h3>

           <!-- Imagen y sinopsis -->
            <div class="row p-2 m-auto" >
            
            <div class="col-12 col-sm-4 col-md-4 p-2" >
              <img  v-if="serie?.poster_path" height="300" class="rounded w-100 img-thumbnail" :src="`https://image.tmdb.org/t/p/w500/${serie?.poster_path}`" alt="imagen no disponible" >
            </div>

            <div v-if="!spinner" class="col-12 col-sm-8 col-md-8 p-2" >

                <small class="text-white" >
                <i class="text-justify" >{{ serie?.overview }}</i>
                
                <GeneroComponent :generos="contenido?.genres"></GeneroComponent>

                <!-- DETALLES -->
                <div class="text-white col-6 col-sm-4 d-flex gap-2 justify-content-start align-items-center flex-wrap" >
                  <strong class="m-0" >Episodios: <small class="fw-bold text-info"> <i>{{contenido?.number_of_episodes}}</i> </small> </strong>
                  <strong class="m-0" >Temporadas: <small class="fw-bold text-info"> <i>{{ contenido?.number_of_seasons}}</i> </small></strong>
                  
                  <!-- ESTADO de la serie -->
                  <strong class="m-0" >Estado: 

                    <small class="fw-bold w-100" v-if="contenido?.status === 'Returning Series'">
                    <i class="text-info text-uppercase" >Habrá otra temporada</i></small>

                    <small class="fw-bold w-100" v-if="contenido?.status === 'Planned'">
                    <i class="text-info text-uppercase" >En planes</i></small>

                    <small class="fw-bold w-100" v-if="contenido?.status === 'Canceled'">
                    <i class="text-danger text-uppercase" >Cancelada</i></small>

                    <small class="fw-bold w-100" v-if="contenido?.status === 'Ended'">
                    <i class="text-info text-uppercase" >Finalizada</i></small>

                    <small class="fw-bold w-100" v-if="contenido?.status === 'Production'">
                    <i class="text-info text-uppercase" >En produccion</i></small>

                  </strong>
                  
                  <!-- Ultimo episodio -->
                  <strong class="m-0" >Ultimo episodio: <small class="fw-bold text-info"> <i>
                    {{contenido?.last_episode_to_air?.name}} - {{contenido?.last_episode_to_air?.air_date.slice(0, -6)}}
                  </i> </small> </strong>
                </div>

                </small>

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
                  <blockquote >- {{ contenido?.tagline }}</blockquote>
                  </i> 
              </h4>

            </div>
          
            <!-- SPINNER -->
            <div v-if="spinner" class="w-100 text-center p-4" >
            <SpinnerComponent></SpinnerComponent>
            </div>

            <!-- PROOVEDORES -->
            <ProovedoresComponent  v-if="!spinner" :proovedores="proovedores" ></ProovedoresComponent>

            <!-- TMPORADAS VOLVER UN COMPONENTE --> 
            <TemporadasComponent v-if="!spinner" :temporadas="contenido.seasons"></TemporadasComponent>
            
            <!-- REPARTO SERIES -->
            <RepartoSeries v-if="!spinner" :reparto="reparto" ></RepartoSeries>

           
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
import RepartoSeries from "../components/RepartoSeries.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import TemporadasComponent from "../components/TemporadasComponent.vue";
import GeneroComponent from "../components/GeneroComponent.vue";
import { keyApi } from "../funciones/key";


const route = useRoute()
const router = useRouter()

const serie = ref({})
const trailers = ref({})
const proovedores = ref([])
const reparto = ref([])
const contenido = ref([])

const spinner = ref(true)

// IMDB DE WANDAVISION
// https://api.themoviedb.org/3/find/tt9140560?api_key=9f7031622a3c84ce82bbf384f262391a&language=en-US&external_source=imdb_id

onMounted( async () => {

    let series = `https://api.themoviedb.org/3/tv/`
    let key = keyApi
    let lenguage = `&language=es-ES`

    let api = `${series}${route.params.id}${key}${lenguage}`
    let apitrailers = `${series}${route.params.id}/videos${key}`
    let apiproovedores = `${series}${route.params.id}/watch/providers${key}`
    let apiCreditos = `${series}${route.params.id}/credits${key}`
    let apiEpisodes = `https://api.themoviedb.org/3/tv/${route.params.id}${key}${lenguage}`

    try {
        const res = await axios.get(api)
        const resTrailers = await axios.get(apitrailers)
        const resProovedores = await axios.get(apiproovedores)
        const resCreditos = await axios.get(apiCreditos)
        const resEpisodes = await axios.get(apiEpisodes)

        serie.value = res.data
        trailers.value = resTrailers.data.results
        proovedores.value = resProovedores.data.results.CO
        reparto.value = resCreditos.data.cast
        contenido.value = resEpisodes.data
       console.log(contenido.value)
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