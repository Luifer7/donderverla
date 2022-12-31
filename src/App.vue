


<script setup>
import { RouterLink, RouterView } from 'vue-router'




</script>

<template>
  
  <h1 class="text-center p-5 head">APLICACIÓN DE PELICULAS</h1>


  <router-view v-slot="{Component}" >
      <component :is="Component"></component>
  </router-view>
  

  <div class="w-100 p-5  text-center text-white" >
      <small>By: Luis Fernando Cordero Torres - Powered: VUE3</small>
  </div>
</template>

<style scoped>

.head{
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}



@media (min-width: 1024px) {
  

}

</style>
