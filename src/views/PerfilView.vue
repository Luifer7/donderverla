

<template>

    <div class="w-100 mt-3 p-3 d-flex flex-column">
            
       <h3 class="text-white fw-bold px-2" >PERFIL en desarrollo</h3>

       <div class="text-white py-4 px-2 " >
        
       <h4 class="text-warning fw-bold" >Titulos favoritos</h4>
        {{ useBodega.favoritos }}
       </div>

    </div>
  

</template>

<script setup >
import { useRoute } from "vue-router";
import { useBodegaStore } from "../stores/bodega";

const route = useRoute()
const useBodega = useBodegaStore()
 
</script>

<style scoped >

</style>