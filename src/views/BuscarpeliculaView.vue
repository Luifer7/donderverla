


<template>

    <div>
    <div class="w-100 mt-3 mb-3" >
        <router-link to="/" class="m-2" >
          <i class="bi bi-arrow-left-circle-fill text-white h1 m-4"></i>
        </router-link>
    </div>

    <div class="w-100 d-flex justify-content-center mb-4" >
        <form v-on:submit.prevent="buscarPleicula(query)" style="width: 80%;" >
            <input type="text" required v-model="query" class="form-control form-control-sm w-100" 
                   placeholder="Buscar peliculas">
        </form>
    </div>

    <div class="w-100" v-if="peliculas" >
        <PeliculasModalidad
        :peliculas="peliculas?.results"
        :resultados="peliculas"
        :peticion="peticion"
        @pasar-pagina="(n) => 
        pasarPage( n, peticion)"
        ></PeliculasModalidad>   
    </div>

    <div v-if="!peliculas" class="w-100 text-center p-4" >
        <img src="../assets/img/ggg.png" width="250" height="400" alt="">
    </div>
    </div>

</template>

<script setup>
import { ref } from "@vue/reactivity"
import PeliculasModalidad from "../components/PeliculasModalidad.vue";
import axios from "axios"
import { useBodegaStore } from "../stores/bodega";


const useBodega = useBodegaStore()
const query = ref('')
const peliculas = ref(null)
const peticion = ref('') 


const buscarPleicula = async (q) => {

    let movie = `https://api.themoviedb.org/3/search/movie`
    let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
    let lang = `&language=es-MX`
    let query = `&query='${q}'`

    let api = `${movie}${key}${query}${lang}`

    const res = await axios.get(api)
    peliculas.value = res.data
    peticion.value = q
}

const pasarPage = async (n, q) => {
    let api = `https://api.themoviedb.org/3/search/movie?api_key=9f7031622a3c84ce82bbf384f262391a&page=${n}&query=${q}&language=es-MX`
    const res = await axios.get(api)
    peliculas.value = res.data
    peticion.value = q
}

</script>

<style scoped>

</style>