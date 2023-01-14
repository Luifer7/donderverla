


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BusquedaComponent from './components/BusquedaComponent.vue';

</script>


<template>


  <div class="w-100 banner d-flex flex-column justify-content-between">

    <div class="d-flex align-items-center justify-content-between mt-4" >

        <div class="mx-3 mt-4 d-flex align-items-center justify-content-center donde" >
          <router-link to="/" class="text-decoration-none v" >
            <h3 class="m-0  text-center" ><i>DONDEVERLA</i></h3>
          </router-link>
        </div>

        <i class="bi bi-menu-button-wide-fill mx-3 text-white  m-0 bg-dark border px-2 py-1 rounded"
        data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" 
        aria-controls="offcanvasTop" style="cursor:pointer;" >
        <strong> Menu</strong>
        </i>

        <!-- canvas -->
        <div class="offcanvas offcanvas-top canvas-menu" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
          <div class="offcanvas-header text-white">
            <h5 id="offcanvasTopLabel" class="text-white fw-bold" >MENU</h5>
            <button type="button" class="btn-close text-reset" 
            data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body d-flex align-items-center justify-content-evenly">

                <router-link to="/buscarseries" class="text-decoration-none h5 link" >
                    SERIES
                </router-link>

                <router-link to="/buscarpelicula" class="text-decoration-none h5 link" >
                    PELICULAS
                </router-link>

          </div>
        </div>

    </div>

    <BusquedaComponent></BusquedaComponent>

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
  height: 130px;
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

.canvas-menu{
  background-color: rgba(7, 7, 7, 0.986);
}

.link{
  transition: .6s ease all;
  color: beige;
  position: relative;
}

.link::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 90%;
  left: -10px;
  background-color: yellow;
  border-radius: 10px;
  transition: .4s ease-in all;
}

.link:hover::before {
  height: 10%;
  left: 0;
  bottom: 0;
  width: 100%;
}





@media (min-width: 1024px) {
  

}

</style>
