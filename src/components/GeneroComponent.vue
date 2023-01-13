

<template>
    
              <div class="mt-2  mb-2 text-white d-flex gap-3 justify-content-start align-items-start flex-wrap" >
                <strong class="m-0 fw-bold genero" v-for="g of generos" :key="g.id" 
                @click="getForGenre(g)"
                >
                {{g.name}}
                </strong>
              </div>


</template>

<script setup >
import { useRoute, useRouter } from "vue-router"


defineProps({
    generos: Object
})

const route = useRoute()
const router = useRouter()

const getForGenre = (g) => {
    router.push( 
        { name: 'genero', 
          params: { 
            current: route.params.pelicula || route.params.serie || route.params.titulo, 
            currentId: route.params.id, 
            genero: g.name,
            id: g.id} 
        } ) 
}

</script>


<style scoped>

.genero {
    transition: .6s ease all;
    cursor: pointer;
    color: #0dcaf0;
}
.genero:hover {
    color: white;
    text-decoration:underline 2px  #0dcaf0;
}

</style>