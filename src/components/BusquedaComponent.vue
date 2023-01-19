

<template>
    
    <form class="input-group w-100 m-0 formulario" 
     v-on:submit.prevent="makeSearch(modoBusqueda, query)" >
        
        <button class=" btn-outline-dark btn-buscar p-2 text-info fw-bold dropdown-toggle" 
        style="border: none; letter-spacing: 2px;"
        type="button" data-bs-toggle="dropdown" aria-expanded="false">{{modoBusqueda}}
        </button>

        <ul class="dropdown-menu drop-box">
          <li><a class="dropdown-item text-info bg-transparent item fw-bold" @click="getModoBusqueda('tv')" >tv</a></li>
          <li><a class="dropdown-item text-info bg-transparent item fw-bold" @click="getModoBusqueda('movie')" >movie</a></li>
        </ul>

        <input required type="text" ref="input" v-model="query" placeholder="Buscar en dondeverla" 
        class="form-control fw-bold p-2  input-buscar">

        <div class="p-0 m-0 lupa" >
            <i class="bi bi-search text-white" @click="makeSearch(modoBusqueda, query)" ></i>
        </div>

    </form>

</template>

<script setup >
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { keyApi } from "../funciones/key";
import { useBodegaStore } from "../stores/bodega";

const route = useRoute()
const router = useRouter()
const useBodega = useBodegaStore()

const modoBusqueda = ref('movie')
const query = ref('')
const input = ref(null)

const getModoBusqueda = (m) => {
    modoBusqueda.value = m
    input.value.focus()
}

const makeSearch = async (m, q) => {
    
    let key = keyApi
    let api = `https://api.themoviedb.org/3/search/${m}${key}&language=es-ES&query=${q}`
    const res = await axios.get(api)
    useBodega.resultadoBusqueda = res.data
   
    router.push({
        name: 'busqueda', params: {
            modo: m, query: q
        }
    })
}
onMounted(() => {
    input.value.focus()
})

</script>

<style scoped>

.input-buscar::placeholder{
    color: rgba(255, 255, 255, 0.589);
    font-size: .8em;
    letter-spacing: 2px;
}
.input-buscar{
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.932);
 }
 .btn-buscar{
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.932);
 }
input {
    border: none;
    border-radius: 0;
}
input:focus {
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(11, 132, 145, 0.6);
}

.drop-box{
    background-color: rgba(0, 0, 0, 0.932);
}

.item{
    cursor: pointer;
}

.formulario {
    position: relative;
}

.lupa {
    position: absolute;
    right: 15px;
    top: 15%;
    cursor: pointer;
    transition: .6s ease all;
    z-index: 100;
}
.lupa:hover {
transform: scale(.8);
}
.lupa:active {
    transform: scale(1.4);
}
.bi-search {
    font-size: 20px;

}

</style>