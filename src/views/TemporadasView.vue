

<template>


<div>
      <!-- Link BACK SIRVE PARA TOOOOODO -->
        <div class="w-100 text-center mb-3 mt-3" >
            <router-link class="text-decoration-none"  :to="{
            name: 'serie', params: { serie: route.params.current, id: route.params.currentId}}">

          <i class="bi bi-arrow-left-circle-fill text-white h2 m-auto text-decoration-none"> 
           <small class="m-2 text-info" > {{ route.params.current }}</small>
          </i>

        </router-link>
        
        </div>
    
        <div class="w-100 row m-auto">

        <div class="col-12 col-sm-8 mb-1" >
            <h4 class="text-info px-2 mb-2 m-0"> <i>{{ episodios?.name }}</i></h4>
            <p class="px-1 py-2 m-0 text-start text-white fw-bold" style="font-size: .9em;" >
                {{ episodios?.overview }}
            </p>
            <strong v-if="episodios.air_date" class="text-white px-1" >Emitida:
            <small class="text-info" >{{ episodios?.air_date?.slice(0, -6) }}</small>
            </strong> 
        </div>

        <div class="col-12 col-sm-4 col-md-4 p3-2">
            <img v-if="episodios?.poster_path" height="300" class="img-thumbnail w-100 rounded" 
            :src="`https://image.tmdb.org/t/p/w500${episodios?.poster_path}`" alt="">
        </div>
      
        </div>

        <div class="w-100 mt-5" >
            <h3 class="text-center m-0 text-white" ><i>Eposodios</i></h3>
            <EpisodiosComponent
        :episodios="episodios?.episodes"
        >
        </EpisodiosComponent>

        </div>
    
</div>



</template>

<script setup>
import EpisodiosComponent from "../components/EpisodiosComponent.vue";
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";
import { keyApi } from "../funciones/key";

const route = useRoute()

const episodios = ref({})

onMounted( async () => {
    
    let api = `https://api.themoviedb.org/3/tv/${route.params.currentId}/season/${route.params.numero}${keyApi}&language=es-ES` 
    const res = await axios.get(api)
    episodios.value = res.data
    console.log(episodios.value)
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