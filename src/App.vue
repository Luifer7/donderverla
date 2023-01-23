


<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import BusquedaComponent from './components/BusquedaComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import LoginComponent from './components/register/LoginComponent.vue';
import { useAuth } from './funciones/Auth';
import { useFavoritos } from './funciones/Favoritos';
import { useBodegaStore } from './stores/bodega';


const { logout } = useAuth()
const { getFav } = useFavoritos()
const route = useRoute()
const useBodega = useBodegaStore()

</script>


<template>

    <!-- HEADER -->
    <div class="w-100 banner d-flex flex-column justify-content-between">

      <div class="bgbg kenburns-right" ></div>

      <div class="d-flex align-items-center justify-content-between mt-4 t" >

          <div class="mx-3 mt-4 d-flex align-items-center justify-content-center donde" >
            <router-link to="/" class="text-decoration-none v" >
              <h3 class="m-0  text-center tracking-in-expand" ><i>DONDEVERLA</i></h3>
            </router-link>
          </div>

          <i class="bi bi-menu-button-wide-fill mx-3 text-white menu m-0 px-2 py-1 fw-bold rounded"
          data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" 
          aria-controls="offcanvasTop" style="cursor:pointer;" >
          Menu
          </i>

          <!-- canvas -->
          <div class="offcanvas offcanvas-top canvas-menu" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header text-white">
              <h4 id="offcanvasTopLabel"  class="text-white fw-bold" >MENU</h4>

              <i data-bs-dismiss="offcanvas" aria-label="Close"
               class="bi bi-x h2 fw-bold m-0 text-danger close" ></i>

              <i class="fw-bold text-danger close"
               @click="logout()" >cerrar sesion</i>

            </div>

            <div class="offcanvas-body d-flex align-items-center justify-content-evenly">

                  <router-link to="/buscarseries" class="text-decoration-none h5 link" >
                      Series
                  </router-link>

                  <router-link to="/buscarpelicula" class="text-decoration-none h5 link" >
                      Peliculas
                  </router-link>

                  <router-link :to="{
                  name: 'perfil', 
                  params: { user: useBodega.currentUser?.displayName || 'user', 
                  id: useBodega.currentUser?.uid || 'null'}}"
                  v-show="useBodega.isLogin"
                  class="text-decoration-none text-capitalize h5 link" >
                      {{ useBodega.currentUser?.displayName }}
                  </router-link>

                  <router-link to="/login"
                  v-show="!useBodega.isLogin"
                  class="text-decoration-none text-capitalize h5 link" >
                     Login
                  </router-link>

            </div>

          </div>

      </div>

    </div>
    <!-- HEADER -->

    <!-- BUSQUEDA COMPONENTE -->
    <BusquedaComponent class="busqueda" ></BusquedaComponent>

    <!-- VISTAS -->
    <router-view v-slot="{Component}" >
      <transition name="vistas" mode="out-in" >
              <component :is="Component" />
      </transition>
    </router-view>
  

    <LoginComponent v-if="useBodega.isLogin === false" ></LoginComponent>

    <div class="w-100 mt-5" >
        <FooterComponent></FooterComponent>
    </div>

</template>



<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Rubik+Spray+Paint&display=swap');

.close {
  cursor: pointer;
  transition: .6s ease all;
}

.close:hover{
  transform: scale(.9);
}
.close:active {
  transform: scale(1.2);
}
.banner {
  background-size: cover;
  background-position: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 150px;
  position: relative;
  overflow: auto;
}

.banner::-webkit-scrollbar {
        display: none;
    }

    .banner::-webkit-scrollbar-track {
        display: none;
    }

    .banner::-webkit-scrollbar-thumb {
        display: none;
    }

.t{
  z-index: 1;
}

.busqueda{
  position: absolute;
  top: 110px;
  margin-bottom: 0;
}

.bgbg {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/dondeverla.appspot.com/o/ggghh.jpg?alt=media&token=cb4bf01a-a07e-4e95-8d19-27fed98e57e5);
    background-size: cover;
    background-position: center;
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
  transition: .6s ease all;
}

.donde:hover .v {
  transform: scale(.9);
}

.donde:active .v {
  transform: scale(1.1);
}

.menu {
  background: transparent;
  border: 1px solid rgba(245, 245, 245, 0.596);
  transition: .5s ease all;
  background-color: black;

}

.menu:hover {
  border: 1px solid transparent;
  background-color: transparent;
  transform: scale(.9);
}
.menu:active {
  background-color: transparent;
  transform: scale(1.1);
}


.canvas-menu{
  background-color: rgba(7, 7, 7, 0.986);
}

.link{
  transition: .3s ease all;
  color: beige;
  position: relative;
}

.link::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 90%;
  bottom: 0;
  left: -10px;
  background-color: rgb(241, 241, 13);
  border-radius: 10px;
  transition: .3s ease-in all;
}

.link:hover::before {
  height: 12%;
  left: 0;
  bottom: -2px;
  width: 100%;
}

.router-link-active::before {
    transition: .3s ease all;
    position: absolute;
    content: '';
    height: 12%;
    left: 0;
    bottom: -2px;
    width: 100%;
}


.tracking-in-expand:active {
	-webkit-animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
	        animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}


 @-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}


.kenburns-right {
	-webkit-animation: kenburns-right 7s ease-out both;
	        animation: kenburns-right 7s ease-in-out alternate-reverse both infinite;
}


 @-webkit-keyframes kenburns-right {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
            transform: scale(1) translate(0, 0);
    -webkit-transform-origin: 84% 50%;
            transform-origin: 84% 50%;
  }
  100% {
    -webkit-transform: scale(1.25) translateX(20px);
            transform: scale(1.25) translateX(20px);
    -webkit-transform-origin: right;
            transform-origin: right;
  }
}
@keyframes kenburns-right {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
            transform: scale(1) translate(0, 0);
    -webkit-transform-origin: 84% 50%;
            transform-origin: 84% 50%;
  }
  100% {
    -webkit-transform: scale(1.25) translateX(20px);
            transform: scale(1.25) translateX(20px);
    -webkit-transform-origin: right;
            transform-origin: right;
  }
}




</style>
