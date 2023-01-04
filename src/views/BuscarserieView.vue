
<template>

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
import SeriesModalidad from "../components/SeriesModalidad.vue";
import { useSeries } from '../funciones/series';
import { useBodegaStore } from "../stores/bodega";

const useBodega = useBodegaStore()
const { getSeriesPopulares } = useSeries()


</script>

<style scoped>

</style>