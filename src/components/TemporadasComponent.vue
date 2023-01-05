

<template>
    
    <h4 class="text-center text-white fw-bold">Temporadas</h4>
            <div class="w-100 p-2 d-flex gap-3 align-items-center box-temp mb-4" >

                <div v-for="s of temporadas" :key="s.id" class="box-season p-2 text-center" 
                @click="getSeason(s)">

                  <strong style="font-size: .8em;" 
                  class="m-auto text-center text-white m-1">T-{{s.season_number}} 
                  <small class="text-info fw-bold" ><i>- {{ s?.air_date?.slice(0, -6) }}</i></small> </strong>
                  
                  <img  class="img-season" v-if="s?.poster_path"
                       :src="`https://image.tmdb.org/t/p/w500/${s?.poster_path}`" alt="">
                </div>
                
            </div>

    
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

defineProps({
    temporadas: Object
})


const getSeason = (s) => {
    router.push({
        name: 'temporada', 
        params: {
            current: route.params.serie, currentId: route.params.id, numero: s.season_number,
        }
    }) 
}

</script>

<style scoped>


    .box-temp{
      overflow: auto;
    }

    .box-season{
      width: 140px;
      min-width: 110px;
      cursor: pointer;
      transition: .6s ease all;
    }

    .box-season:hover{
        transform: scale(.9);
    } 
    .box-season:active {
        transform: scale(1.1);
    }

    .img-season{
      width: 100%;
      height: 100%;
      border: 3px solid white; border-radius: 10px;
      object-fit: contain;
    }

    .box-temp::-webkit-scrollbar {
    height: 13px;
    }

    .box-temp::-webkit-scrollbar-track {
    background-color:  rgba(102, 51, 153, 0.082);
    border-radius: 6px;
    }

    .box-temp::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(102, 51, 153, 0.534);
    border-radius: 10px;
    }

</style>