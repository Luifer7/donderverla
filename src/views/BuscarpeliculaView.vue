

<template>

      <div class="box-vista" >
     
            <!-- GENEROS -->
        <div class="d-flex flex-wrap gap-2 px-2 m-auto mt-3 mb-3 m-auto" >
            
            <button style="font-size: .8em;" 
            v-for="genero of generos"  :key="genero.id" 
            @click="obtenerPorGenero(genero)"
            class="text-center fw-bold p-2 rounded btn btn-sm btn-outline-info btnbtn" 
            :class="modGenero === genero.id ?'seleccionado' : ''"
            >{{ genero.name }} 
            <span v-if="modGenero === genero.id && spinnerButton" 
            class="spinner-border spinner-border-sm" 
            role="status" aria-hidden="true"></span>
            </button>
    
        </div>
    
        
        <ButtonsModalidad @change-mod="(p, m) => {
          getPeliculasModo(p, m), clear()
          }" 
          :modd="useBodega.peticion" >
        </ButtonsModalidad>
        

        <!--COMPONENTE PELICULAS POR GENERO-->
        <div class="w-100" >
          <Component :is="PeliculasPorGenero"
          :peliculas="peliculasGeneros?.results"
          :resultados="peliculasGeneros"
          :peticion="peliculasPeticionesGeneros"
          @pasar-pagina="(page) => 
            obtenerGeneroSiguientePagina( page, idGenero)"
          />
        </div>
        <!-- COMPONENTE PELICULAS POR GENERO -->

         <!-- COMPONENTE PELICULAS POR MODALIDADES -->
        <div class="w-100">
            <Component  :is="PeliculasPorModalidades"
            :peliculas="peliculasModo?.results"
            :resultados="peliculasModo"
            :peticion="peticion"
            @pasar-pagina="(n) => 
            getPeliculasModo( n, peticion)"
            />
        </div>
         <!-- COMPONENTE PELICULAS POR MODALIDADES -->


      </div>
          
</template>
    
<script setup>
import { defineAsyncComponent, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import ButtonsModalidad from "../components/ButtonsModalidad.vue";
import { usePeliculas } from "../funciones/peliculas";
import { useBodegaStore } from "../stores/bodega";
import { keyApi } from "../funciones/key";
    
const { getPeliculasModo, peticion, peliculasModo, generos } = usePeliculas()

const useBodega = useBodegaStore()

const PeliculasPorGenero = defineAsyncComponent(() => import('../components/PeliculasModalidad.vue'))
const PeliculasPorModalidades = defineAsyncComponent(() => import('../components/PeliculasModalidad.vue'))

const modGenero = ref('')
const idGenero = ref('')
const spinnerButton = ref(null)
const peliculasGeneros = ref([])
const peliculasPeticionesGeneros = ref('')

onMounted( async() => {
    getPeliculasModo(Math.floor(Math.random() * 30), 'popular')
})

const obtenerPorGenero = async (genero) => {
    spinnerButton.value = true
    modGenero.value = genero.id
    let api = `https://api.themoviedb.org/3/discover/movie${keyApi}&language=es-ES&with_genres=${genero.id}`
    const res = await axios.get(api)
    peliculasGeneros.value = res.data
    peliculasPeticionesGeneros.value = genero.name
    spinnerButton.value = false
    idGenero.value = genero.id
}
    
const obtenerGeneroSiguientePagina = async (page, id) => {
    let api = `https://api.themoviedb.org/3/discover/movie${keyApi}&language=es-ES&with_genres=${id}&page=${page}`
    const res = await axios.get(api)
    peliculasGeneros.value = res.data
}

const clear = () => {
    peliculasGeneros.value = []
    peliculasPeticionesGeneros.value = ''
    mod.value = ''
}



</script>



<style scoped>

.box-vista{
  min-height: 100vh;
}


/* CSS */
.button-30 {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

.genre:active{
    transform: scale(1.1);
}


.button-10 {
transition: .6s ease all;
display: flex;
gap: 3px;
align-items: center;
padding: 6px 14px;
font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
border-radius: 6px;
border: none;
  
color: #fff;
background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
background-origin: border-box;
box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-10:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}
.button-10:hover {
    transform: scale(.9);
}
.button-10:active {
    transform: scale(1.1);
}

.seleccionado{
    transition: .8s ease all;
    background: linear-gradient(109.6deg, rgb(11, 145, 122) 11.2%, rgb(11, 132, 145) 91.1%);
    color: white;
    border: none;
    letter-spacing: 1px;
}
.btnbtn{
  transition: .8s ease all;
}
.btnbtn:hover{
  border: none;
}



</style>