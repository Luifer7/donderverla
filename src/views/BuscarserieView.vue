
<template>

            
      

        <!-- Link BACK -->
        <div class="w-100 text-center mb-3" >
        <router-link class="text-decoration-none" to="/" >

        <i class="bi bi-arrow-left-circle-fill text-white h3 m-auto text-decoration-none"> 
        <small class="m-2 text-info" >Home</small>
        </i>

        </router-link>

        </div>

        <ButtonsSeries @change-mod="(p, m) => getSeriesPopulares(p, m)" :modd="useBodega.seriePeticion">
        </ButtonsSeries>

        


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
import ButtonsSeries from "../components/ButtonsSeries.vue";
import SeriesModalidad from "../components/SeriesModalidad.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import { useSeries } from '../funciones/series';
import { useBodegaStore } from "../stores/bodega";

const useBodega = useBodegaStore()
const { getSeriesPopulares } = useSeries()


</script>

<style scoped>

</style>