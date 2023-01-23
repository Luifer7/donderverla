



<template>

    <div class="favorito">
        <div v-for="gg of useBodega.favoritos" :key="gg.id" >
        <i :class="gg.tituloId == titulo.id 
           ?'bi bi-bookmark-star-fill text-warning h1 m-0'
           :'d-none'"></i>
        </div>
    
      </div>
    
      

</template>

<script setup>
import { useBodegaStore } from "../../stores/bodega"

const useBodega = useBodegaStore()

defineProps({
  titulo: Object
})


</script>

<style scoped >

.favorito {
  position: absolute;
  top: 0; left: 0;
  z-index: 100;
}

.select {
  top: 15px; left: 0;
  color: blue;
}

</style>