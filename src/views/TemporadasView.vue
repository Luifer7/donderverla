

<template>


<div>
      <!-- Link BACK SIRVE PARA TOOOOODO -->
        <div class="w-100 text-center mb-3" >
            <router-link class="text-decoration-none"  :to="{
            name: 'serie', params: { serie: route.params.current, id: route.params.currentId}}">

          <i class="bi bi-arrow-left-circle-fill text-white h2 m-auto text-decoration-none"> 
           <small class="m-2 text-info" > {{ route.params.current }}</small>
          </i>

        </router-link>
        
        </div>
    
        <div class="w-100 row text-center">

        <div class="col-12 col-sm-6" >
            <h4 class="text-white px-2 mb-2 m-0"> <i>{{ episodios?.name }}</i> 
            <small v-if="episodios.air_date" class="text-info m-2" >- {{ episodios?.air_date?.slice(0, -6) }}</small> </h4>
            <p class="px-4 py-2 m-0 text-start text-dark fw-bold" style="font-size: .9em;" >
                {{ episodios?.overview }}
            </p>
        </div>

        <div class="col-12 col-sm-6">
            <img v-if="episodios?.poster_path" class="img-thumbnail img-season" 
            :src="`https://image.tmdb.org/t/p/w500${episodios?.poster_path}`" alt="">
        </div>
      
        </div>

        <div class="w-100 mt-3 row m-auto" >
        <h3 class="text-center mt-2 text-white fw-bold mb-3">Episodios</h3>
        
        <div class="col-12 col-sm-6 col-lg-4  box-episodio"
             v-for="epi of episodios?.episodes" :key="epi.id" >

           <div style="height: 160px; width: 100%;" >
            <img v-if="epi?.still_path" class="img-thumbnail" style="width: 100%; height: 100%;"
                 :src="`https://image.tmdb.org/t/p/w500${epi?.still_path}`" alt="">
           </div>

           <div class="box-text" style="height: 50px;">
            <strong class="m-0 px-2" > #{{ epi.episode_number }} {{ epi.name }} - {{ epi.runtime }}Min</strong>
            <b style="font-size: 1em;" class="text-info" >{{ epi.vote_average }}</b>
            </div>

            <div style="height: 100px; overflow-y: auto;" class="p-1 box-text" >
                <p class="text-white px-2" style="word-break:break-all; font-size: .8em;" >
                 <i>{{ epi.overview }}</i> 
                </p>
            </div>
           
        
        </div>
        
        </div>

</div>



</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute()

const episodios = ref({})

onMounted( async () => {
    
    let api = `https://api.themoviedb.org/3/tv/${route.params.currentId}/season/${route.params.numero}?api_key=9f7031622a3c84ce82bbf384f262391a&language=es-ES` 
    const res = await axios.get(api)
    episodios.value = res.data
    //console.log(episodios.value)
})

</script>

<style scoped>

.img-season{
    height: 380px;
}

.box-episodio{
    height: 330px;
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