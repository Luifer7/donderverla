

<template>

    <div class="w-100 mt-2" >

      <div class="w-100 d-flex justify-content-between mt-3 mb-2" >

          <!-- Router back -->
          <router-link :to="{
                name: 'busqueda', params: {
                    modo: route.params.modo, query: route.params.titulo
                }
            }" >
            <i class="bi bi-arrow-left-circle-fill text-white h1 m-4"></i>
            </router-link>
            <!-- ROuter LINK -->
                     
          <AgregarFavorito
         
         class="mx-3"
         :titulo="titulo"
         ></AgregarFavorito>

      </div>
            
          

            <!-- SPINNER #1 -->
            <div v-if="spinner" class="w-100 text-center" >
             <SpinnerComponent></SpinnerComponent>
            </div>

            <!-- Titulo  por si pelicula-->
            <h3 v-if=" titulo?.title" class="text-white d-flex flex-wrap text-center gap-2 align-items-center justify-content-center" style="font-size: 1.8em;" > 
              <i>{{ titulo?.title }}</i> <small v-if="titulo?.release_date" class="h5 m-0" >({{ titulo?.release_date?.slice(0, -6)}})</small>
            </h3>

              <!-- Titulo  por si SERIE-->
            <h3 v-if=" titulo?.name" class="text-white d-flex flex-wrap px-2 text-center gap-2 align-items-center justify-content-center" style="font-size: 1.8em;" > 
              <i>{{ titulo?.name }}</i> <small v-if="titulo?.first_air_date" class="h5 m-0" >({{ titulo?.first_air_date?.slice(0, -6)}})</small>
            </h3>

            <!-- POSTERS, SERIES, PELICULAS, DETALLES CAJA GENERAL -->
            <div v-if="!spinner" class="row p-2 m-auto" >

                <!-- POSTER POR SI AMBOS -->
                <div class="col-12 col-sm-4 col-md-4 p-2" >
                    <img  v-if="titulo?.poster_path" height="300" 
                    class="rounded w-100 img-thumbnail" 
                    :src="`https://image.tmdb.org/t/p/w500/${titulo?.poster_path}`" 
                    alt="imagen no disponible">
                </div>

                <!-- SINOPSIS Y DEMAS -->
                <div class="col-12 col-sm-8 col-md-8 p-2" >

                    <!-- CAJA DETALLES TODOS -->
                    <div class="text-white" >

                        <!-- SINOPSIS PARA AMBAS -->
                        <i class="text-justify fw-bold" style="font-size: .9em;">
                            {{ titulo?.overview }}
                        </i>

                        <!-- GENEROS PARA AMBAS -->
                       <!--  <GeneroComponent :generos="titulo?.genres"></GeneroComponent> -->
                        <div class="mt-2  mb-2 text-white d-flex gap-3 justify-content-start align-items-start flex-wrap" >
                          <strong class="m-0 fw-bold genero" v-for="g of titulo?.genres" :key="g.id">
                          {{g.name}}
                          </strong>
                        </div>

                          <!-- DETALLES SI ES SERIE-->
                        <div v-if="titulo?.number_of_episodes" class="text-white col-6 col-sm-4 d-flex gap-2 justify-content-start align-items-center flex-wrap" >
                            <strong class="m-0" >Episodios: <small class="fw-bold text-info"> <i>{{titulo?.number_of_episodes}}</i> </small> </strong>
                            <strong class="m-0" >Temporadas: <small class="fw-bold text-info"> <i>{{ titulo?.number_of_seasons}}</i> </small></strong>
                            
                            <!-- DETALLES SERIES -->
                            <strong class="m-0" >Estado: 

                            <small class="fw-bold w-100" v-if="titulo?.status === 'Returning Series'">
                            <i class="text-info text-uppercase" >Habrá otra temporada</i></small>

                            <small class="fw-bold w-100" v-if="titulo?.status === 'Planned'">
                            <i class="text-info text-uppercase" >En planes</i></small>

                            <small class="fw-bold w-100" v-if="titulo?.status === 'Canceled'">
                            <i class="text-danger text-uppercase" >Cancelada</i></small>

                            <small class="fw-bold w-100" v-if="titulo?.status === 'Ended'">
                            <i class="text-info text-uppercase" >Finalizada</i></small>

                            <small class="fw-bold w-100" v-if="titulo?.status === 'Production'">
                            <i class="text-info text-uppercase" >En produccion</i></small>

                            </strong>
                            
                            <!-- Ultimo episodio -->
                            <strong class="m-0" >Ultimo episodio: <small class="fw-bold text-info"> <i>
                            {{titulo?.last_episode_to_air?.name}} - {{titulo?.last_episode_to_air?.air_date.slice(0, -6)}}
                            </i> </small> </strong>
                        </div>

                        <!-- DIRECTOR SI ES PELICULA -->
                        <div class="mt-1 mb-2" v-if="director[0]?.name" >
                            <strong>Director: <strong class="text-info" >{{ director[0]?.name }}</strong> </strong>
                            </div>
                            <div class="mt-1 mb-2" v-if="titulo?.runtime" >
                            <strong>Duracion: <strong class="text-info" >{{ titulo?.runtime }} Min</strong> </strong>
                        </div>

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
                            <strong class="m-1 h5" >{{ titulo.vote_average }}</strong>
                          </span>

                        </div>


                    </div>

                     <!-- STREAMING PARA AMBAS  -->
                    <div class="d-flex gap-3 flex-wrap mt-1" >
                        <div v-for="prov of proovedores?.flatrate" :key="prov.id" >
                        <span class="d-flex gap-1 align-items-center" >
                            <img width="25" class="rounded-circle" 
                            height="25" :src="`https://image.tmdb.org/t/p/w500/${prov?.logo_path}`" alt=""> 
                            <strong class="text-white" >{{ prov?.provider_name }}</strong>
                        </span>
                        </div>
                    </div>


                </div>
                <!-- END SINOPSIS -->

            </div>

            <!-- TRAILERS -->
            <YoutubeComponent :trailers="trailers"></YoutubeComponent>

              <!-- SPINNER #1 -->
            <div v-if="spinner" class="w-100 text-center mt-5" >
             <SpinnerComponent></SpinnerComponent>
            </div>

             <!-- TAGLINE -->
             <h4 v-if="titulo?.tagline" class="mt-2 m-0 text-center text-white col-12" >
                  <i> 
                  <blockquote >- {{ titulo?.tagline }}</blockquote>
                  </i> 
              </h4>

            <!-- PROOVEDORES -->
            <ProovedoresComponent v-if="!spinner" :proovedores="proovedores" ></ProovedoresComponent>
           
            <!-- TEMPORADAS -->
            <SliderTemporadas v-if="!spinner && route.params.modo === 'tv'" 
            :temporadas="contenido.seasons"
            :nombre="'Temporadas'">
            </SliderTemporadas>
            
            <SliderRepartopeli v-if="!spinner && route.params.modo === 'movie'"
            :reparto="reparto"
            ></SliderRepartopeli>

            <SliderReparto v-if="!spinner && route.params.modo === 'tv'"
            :reparto="reparto"
            :nombre="'Reparto'"
            >
            </SliderReparto>


              <!-- Galeria -->
            <div class="row mt-4 w-100 m-auto"  >
              <img class="img-thumbnail col-12 col-sm-6" v-if="titulo?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${titulo?.backdrop_path}`" alt="imagen no disponible" >
              <img class="img-thumbnail col-12 col-sm-6" v-if="titulo?.belongs_to_collection?.backdrop_path" :src="`https://image.tmdb.org/t/p/w500/${titulo?.belongs_to_collection?.backdrop_path}`" alt="imagen no disponible" >
            </div>


    </div>

  
</template>

<script setup >
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";
import { keyApi } from "../funciones/key";
// import GeneroComponent from "../components/GeneroComponent.vue";
import YoutubeComponent from "../components/YoutubeComponent.vue";
import ProovedoresComponent from "../components/ProovedoresComponent.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import SliderTemporadas from "../components/SliderTemporadas.vue";
import SliderReparto from "../components/SliderReparto.vue";
import SliderRepartopeli from "../components/SliderRepartopeli.vue";
import AgregarFavorito from "../components/users/AgregarFavorito.vue";

const route = useRoute()


const titulo = ref({})

const trailers = ref({})
const proovedores = ref([])
const director = ref([])
const reparto = ref([])
const similares = ref([])
const rating = ref({})
const contenido = ref([])

const spinner = ref(true)

onMounted( async ()=> {

   let key = keyApi
   let url = `https://api.themoviedb.org/3/`

   let find = `${url}${route.params.modo}/${route.params.id}/external_ids${key}`
   const imdbApi = await axios.get(find)
   let imdbid = imdbApi.data.imdb_id 

   //APIS
   let api = `${url}${route.params.modo}/${route.params.id}${key}&language=es-ES`
   let imdb = `https://imdb-api.com/en/API/Ratings/k_8i45ej83/${imdbid}`
   let creditos = `${url}${route.params.modo}/${route.params.id}/credits${key}`
   let apiproovedores = `${url}${route.params.modo}/${route.params.id}/watch/providers${key}`
   let apitrailers = `${url}${route.params.modo}/${route.params.id}/videos${key}`
   let apiEpisodes = `${url}${route.params.modo}/${route.params.id}${key}&language=es-ES`

   //PETICIONES
   const res = await axios.get(api)
   const resIMDB = await axios.get(imdb)
   const resCreditos = await axios.get(creditos) 
   const resProovedores = await axios.get(apiproovedores)
   const resTrailers = await axios.get(apitrailers)
   const resEpisodes = await axios.get(apiEpisodes)
   
   //RESPUESTAS
   titulo.value = res.data
   rating.value = resIMDB.data
   director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
   proovedores.value = resProovedores.data.results.CO
   trailers.value = resTrailers.data.results
   reparto.value = resCreditos.data.cast
   contenido.value = resEpisodes.data
   
   spinner.value = false

})

</script>

<style scoped >

.genero {
    transition: .6s ease all;
    cursor: pointer;
    color: #0dcaf0;
}
.genero:hover {
  color: #0e9bb8;
}

</style>