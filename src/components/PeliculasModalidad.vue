

<template>
    
    
    <div class="container text-center" >

        <!-- CONTROLES -->
        <div class="w-100 d-flex align-items-center justify-content-between gap-3 m-1" >
            
            <h6 class="m-0 text-white"> <i>{{ peticion }}</i> </h6>
            
            <div class="d-flex align-items-center justify-content-center gap-3 m-1" >
                
                <i @click="pasarpagina(-1)" class="bi bi-arrow-left-circle-fill text-white h4 m-0"></i>
            
                <h6 class="text-white m-0">{{ resultados?.page }}</h6>
            
                <i @click="pasarpagina(1)" class="bi bi-arrow-right-circle-fill text-white h4 m-0"></i>
            
            </div>

            <h6 class="m-0 text-white" > <i># {{ resultados?.total_pages }}</i> </h6>
        
        </div>

        <!-- CONTENIDO -->
        <div class="row" >

            <div style="height: 260px;" class="col-6 col-sm-4 col-md-3 col-xl-2 p-2" 
                 v-for="p of peliculas" :key="p.id" @click="detalles(p)" >
                
                <div class="h-100 w-100 rounded box-pelicula"  >

                    <div v-if="p?.poster_path" style="height: 200px;" class="mw-100" >
                        <img :src="`https://image.tmdb.org/t/p/w500/${p?.poster_path}`" 
                              class="w-100 h-100" style="object-fit: cover;" alt="no disponible">
                    </div>
                  
                    <div style="height:40px;" 
                    class="m-0 text-white d-flex align-items-center justify-content-center"> 
                        <i style="font-size: .7em; word-break: break-all;" class="fw-bold"  >{{ p.title }}</i>
                    </div>
                
                </div>
            
            </div>
            
        </div>  
    
    </div>

</template>

<script setup >
import { useRouter } from "vue-router"

const router = useRouter()

defineProps({
    peliculas: Object, resultados: Object, peticion: String
})
const emit = defineEmits(['pasarPagina'])

const pasarpagina = (n) => {
    emit('pasarPagina', n)
}

const detalles = (p) => {
    router.push( { name: 'pelicula', params: { pelicula: p.title, id: p.id } } ) 
}

</script>


<style scoped>

.box-pelicula{
    cursor: pointer;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    transition: .6s ease all;
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