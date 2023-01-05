
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

            <div class="col-12 col-sm-8 col-md-8 p-2" >
              <small class="text-white" >
              <i class="text-justify" >{{ serie?.overview }}</i>
            </small>

            <YoutubeComponent :trailers="trailers"  ></YoutubeComponent>
            
          </div>
          
            </div>

            <!-- DETALLES -->
            <div class="w-100 row p-3" >

              <h4 class="mt-2 m-0 text-center text-white col-12" >
                  <i> 
                  <blockquote >{{ contenido?.tagline }}</blockquote>
                  </i> 
              </h4>

              <div class="p-3 text-white col-12 col-sm-4 d-flex gap-3 justify-content-start align-items-center flex-wrap" >
                <h5 class="m-0" ><i>Genero: </i> </h5> <strong class="m-0 fw-bold" v-for="g of contenido?.genres" :key="g.id" >{{g.name}}</strong>
              </div>

              <div class="p-3 text-white col-12 col-sm-4 d-flex gap-3 justify-content-start align-items-center flex-wrap" >
                <h5 class="m-0" >Episodios: <small class="fw-bold"> <i>{{contenido?.number_of_episodes}}</i> </small> </h5>
                <h5 class="m-0" >Temporadas: <small class="fw-bold"> <i>{{ contenido?.number_of_seasons}}</i> </small></h5>
                <h5 class="m-0" >Estado: <small class="fw-bold"> <i>{{ contenido?.status}}</i> </small> </h5>
              </div>

              <div class="p-3 text-white col-12 col-sm-4 d-flex gap-1 justify-content-start align-items-center flex-wrap" >
                <h5 class="fw-bold m-0" >Ultimo episodio</h5>
                {{contenido?.last_episode_to_air?.name}} ( {{contenido?.last_episode_to_air?.air_date}} )
              </div>

            </div>
          
            <!-- SPINNER -->
            <div v-if="spinner" class="w-100 text-center p-4" >
            <SpinnerComponent></SpinnerComponent>
            </div>

            <!-- PROOVEDORES -->
            <ProovedoresComponent :proovedores="proovedores" ></ProovedoresComponent>

            <!-- TMPORADAS VOLVER UN COMPONENTE -->
            <h4 class="text-center text-white fw-bold">Temporadas</h4>
            <div class="w-100 p-2 d-flex gap-3 align-items-center box-temp mb-4" >

                <div v-for="s of contenido.seasons" :key="s.id" class="box-season p-2" >
                  <strong class="m-0 text-center text-white m-1" >Season {{s.season_number}}</strong>
                  <img  class="img-season"
                       :src="`https://image.tmdb.org/t/p/w500/${s.poster_path}`" alt="">
                </div>
                
            </div>

            <!-- REPARTO SERIES -->
            <RepartoSeries :reparto="reparto" ></RepartoSeries>

            <!-- SPINNER -->
            <div v-if="spinner" class="w-100 text-center p-4" >
            <SpinnerComponent></SpinnerComponent>
            </div>

              <!-- Galeria -->
            <div class="d-flex box-imagenes mt-4"  >
              <img class="img-thumbnail" v-if="serie?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${serie?.backdrop_path}`" alt="imagen no disponible" >
              <img class="img-thumbnail" v-if="serie?.last_episode_to_air?.still_path" :src="`https://image.tmdb.org/t/p/w500/${serie?.last_episode_to_air?.still_path}`" alt="imagen no disponible" >
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


const route = useRoute()
const router = useRouter()

const serie = ref({})
const trailers = ref({})
const proovedores = ref([])
const reparto = ref([])
const contenido = ref([])

const spinner = ref(true)

onMounted( async () => {

    let series = `https://api.themoviedb.org/3/tv/`
    let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
    let lenguage = `&language=es-MX`

    let api = `${series}${route.params.id}${key}${lenguage}`
    let apitrailers = `${series}${route.params.id}/videos${key}`
    let apiproovedores = `${series}${route.params.id}/watch/providers${key}`
    let apiCreditos = `${series}${route.params.id}/credits${key}`
    let apiEpisodes = `https://api.themoviedb.org/3/tv/${route.params.id}${key}`

    //GET EPISODES 
    // https://api.themoviedb.org/3/tv/19885/season/1?api_key=9f7031622a3c84ce82bbf384f262391a&language=es-MX

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
        
        spinner.value = false

    } catch (error) {
        Swal.fire({
        icon: 'error', title: 'Ha ocurrido un error inesperado!', position: 'top',
        allowOutsideClick: false, confirmButtonText: 'solucionar!'
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
    let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
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

</style>