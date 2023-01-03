


<script setup>
import { RouterLink, RouterView } from 'vue-router'




</script>


<template>
  
  <div class="text-center banner p-5 mb-3">
    <h1 class="text-white" ><i>¿DONDE VERLA?</i></h1>
  </div>


  <router-view v-slot="{Component}" >
      <component :is="Component"></component>
  </router-view>
  

  <div class="w-100 p-5  text-center text-white" >
      <small>By: Luis Fernando Cordero Torres - Powered: VUE3</small>
  </div>

</template>

<style scoped>



.banner {
  background-image: url(../src/assets/img/banner.jpg);
  background-size: cover;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}


@media (min-width: 1024px) {
  

}

</style>
