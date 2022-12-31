


<template>



    <ButtonsModalidad @change-mod="(p, m) => getPopular(p, m)" :modd="useBodega.peticion" ></ButtonsModalidad>
 
    <div class="w-100">
                              
        <PeliculasModalidad 
        :peliculas="useBodega.peliculasPopulares?.results"
        :resultados="useBodega.peliculasPopulares"
        :peticion="useBodega.peticion"
        @pasar-pagina="(n) => 
        getPopular( useBodega.peliculasPopulares?.page == 1 ? useBodega.peliculasPopulares?.page - n
        : useBodega.peliculasPopulares?.page + n)">
        </PeliculasModalidad>

    </div>

</template>

<script setup>
import ButtonsModalidad from "../components/ButtonsModalidad.vue";
import PeliculasModalidad from "../components/PeliculasModalidad.vue";
import { usePeliculas } from "../funciones/peliculas";
import { useBodegaStore } from "../stores/bodega";

const { getPopular } = usePeliculas()
const useBodega = useBodegaStore()



</script>


<style scoped>


</style>