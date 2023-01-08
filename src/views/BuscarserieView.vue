
<template>

            
      
        <div>

        <!-- Link BACK -->
        <div class="w-100 text-center mb-3" >
        <router-link class="text-decoration-none" to="/" >

        <i class="bi bi-arrow-left-circle-fill text-white h3 m-auto text-decoration-none"> 
        <small class="m-2 text-info" >Home</small>
        </i>

        </router-link>

        </div>

        <form v-on:submit.prevent="buscarSerie(query)" class="container m-auto form-outline" >
            <input v-model="query" type="text" class="form-control form-control-sm text-center"
             placeholder="Buscar serie">
        </form>

        <!-- GENEROS -->
        <div class="d-flex  flex-wrap gap-2 container m-auto mt-3 mb-3 m-auto" >
        
            <button style="font-size: .8em;"  v-for="g of generos"  :key="g.id" 
            @click="getForGenre(g)"
            class="text-center fw-bold p-2 rounded button-10" 
            :class="mod === g.id ?'seleccionado' : ''"
            >{{ g.name }}</button>
        </div>

        <!-- BOTONES CAMBIAR DE MODALIDAD -->
        <ButtonsSeries @change-mod="(p, m) => {
             getSeriesPopulares(p, m), clear()
        }" 
        :modd="useBodega.seriePeticion">
        </ButtonsSeries>
        
        <!-- SERIES BUSQUEDA -->
        <div class="w-100">

            <SeriesBusqueda
            :series="series?.results"
            :resultados="series"
            :peticion="seriesPeticion"
            @pasar-pagina="(n) => 
            buscarSerieDos( n, seriesPeticion)"
            ></SeriesBusqueda>

        </div>

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
import SeriesBusqueda from "../components/SeriesBusqueda.vue";
import SeriesGeneros from "../components/SeriesGeneros.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import { useSeries } from '../funciones/series';
import { useBodegaStore } from "../stores/bodega";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

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

const buscarSerie = async (q) => {

let movie = `https://api.themoviedb.org/3/search/tv`
let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
let lang = `&language=es-MX`
let query = `&query='${q}'`

let api = `${movie}${key}${query}${lang}`
    seriesPeticion.value = q
    const res = await axios.get(api)
    series.value = res.data

    seriesGeneros.value = []
    seriesPeticionGeneros.value = ''
    useBodega.seriePeticion = ''
}

const buscarSerieDos = async (p, q) => {

let movie = `https://api.themoviedb.org/3/search/tv`
let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
let lang = `&language=es-MX`
let query = `&page=${p}&query='${q}'`

let api = `${movie}${key}${query}${lang}`
    seriesPeticion.value = q
    const res = await axios.get(api)
    series.value = res.data
}

onMounted( async() => {
    let api = `https://api.themoviedb.org/3/genre/tv/list?api_key=9f7031622a3c84ce82bbf384f262391a&language=es-ES`
    const res = await axios.get(api)
    generos.value = res.data.genres
})


const mod = ref('')
const getForGenre = async (g) => {
    mod.value = g.id
    let api = `https://api.themoviedb.org/3/discover/tv?api_key=9f7031622a3c84ce82bbf384f262391a&language=es-ES&with_genres=${g.id}`
    const res = await axios.get(api)
    seriesGeneros.value = res.data
    seriesPeticionGeneros.value = g.name
    idGenero.value = g.id

    series.value = []
    seriesPeticion.value = ''
    useBodega.seriePeticion = ''
}

const getForGenreTwo = async (n, id) => {
    let api = `https://api.themoviedb.org/3/discover/tv?api_key=9f7031622a3c84ce82bbf384f262391a&language=es-ES&with_genres=${id}&page=${n}`
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
  flex-direction: column;
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
    background: linear-gradient(180deg, #2556a0 0%, #27519e 100%);
    color: white;
}


</style>