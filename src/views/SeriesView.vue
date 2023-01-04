
<template>

    <div class="w-100">

            <router-link to="/buscarseries" >
                <i class="bi bi-arrow-left-circle-fill text-white h1 m-4"></i>
            </router-link>

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

            
        <h4 class="mt-2 text-center text-white p-2" >
            <i>
            <blockquote v-if="serie?.tagline" >"{{ serie?.tagline }}"</blockquote>
            </i> 
            
        </h4>

            <ProovedoresComponent :proovedores="proovedores" ></ProovedoresComponent>

            <RepartoComponent :reparto="reparto" ></RepartoComponent>

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
import RepartoComponent from "../components/RepartoComponent.vue";


const route = useRoute()
const router = useRouter()

const serie = ref({})
const trailers = ref({})
const proovedores = ref([])
const reparto = ref([])

onMounted( async () => {

    let series = `https://api.themoviedb.org/3/tv/`
    let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
    let lenguage = `&language=es-MX`

    let api = `${series}${route.params.id}${key}${lenguage}`
    let apitrailers = `${series}${route.params.id}/videos${key}`
    let apiproovedores = `${series}${route.params.id}/watch/providers${key}`
    let apiCreditos = `${series}${route.params.id}/credits${key}`

    try {
        const res = await axios.get(api)
        const resTrailers = await axios.get(apitrailers)
        const resProovedores = await axios.get(apiproovedores)
        const resCreditos = await axios.get(apiCreditos)

        serie.value = res.data
        trailers.value = resTrailers.data.results
        proovedores.value = resProovedores.data.results.CO
        reparto.value = resCreditos.data.cast
        
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

</style>