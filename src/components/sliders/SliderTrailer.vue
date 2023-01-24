



<template>

    
    <div class="w-100 mt-4 mb-5 px-2 box-general-slider" >

        
        <swiper
        :slidesPerView="1" :spaceBetween="8"
        :slidesPerGroup="1" :loop="true"
        :loopFillGroupWithBlank="true"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        class="mySwiper">

            <swiper-slide v-for="trailer of trailersEsp" :key="trailer.id" 
            class="px-2"
            >
           
                <iframe class="trailer-es rounded img-thumbnail" 
                      :src="`https://www.youtube.com/embed/${trailer.key}`" 
                      title="YouTube video player" frameborder="0"
                      autoplay clipboard-write encrypted-media SameSite=None
                      gyroscope picture-in-picture
                      allowfullscreen>
                </iframe>
     

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

export default {

  components: {
    Swiper,
    SwiperSlide,
  },
    props: {
    trailersEsp: Object
  },
  setup() {

    return {
      modules: [Pagination, Navigation]
    }
  
  }

}
</script>



<style scoped>

.trailer-es{
  width: 100%;
  height: 400px;
}

@media (max-width: 575px) {
  .trailer-es{
  height: 250px;
  }

}


</style>