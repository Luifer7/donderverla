

<template>

    <div class="w-100 mt-5" >

        <h3 class="mx-4 fw-bold text-white"> <i>BUSQUEDA
            <i class="text-info">{{ route.params.query }}</i></i>
        </h3>

        <div class="w-100" >

            <TituloComponent
            :titulos=" useBodega.resultadoBusqueda.results"
            :resultados=" useBodega.resultadoBusqueda"
            :peticion="current"
            @next-page="(n) => {
                pasarPagina(n)
            }">
            </TituloComponent>

        </div>

        
    </div>
       
</template>

<script setup >
import { onBeforeMount, onMounted, onUpdated, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";
import { keyApi } from "../funciones/key";
import { useBodegaStore } from "../stores/bodega";
import PeliculasModalidad from "../components/PeliculasModalidad.vue";
import TituloComponent from "../components/TituloComponent.vue";

const route = useRoute()
const useBodega = useBodegaStore()

const resultadosBusqueda = ref({})
const current = ref('')

onMounted(async()=> {
   let key = keyApi
   let api = `https://api.themoviedb.org/3/search/${route.params.modo}${key}&language=es-ES&query=${route.params.query}`
   const res = await axios.get(api)
   useBodega.resultadoBusqueda = res.data
   current.value = route.params.query
})

const pasarPagina = async (n) =>{
   let key = keyApi
   let api = `https://api.themoviedb.org/3/search/${route.params.modo}${key}&language=es-ES&query=${route.params.query}&page=${n}`
   const res = await axios.get(api)
   useBodega.resultadoBusqueda = res.data
}




</script>

<style scoped>

</style>