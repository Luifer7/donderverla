
<template>

    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
    >
        <swiper-slide v-for="e of episodios" :key="e.id" :sinopsis="e.overview" class="box-episode" >

            <img :src="`https://image.tmdb.org/t/p/w500${e?.still_path}`" class="img-thumbnail" />

            <div class="px-1 mt-1 d-flex flex-column flex-wrap gap-1 box-epi px-2 py-1 rounded" style="font-size: .8em;" >
                <strong class="text-info" ><i>{{ e.name }}</i></strong>
                <strong class="text-success d-flex align-items-center gap-1" >Episodio {{ e.episode_number }}</strong>    
                <i class="bi bi-stopwatch text-primary fw-bold d-flex align-items-center gap-1"> {{ e.runtime }}Min</i>
                <i class="bi bi-star  text-warning fw-bold d-flex align-items-center gap-1"> {{ e.vote_average }}</i>
            </div>
            
         <!--    <textarea type="text" :value="e.overview" style="width: 100%; height: 90px;" readonly 
            class="rounded bg-transparent text-area box-text"></textarea> -->

        </swiper-slide>
        
    </swiper>
  
  </template>
  
  <script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/css"
  import "swiper/css/effect-coverflow";
  import "swiper/css/pagination";
  
  
  // import required modules
  import { EffectCoverflow, Pagination } from "swiper";
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    props: {
        episodios: Object
    },
    setup() {
      return {
        modules: [EffectCoverflow, Pagination],
      };
    },
  };
  </script>

  <style scoped>
  
  
.swiper {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

.box-epi {
    background-color: rgba(0, 0, 0, 0.911);
}

.box-episode{
    position: relative;
}

.box-episode::before {
    content: attr(sinopsis);
    position: absolute;
    color: white;
    width: 100%;
    height: 0;
    background-color: rgba(0, 0, 0, 0.959);
    opacity: 0;
    transition: .6s ease all;
    padding: 10px;
    font-weight: bold;
    font-size: .9em;
    border-radius: 8px;
}

.box-episode:hover::before {
    opacity: 1;
    height: 91%;
}



.text-area {
    border: none;
    outline: none;
    word-break: break-all;
    color: white;
    line-height: 16px;
    text-align: justify;
    font-size: .8em;
    padding-right: 7px;
    overflow: auto;
}

.box-text::-webkit-scrollbar {
    width: 10px;
    }

    .box-text::-webkit-scrollbar-track {
    background-color:  rgba(102, 51, 153, 0.082);
    border-radius: 10px;
    }

    .box-text::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(102, 51, 153, 0.705);
    border-radius: 10px;
    }

  </style>