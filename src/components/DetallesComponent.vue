

<template>
    
    <div class="w-100 text-white" >

        <h4 class="mt-2 text-center text-white p-2" >
            <i>
            <blockquote v-if="pelicula?.tagline" >"{{ pelicula?.tagline }}"</blockquote>
            </i> 
            
        </h4>


        <div v-if="pelicula?.release_date" class="row w-100 p-3" >
            <strong class="text-dark col-6" >Año: <small class="text-white" >{{pelicula?.release_date?.slice(0, -6) }}</small></strong>
            <strong class="text-dark col-6" >Duración: <small class="text-white" >{{ pelicula?.runtime }} min</small></strong>
            <strong class="text-dark col-6" >Director: <small class="text-white" >{{director[0]?.name}}</small></strong>
            <strong v-if="escritor[0]?.name" class="text-dark col-6">Escritor: <small class="text-white" >{{ escritor[0]?.name}}</small></strong>
        </div>
    </div>
  


</template>

<script setup>
import { onMounted } from "@vue/runtime-core"


defineProps({
    pelicula: Object, director: Object, escritor: Object, genres: Object
})


</script>

<style scoped>

</style>