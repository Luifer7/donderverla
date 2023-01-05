


<script setup>
import { RouterLink, RouterView } from 'vue-router'




</script>


<template>
  
  <div class="text-center w-100 banner p-5 mb-3 d-flex flex-wrap gap-2 align-items-center justify-content-between">

    <h3 class="text-white text-center m-auto">Mi espacio</h3>
   
    <h1 class="m-0 text-white text-center m-auto" ><i>¿DONDE VERLA?</i></h1>

    <router-link to="/sobrenosotros" class="m-auto" >
      <h4 class="m-0" >Sobre nosotros</h4>
    </router-link>

  </div>


  <router-view v-slot="{Component}" >
    <transition name="vistas" mode="out-in" >
              <component :is="Component" />
    </transition>
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

.vistas-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.vistas-enter-active {
  transition: all 0.2s ease-out;
}

.vistas-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.vistas-leave-active {
  transition: all 0.2s ease-in;
}


@media (min-width: 1024px) {
  

}

</style>
