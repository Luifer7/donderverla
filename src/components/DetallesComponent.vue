

<template>
    
    <div class="w-100 text-white" >
        <h4 class="mt-2 text-center text-white p-2" >
            <i>
            <blockquote v-if="pelicula?.tagline" >"{{ pelicula?.tagline }}"</blockquote>
            </i> 
        </h4>
        <div v-if="pelicula?.release_date" class="p-3 d-flex gap-2 align-items-center justify-content-around flex-wrap" >
            <strong class="text-primary" >Año: <small class="text-white" >{{pelicula?.release_date}}</small></strong>
            <strong class="text-primary" >Duración: <small class="text-white" >{{ pelicula?.runtime }}</small></strong>
            <strong class="text-primary" >Director: <small class="text-white" >{{director[0]?.name}}</small></strong>
            <strong class="text-primary" >Escritor: <small class="text-white" >{{ escritor[0]?.name}}</small></strong>
        </div>
    </div>
  


</template>

<script setup>
import { onMounted } from "@vue/runtime-core"


defineProps({
    pelicula: Object, director: Object, escritor: Object
})


</script>

<style scoped>

</style>