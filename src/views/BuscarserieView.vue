
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

        <form v-on:submit.prevent="buscarSerie(query)" class="container m-auto" >
            <input v-model="query" type="text" class="form-control form-control-sm text-center"
             placeholder="Buscar serie">
        </form>

        <!-- GENEROS -->
        <div class="d-flex  flex-wrap gap-2 container m-auto mt-3 mb-3 m-auto" >
        
            <span style="font-size: .8em;"  v-for="g of generos"  :key="g.id" 
            @click="getForGenre(g)"
            class="text-center text-dark fw-bold p-2 rounded bg-info genre" >{{ g.name }}</span>
        </div>


        <ButtonsSeries @change-mod="(p, m) => getSeriesPopulares(p, m)" :modd="useBodega.seriePeticion">
        </ButtonsSeries>
        

        <div class="w-100">

        <SeriesBusqueda
        :series="series?.results"
        :resultados="series"
        :peticion="seriesPeticion"
        @pasar-pagina="(n) => 
        buscarSerieDos( n, seriesPeticion)"
        ></SeriesBusqueda>

        </div>

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

        <div class="w-100">

            <SeriesModalidad
            :series="useBodega.seriesPopulares?.results"
            :resultados="useBodega.seriesPopulares"
            :peticion="useBodega.seriePeticion"
            @pasar-pagina="(n) => 
            getSeriesPopulares( n, useBodega.seriePeticion)"
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

const getForGenre = async (g) => {
    let api = `https://api.themoviedb.org/3/discover/tv?api_key=9f7031622a3c84ce82bbf384f262391a&language=es-ES&with_genres=${g.id}`
    const res = await axios.get(api)
    seriesGeneros.value = res.data
    seriesPeticionGeneros.value = g.name
    idGenero.value = g.id

    series.value = []
    seriesPeticion.value = ''
}

const getForGenreTwo = async (n, id) => {
    let api = `https://api.themoviedb.org/3/discover/tv?api_key=9f7031622a3c84ce82bbf384f262391a&language=es-ES&with_genres=${id}&page=${n}`
    const res = await axios.get(api)
    seriesGeneros.value = res.data
    
}


</script>

<style scoped>

.genre{
    cursor: pointer;
    transition: .6s ease all;
}
.genre:hover{
    transform: scale(.9);
}

.genre:active{
    transform: scale(1.1);
}




</style>