


<script setup>
import { RouterLink, RouterView } from 'vue-router'




</script>


<template>
  
  <div class="text-center w-100 banner mb-3 row m-auto ">

      <div class="col-12 col-sm-4  d-flex align-items-center justify-content-center" >
        <i class="bi bi-house-heart text-white"> Mi espacio</i>
      </div>
      
      <div class="col-12 col-sm-4  d-flex align-items-center justify-content-center donde" >

        <router-link to="/" class="text-decoration-none v" >
          <h3 class="m-0  text-center" ><i>¿DÓNDE VERLA?</i></h3>
      </router-link>
      
      </div>
    
     
       <div class="col-12 col-sm-4 d-flex align-items-center justify-content-center" >
        <router-link to="/sobrenosotros" class="text-white fw-bold text-decoration-none" >
          <i class="bi bi-info-circle">
            Sobre nosotros
          </i>
      </router-link>
      </div>
    
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

@import url('https://fonts.googleapis.com/css2?family=Rubik+Spray+Paint&display=swap');

.banner {
  background-image: url(https://firebasestorage.googleapis.com/v0/b/dondeverla.appspot.com/o/ggghh.jpg?alt=media&token=cb4bf01a-a07e-4e95-8d19-27fed98e57e5);
  background-size: cover;
  background-position: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 200px;
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

.donde .v{
  font-weight: 600;
  background-image: linear-gradient(109.6deg, rgb(255, 252, 252) 11.2%, rgb(11, 132, 145) 91.1%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  font-family: 'Rubik Spray Paint', cursive;
  text-shadow: rgba(255, 255, 255, 0.849) 3px -24px 2px;
}


@media (min-width: 1024px) {
  

}

</style>
