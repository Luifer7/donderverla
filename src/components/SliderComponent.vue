


<template>

    
      <div class="w-100 mt-4 px-2 box-general-slider" >

         <h3 class="text-white px-2"> <i>{{nombre}}</i> </h3> 

        <swiper
        :slidesPerView="numeroSlides" :spaceBetween="10"
        :slidesPerGroup="numeroSlides" :loop="true"
        :loopFillGroupWithBlank="true"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        class="mySwiper">

            <swiper-slide v-for="titulo of titulos" :key="titulo.id" 
            style="cursor:pointer;"
            class="rounded box-slide" 
            @click="getTitle(titulo)" >

              <img :src="`https://image.tmdb.org/t/p/w500/${titulo?.poster_path}`" 
                   class="rounded img-slide" alt="">
                   
                   <span class="titulo text-white d-flex align-items-center justify-content-center flex-wrap">
                    {{titulo.title}} <i class="bi bi-star px-2 m-1 text-warning ">{{ titulo.vote_average }}</i>
                  </span>

                  <TituloFavorito
                  :titulo="titulo"
                  >
                  </TituloFavorito>

            </swiper-slide>
      
        </swiper>

      </div>
  

</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation,Pagination } from "swiper";
import { onMounted, onUnmounted, ref } from '@vue/runtime-core';
import TituloFavorito from "./users/TituloFavorito.vue";


export default {

  components: {
    Swiper,
    SwiperSlide,
    TituloFavorito
},
    props: {
    titulos: Object, nombre: String
  },
  setup( props, {emit} ) {

    const numeroSlides = ref(1)

    onMounted (() => {
      if (window.innerWidth <= 393) {
          numeroSlides.value = 1   
      }
      if (window.innerWidth >= 450) {
          numeroSlides.value = 2   
      }
      if (window.innerWidth >= 700 ) {
          numeroSlides.value = 3  
      }
      if (window.innerWidth >= 900){
          numeroSlides.value = 4  
      }
      if (window.innerWidth >= 1100){
          numeroSlides.value = 5  
      }
      window.addEventListener("resize", myEventHandler)
    })

    onUnmounted(() => {
      window.removeEventListener("resize", myEventHandler)
    })

    const myEventHandler = () => {
    
      if (window.innerWidth <= 393) {
          numeroSlides.value = 1   
      }
      if (window.innerWidth >= 450) {
          numeroSlides.value = 2   
      }
      if (window.innerWidth >= 700 ) {
          numeroSlides.value = 3  
      }
      if (window.innerWidth >= 900){
          numeroSlides.value = 4  
      }
      if (window.innerWidth >= 1100){
          numeroSlides.value = 5  
      }

    }
    
    //Emit del componente
    const getTitle = (titulo) => {
         emit('getTitle', titulo)
    }

    return {
      modules: [Pagination, Navigation], getTitle, numeroSlides
    }
  
  }

}
</script>



<style scoped>

/* stilos de la libreria */
.swiper {
  width: 100%;
  height: 90%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* stilos de la libreria */



.box-general-slider {
  height: 400px;
}

.img-slide{
  transition: .6s ease all;
}

.box-slide {
  transition: .6s ease all;
  position: relative;
}


.titulo {
  position: absolute;
  bottom: 0;
  font-weight: bold;
  width: 100%;
  height: 70px;
  font-size: .7em;
  word-break: break-all;
  background-color: rgba(0, 0, 0, 0.932);
}
.box-slide:hover {
  transform: scale(.9);
}
.box-slide:active {
  transform: scale(1.1);
}


</style>