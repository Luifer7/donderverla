
<template>

  <div class="w-100 p-2" >

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
import SliderComponent from "../components/SliderComponent.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import { keyApi } from "../funciones/key";

const route = useRoute()
const router = useRouter()

const titulos = ref({})
const titulosTop = ref({})
const spinner = ref(true)

onMounted( async () => {

  try {
    
    let page = Math.floor(Math.random() * 50)
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular${keyApi}&page=${page}`)
    const resTop = await axios.get(`https://api.themoviedb.org/3/movie/top_rated${keyApi}&page=${page}`)

    titulos.value = res.data.results
    titulosTop.value = resTop.data.results 
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

</script>

<style>

</style>