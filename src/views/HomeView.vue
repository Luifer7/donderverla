
<template>

  <div class="w-100 p-2">


      <!-- SLIDER TENDENCIAS -->
      <div class="w-100 mt-2" >

          <Suspense>
            <component :is="sliderTendencias"  
            :titulos="tendencias" :nombre="'Te recomendamos'"
            @getTitle="(titulo) => {
            getTitle(titulo)
            }"
            />
            <template #fallback >
            <div class="w-100 d-flex align-items-center justify-content-center p-4">
              <SpinnerComponent></SpinnerComponent>
            </div>
            </template> 
        </Suspense>

      </div>

      <!-- Slider personas -->
      <div class="w-100 mt-2">
        <Suspense>
        <component :is="sliderPersonas"  
        :persona="person"
        :nombre="'Personas'"
        />
      </Suspense>
      </div>
 
      <!-- Slider series top -->
      <div class="w-100 mt-2" >

          <component :is="sliderTop"
          :titulos="titulosTop"
          :nombre="'Peliculas Top'"
          @getTitle="(titulo) => {
            getTitle(titulo)
          }"
          />

          <!-- 
              <SliderComponent
          :titulos="titulosTop"
          :nombre="'Peliculas Top'"
          @getTitle="(titulo) => {
            getTitle(titulo)
          }">
          </SliderComponent>
           -->

      </div>
     
      <!-- Slider populares -->
      <div class="w-100 mt-2" >
      <component :is="sliderPopulares"
      :titulos="titulos"
      :nombre="'Peliculas Populares'"
      @getTitle="(titulo) => {
        getTitle(titulo)
      }"
      />

      <!-- 
         <SliderComponent
      :titulos="titulos"
      :nombre="'Peliculas Populares'"
      @getTitle="(titulo) => {
        getTitle(titulo)
      }"
      >
      </SliderComponent>
       -->
      
      </div>

      
  </div>
  
  


</template>

<script setup >
import { defineAsyncComponent, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { keyApi } from "../funciones/key";
import SpinnerComponent from "../components/SpinnerComponent.vue";

const sliderTendencias = defineAsyncComponent(() => import("../components/sliders/SliderComponent.vue") )
const sliderPersonas = defineAsyncComponent(() => import("../components/sliders/PersonSlider.vue"))
const sliderTop = defineAsyncComponent(() => import("../components/sliders/SliderComponent.vue") )
const sliderPopulares = defineAsyncComponent(() => import("../components/sliders/SliderComponent.vue") )

const router = useRouter()

const titulos = ref({})
const titulosTop = ref({})
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
    const resTendencias = await axios.get(`https://api.themoviedb.org/3/trending/movie/day${keyApi}${lenguage}&page=${pp}`)
    const resPerson = await axios.get(`https://api.themoviedb.org/3/trending/person/week${keyApi}${lenguage}&page=${pp}`)
    //const enCineImdb = await axios.get('https://imdb-api.com/en/API/InTheaters/k_8i45ej83')

    titulos.value = res.data.results
    titulosTop.value = resTop.data.results 
    //cines.value = enCineImdb.data.items
    tendencias.value  = resTendencias.data.results
    person.value = resPerson.data.results

    spinner.value = false
  
  } catch (error) {
    Swal.fire({
      icon: 'info', html: `<strong>Ha ocurrido un error inesperado</strong>`, position: 'top',
      allowOutsideClick: false, confirmButtonText: 'solucionar!', confirmButtonColor: '#00b347'
    }).then((r)=>{
      if (r.isConfirmed) {
       spinner.value = true
       realoadData()   
       Swal.fire({icon: 'success', title: 'solucionado!', timer: 1000, showConfirmButton: false })     
      }
    })
  
  }
   
})


const realoadData = async () => {

  try {
    
    let page = Math.floor(Math.random() * 50)
    let pp = Math.floor(Math.random() * 10)
    let lenguage = `&language=es-ES`
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular${keyApi}${lenguage}&page=${page}`)
    const resTop = await axios.get(`https://api.themoviedb.org/3/movie/top_rated${keyApi}${lenguage}&page=${page}`)
    const resTendencias = await axios.get(`https://api.themoviedb.org/3/trending/movie/day${keyApi}${lenguage}&page=${pp}`)
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

}

const getTitle = (titulo) => {
    router.push({
      name: 'pelicula', params: {
        pelicula: titulo.title, id: titulo.id 
      }
    })
}



</script>

<style>

</style>