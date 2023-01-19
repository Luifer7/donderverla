
<template>


        <div>
   
            <!-- GENEROS -->
            <div class="d-flex flex-wrap gap-2 px-2
                        m-auto mt-3 mb-3" >
            
                <button style="font-size: .8em;" 
                v-for="g of generos"  :key="g.id" 
                @click="getForGenre(g)"
                class="text-center fw-bold p-2 rounded btn 
                       btn-sm btn-outline-info btnbtn" 
                :class="mod === g.id ?'seleccionado' : ''"
                >{{ g.name }} 
                <span v-if="mod === g.id && spinnerButton" 
                class="spinner-border spinner-border-sm" 
                role="status" aria-hidden="true"></span>
                </button>

            </div>

            <!-- BOTONES CAMBIAR DE MODALIDAD -->
            <ButtonsSeries @change-mod="(p, m) => {
                getSeriesPopulares(p, m), clear()
            }" 
            :modd="useBodega.seriePeticion">
            </ButtonsSeries>
        

        <!-- SERIES GENEROS -->
        <div class="w-100" >

            <SeriesGeneros
            :series="seriesGeneros?.results"
            :resultados="seriesGeneros"
            :peticion="seriesPeticionGeneros"
            @pasar-paginaTwo="(n) => 
            getForGenreTwo(n, idGenero)"
            ></SeriesGeneros>

        </div>
        
        <div v-if="!useBodega.seriesPopulares" class="w-100 text-center p-4" >
        <SpinnerComponent></SpinnerComponent>
        </div>

        <!-- SERIES MODALIDADES POPULAE, ETC... -->
        <div class="w-100">

            <SeriesModalidad
            :series="useBodega.seriesPopulares?.results"
            :resultados="useBodega.seriesPopulares"
            :peticion="useBodega.seriePeticion"
            @pasar-pagina="(n) =>{
                 getSeriesPopulares( n, useBodega.seriePeticion)
            }"
            ></SeriesModalidad>
        
        </div>

        </div>

</template>

<script setup>
import { ref } from "@vue/reactivity";
import axios from "axios";
import ButtonsSeries from "../components/ButtonsSeries.vue";
import SeriesModalidad from "../components/SeriesModalidad.vue";
import SeriesGeneros from "../components/SeriesGeneros.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import { useSeries } from '../funciones/series';
import { useBodegaStore } from "../stores/bodega";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { keyApi } from "../funciones/key";

const useBodega = useBodegaStore()
const { getSeriesPopulares } = useSeries()
const route = useRoute()
const router = useRouter()

const query = ref('')
const series = ref([])
const seriesPeticion = ref('') 

const generos = ref({})

const seriesGeneros = ref([])
const seriesPeticionGeneros = ref('') 
const idGenero = ref('')


onMounted( async() => {
    let api = `https://api.themoviedb.org/3/genre/tv/list${keyApi}&language=es-ES`
    const res = await axios.get(api)
    generos.value = res.data.genres
})


const mod = ref('')
const spinnerButton = ref(null)

const getForGenre = async (g) => {
    spinnerButton.value = true
    mod.value = g.id
    let api = `https://api.themoviedb.org/3/discover/tv${keyApi}&language=es-ES&with_genres=${g.id}`
    const res = await axios.get(api)
    seriesGeneros.value = res.data
    seriesPeticionGeneros.value = g.name
    idGenero.value = g.id

    spinnerButton.value = false
    series.value = []
    seriesPeticion.value = ''
    useBodega.seriePeticion = ''
}

const getForGenreTwo = async (n, id) => {
    let api = `https://api.themoviedb.org/3/discover/tv${keyApi}&language=es-ES&with_genres=${id}&page=${n}`
    const res = await axios.get(api)
    seriesGeneros.value = res.data
    
}


const clear = () => {
    series.value = []
    seriesPeticion.value = ''
    seriesGeneros.value = []
    seriesPeticionGeneros.value = ''
    mod.value = ''
}

</script>

<style scoped>

.genre:active{
    transform: scale(1.1);
}


.button-10 {
  transition: .6s ease all;
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 6px 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 6px;
  border: none;

  color: #fff;
  background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
  background-origin: border-box;
  box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-10:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}
.button-10:hover {
    transform: scale(.9);
}
.button-10:active {
    transform: scale(1.1);
}

.seleccionado{
        transition: .8s ease all;
        background: linear-gradient(109.6deg, rgb(11, 145, 122) 11.2%, rgb(11, 132, 145) 91.1%);
        color: white;
        border: none;
        letter-spacing: 1px;
    }

    .btnbtn{
      transition: .8s ease all;
    }

    .btnbtn:hover{
      border: none;
    }


</style>