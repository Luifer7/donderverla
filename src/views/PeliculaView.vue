

<template>
     
     <div>

        <div v-if="!spinner"  class="w-100 mt-2 box-vista">

        <div class="w-100 d-flex justify-content-between mt-3 mb-2" >

          <!-- Router back -->
          <router-link to="/buscarpelicula" >
          <i class="bi bi-arrow-left-circle-fill text-white h1 m-4"></i>
        </router-link>
        
          <AgregarFavorito class="mx-3" :titulo="pelicula"
          ></AgregarFavorito>

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

          <component :is="SliderTrailer" 
          :trailersEsp="trailersEs"
          />

          <YoutubeComponent :trailers="trailers"  ></YoutubeComponent>

           <!-- DETALLES -->
           <div class="w-100 row p-3" >

            <!-- TAGLINE -->
            <h4 class="mt-2 m-0 text-center text-white col-12" >
                <i> 
                <blockquote >- {{ pelicula?.tagline }}</blockquote>
                </i> 
            </h4>

          </div>


          <ProovedoresComponent  :proovedores="proovedores" ></ProovedoresComponent>

        
          <SliderRepartopeli 
          :reparto="reparto">
          </SliderRepartopeli>
           

            <!-- Galeria -->
          <div class="row mt-4 w-100 m-auto"  >
            
            <img 
            class="img-thumbnail col-12 col-sm-6" 
            v-if="pelicula?.backdrop_path" 
            :src="`https://image.tmdb.org/t/p/w500/${pelicula?.backdrop_path}`" 
            alt="imagen no disponible" >
            
            <img 
            class="img-thumbnail col-12 col-sm-6" 
            v-if="pelicula?.belongs_to_collection?.backdrop_path" 
            :src="`https://image.tmdb.org/t/p/w500/${pelicula?.belongs_to_collection?.backdrop_path}`" 
            alt="imagen no disponible" >
          
          </div>


          <!-- RECOMENDACIONES -->
          <div  class="w-100 text-center mt-5" >
          <h4 class="text-white m-auto mb-4 px-2">
            <i>Recomendaciones a partir de <strong class="text-info" >{{ route.params.pelicula }}</strong> </i></h4>
          <PeliculasSimilares
          :peliculas="similares?.results"
          :peticion="'similares'"
          :resultados="similares"
          @pasar-dos="(p) => getSimimilar(p)"
          @pasar-page="(n) => 
          pasarPaginaSimilares(n)"
          ></PeliculasSimilares>
          </div>
      
        </div>

        <!-- SPINNER #1 -->
          <div v-if="spinner" class="w-100 text-center py-4" >
          <SpinnerComponent></SpinnerComponent>
          </div>

          <!-- SPINNER #2 -->
          <div v-if="spinner" class="w-100 text-center py-4" >
          <SpinnerComponent></SpinnerComponent>
          </div>
   
      </div>

</template>

<script setup >
import { defineAsyncComponent, onMounted } from "@vue/runtime-core";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import DetallesComponent from "../components/DetallesComponent.vue";
import ProovedoresComponent from "../components/ProovedoresComponent.vue";
import YoutubeComponent from "../components/YoutubeComponent.vue";
import PeliculasSimilares from "../components/PeliculasSimilares.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import SliderRepartopeli from "../components/sliders/SliderRepartopeli.vue";
import AgregarFavorito from "../components/users/AgregarFavorito.vue";
import PosterComponent from "../components/PosterComponent.vue";
import { usePeliculas } from "../funciones/peliculas";

const SliderTrailer = defineAsyncComponent(() =>  import('../components/sliders/SliderTrailer.vue'))

const { getDatosPelicula, 
        pelicula, trailers, trailersEs, proovedores, 
        director, reparto, similares, genres, spinner, key } = usePeliculas()

const route = useRoute()
const router = useRouter()

onMounted(() => {
  getDatosPelicula(route.params)
})

const pasarPaginaSimilares = async (page) =>{
  let apiSimilares = `https://api.themoviedb.org/3/movie/${route.params.id}/recommendations${key}&page=${page}&language=es-MX`
  const resSimilaresDos = await axios.get(apiSimilares)
  similares.value = resSimilaresDos.data
}

const getSimimilar = (data) => {
  router.push({name: 'similar', params: { current: route.params.pelicula, currentId: route.params.id, pelicula: data.title, id: data.id }}) 
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
