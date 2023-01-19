

<template>

    <div class="w-100 mt-3 p-3 d-flex flex-column py-5">
            
       <div class="text-white py-3 px-2 " >
        
       <h4 class="text-warning fw-bold" >Titulos favoritos <strong class="text-info" >(Sección en desarrollo)</strong></h4>
        
        <div class="w-100 py-4">
            <ul class="list-group py-3 list-unstyled" >
                <li v-for="gg of useBodega.favoritos" :key="gg.id" class="list-item my-1" >
                    {{ gg.titulo }}
                </li>
            </ul>
        </div>
        
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