
<template>

            
      

        <!-- Link BACK -->
        <div class="w-100 text-center mb-3" >
        <router-link class="text-decoration-none" to="/" >

        <i class="bi bi-arrow-left-circle-fill text-white h3 m-auto text-decoration-none"> 
        <small class="m-2 text-info" >Home</small>
        </i>

        </router-link>

        </div>

        <form v-on:submit.prevent="buscarSerie(query)" class="w-50 m-auto" >
            <input v-model="query" type="text" class="form-control form-control-sm" placeholder="buscar serie">
        </form>

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

       

</template>

<script setup>
import { ref } from "@vue/reactivity";
import axios from "axios";
import ButtonsSeries from "../components/ButtonsSeries.vue";
import SeriesModalidad from "../components/SeriesModalidad.vue";
import SeriesBusqueda from "../components/SeriesBusqueda.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import { useSeries } from '../funciones/series';
import { useBodegaStore } from "../stores/bodega";

const useBodega = useBodegaStore()
const { getSeriesPopulares } = useSeries()

const query = ref('')
const series = ref([])
const seriesPeticion = ref('') 

const buscarSerie = async (q) => {

let movie = `https://api.themoviedb.org/3/search/tv`
let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
let lang = `&language=es-MX`
let query = `&query='${q}'`

let api = `${movie}${key}${query}${lang}`
    seriesPeticion.value = q
    const res = await axios.get(api)
    series.value = res.data
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

</script>

<style scoped>

</style>