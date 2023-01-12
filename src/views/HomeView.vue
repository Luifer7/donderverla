


<template>

  <div class="w-100" >

        <div id="carouselExample" class="carousel slide">

          <div class="carousel-inner p-4">
            
              <div class="carousel-item active" v-for="d of data" :key="d.id" >
              <img :src="`https://image.tmdb.org/t/p/w500/${d.path}`" 
                class="d-block w-100" alt="..."> 
              </div>

          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>

            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
        
        </div>

  </div>
  

</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";
import { keyApi } from "../funciones/key";

const data = ref([
  {id: 1, path: '/r9PkFnRUIthgBp2JZZzD380MWZy.jpg'},
  {id: 2, path: '/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg'},
  {id: 3, path: '/zrnzWEQSJ0jtufPGR4SEnB6s1q1.jpg'},
  {id: 4, path: '/53BC9F2tpZnsGno2cLhzvGprDYS.jpg'},
  {id: 5, path: '/7dm64SW5L5CCg47kAEAcdCGaq5i.jpg'}, 
])
const current = ref()

onMounted( async () => {

  let key = keyApi
  let mode = `https://api.themoviedb.org/3/movie/popular${keyApi}` 
  const res = await axios.get(mode)
  //data.value = res.data.results
})




</script>


<style scoped>


</style>