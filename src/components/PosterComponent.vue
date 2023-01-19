

<template>
  
            <div class="col-12 col-sm-4 col-md-4 p-2">
              <img  v-if="imagen" height="300" 
              class="rounded w-100 img-thumbnail" 
              :src="`https://image.tmdb.org/t/p/w500/${imagen}`" 
              alt="imagen no disponible">

            </div>

</template>

<script setup >



defineProps({
    imagen: String
})

</script>

<style scoped> 

</style>