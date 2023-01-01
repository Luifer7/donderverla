


<template>


    <div class="w-100 p-3" >

        <h3 class="text-center text-white m-2 p-2" ><i>Tú decides que quieres buscar</i></h3>
        <div class="w-90 m-auto p-2 d-flex align-items-center justify-content-center gap-3" >
            <button class="button-30" role="button">
                <router-link to="/buscarseries" class="text-decoration-none" >Series</router-link>
            </button>
            <button class="button-30" role="button">
                <router-link to="/buscarpeliculas" class="text-decoration-none" >Peliculas</router-link>
            </button>
        </div>
       
    </div>

    <ButtonsModalidad @change-mod="(p, m) => getPopular(p, m)" :modd="useBodega.peticion" ></ButtonsModalidad>
 
    <div class="w-100">
                              
        <PeliculasModalidad 
        :peliculas="useBodega.peliculasPopulares?.results"
        :resultados="useBodega.peliculasPopulares"
        :peticion="useBodega.peticion"
        @pasar-pagina="(n) => 
        getPopular( useBodega.peliculasPopulares?.page == 1 ? useBodega.peliculasPopulares?.page - n
        : useBodega.peliculasPopulares?.page + n, useBodega.peticion)">
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


</style>