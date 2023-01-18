
<template>

  <div class="w-100 p-2">

      <div class="w-100 mt-2" >
        <SliderImdb
        v-if="cines === {}"
        :titulos="cines"
        :nombre="'En cines'"
        @getTitle="(titulo) => {
        getEnCines(titulo)
        }"
        >

        </SliderImdb>
        
      </div>

      <!-- SLIDER TENDENCIAS -->
      <div class="w-100 mt-2" >

        <SliderComponent
        :titulos="tendencias"
        :nombre="'Peliculas en Tendencias'"
        @getTitle="(titulo) => {
          getTitle(titulo)
        }">
        </SliderComponent>
      </div>

      <div class="w-100 mt-2">

        <PersonSlider
          :persona="person"
          :nombre="'Personas'"
          >
        </PersonSlider>

      </div>

      <div class="w-100 mt-2" >

          <SliderComponent
          :titulos="titulosTop"
          :nombre="'Peliculas Top'"
          @getTitle="(titulo) => {
            getTitle(titulo)
          }">
          </SliderComponent>
        
      </div>
     
      <div class="w-100 mt-2" >

      <SliderComponent
      :titulos="titulos"
      :nombre="'Peliculas Populares'"
      @getTitle="(titulo) => {
        getTitle(titulo)
      }"
      >
      </SliderComponent>

      </div>

  </div>
  
  


</template>

<script setup >
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import PersonSlider from "../components/PersonSlider.vue";
import SliderComponent from "../components/SliderComponent.vue";
import SliderImdb from "../components/SliderImdb.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import { keyApi } from "../funciones/key";

const route = useRoute()
const router = useRouter()

const titulos = ref({})
const titulosTop = ref({})
const cines = ref({})
const tendencias = ref({})
const person = ref({}) 

const spinner = ref(true)

onMounted( async () => {

  try {
    
    let page = Math.floor(Math.random() * 50)
    let pp = Math.floor(Math.random() * 10)
    let lenguage = `&language=es-ES`
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular${keyApi}${lenguage}&page=${page}`)
    const resTop = await axios.get(`https://api.themoviedb.org/3/movie/top_rated${keyApi}${lenguage}&page=${page}`)
    const resTendencias = await axios.get(`https://api.themoviedb.org/3/trending/movie/day${keyApi}${lenguage}`)
    const resPerson = await axios.get(`https://api.themoviedb.org/3/trending/person/week${keyApi}${lenguage}&page=${pp}`)
    //const enCineImdb = await axios.get('https://imdb-api.com/en/API/InTheaters/k_8i45ej83')

    titulos.value = res.data.results
    titulosTop.value = resTop.data.results 
    //cines.value = enCineImdb.data.items
    tendencias.value  = resTendencias.data.results
    person.value = resPerson.data.results

    spinner.value = false
  
  } catch (error) {
    console.log(error)  
  }
   
})

const getTitle = (titulo) => {
    router.push({
      name: 'pelicula', params: {
        pelicula: titulo.title, id: titulo.id 
      }
    })
}

const getEnCines = async (titulo) => {

  let id = titulo.id
  let lenguage = `&language=es-ES`
  const res = await axios.get(`https://imdb-api.com/en/API/ExternalSites/k_8i45ej83/${id}`)
  let idMovie = res.data.theMovieDb.id
  let api = `https://api.themoviedb.org/3/${idMovie}${keyApi}${lenguage}`
  const resMovie = await axios.get(api)

  let newTitulo = resMovie.data.title
  let newIdTitulo = resMovie.data.id

  router.push({
      name: 'pelicula', params: {
        pelicula: newTitulo, id: newIdTitulo 
      }
    })


}

</script>

<style>

</style>