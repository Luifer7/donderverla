

<template>

     
<div class="px-3 text-center" >

     <!-- CONTROLES -->
        <div class="w-100 d-flex align-items-center justify-content-between gap-3 m-1" >
            
            <h6 class="m-0 text-white"> <i>{{ peticion }}</i> </h6>
            
            <div class="d-flex align-items-center justify-content-center gap-3 m-1" >
                
                <i v-if="resultados?.page != 1" @click="pasarpage(-1, resultados?.page)" class="bi bi-arrow-left-circle-fill text-white h4 m-0"></i>
            
                <h5 class="text-white m-0">{{ resultados?.page }}</h5>
            
                <i v-if="resultados?.page != resultados?.total_pages" @click="pasarpage(1, resultados?.page)" class="bi bi-arrow-right-circle-fill text-white h4 m-0"></i>
            
            </div>

            <h6 class="m-0 text-white" > <i>Paginas: {{ resultados?.total_pages }}</i> </h6>
        
        </div>

        <!-- CONTENIDO -->
        <div class="row" >

            <div style="height: 300px;" class="col-6 col-sm-4 col-md-3 col-xl-2 p-2" 
                v-for="p of peliculas" :key="p.id" @click="detalles(p)" >
                
                <div class="h-100 w-100 rounded box-pelicula"  >

                    <div style="height: 240px;" class="mw-100" >
                        <img v-if="p?.poster_path" :src="`https://image.tmdb.org/t/p/w500/${p?.poster_path}`" 
                            class="w-100 h-100 img-thumbnail" style="object-fit: cover;" alt="no disponible">
                    </div>
                
                    <div style="height:40px;" 
                    class="m-0 text-white d-flex align-items-center justify-content-center"> 
                        <i style="font-size: .7em; word-break: break-all;" class="fw-bold"  >{{ p.title }}</i>
                    </div>

                    <TituloFavorito
                    :titulo="p"
                    ></TituloFavorito>

        
                </div>
            
            </div>
            
        </div>  

</div>
    

</template>

<script setup >
import { useRouter } from "vue-router"
import TituloFavorito from "./users/TituloFavorito.vue";

const router = useRouter()

defineProps({
    peliculas: Object, peticion: String, resultados: Object
})
const emit = defineEmits(['pasarPage', 'pasarDos'])

const pasarpage = (n, r) => {

    emit('pasarPage', r+n)
}

const detalles = (p) => {
    emit('pasarDos', p)
}

</script>

<style scoped>


.box-pelicula{
    cursor: pointer;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    transition: .6s ease all;
    position: relative;
}
.box-pelicula:hover{
    transform: scale(.9);
}

.box-pelicula:active{
    transform: scale(1.1);
}

.bi {
    cursor: pointer;
}



</style>