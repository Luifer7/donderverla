

<template>

    <h3 class="text-center text-white" ><i>Reparto</i></h3>
    
      <div class="text-white d-flex gap-2 box-imagenes p-1">
         
          <div v-for="re of reparto" :key="re.id"  @click="getPersona(re)"
               class=" d-flex flex-column align-items-center justify-content-end rounded  
               character" 
               :style=" re.profile_path ?
                 {'background-image':`url(https://image.tmdb.org/t/p/w500/${re?.profile_path})`}
                 :''" 
               >
                
               <div class="w-100 text-white" >
                    <h6 class="text-center fw-bold m-0 p-2" > {{ re?.name }} <br>
                    <small class="text-center" 
                     style="font-size: .6em;">{{re?.character}}</small>
                    </h6>
                </div>
          </div>

      </div>

</template>

<script setup >
import { ref } from "@vue/reactivity"
import axios from "axios"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

defineProps({
  reparto: Object
})

const getPersona =  (serie) => {
  router.push( { name: 'personserie', params: { current: route.params.serie, currentId: route.params.id, person: serie.name, id: serie.id} 
      } )
}


</script>

<style scoped>
   .box-imagenes {
        overflow: auto;
        height: 230px;
    }

    .character {
        cursor: pointer;
        transition: .6s ease all;
        border: 3px solid rgb(255, 255, 255);
        height: 190px;
        min-width: 160px;
        background-size: cover;
        background-position: center;
        position: relative;
    }
    .character::before   {
        content: "";
        color: rgb(255, 255, 255);
        position: absolute;
        text-align: center;
        bottom: 10px;
        height: 0;
        width: 100%;
        transition: .6s ease all;
        opacity: 0;
    }
    .character:hover::before   {
        position: absolute;
        text-align: center;
        opacity: 100;
        bottom: 0;
        height: 70px;
        background-color: rgba(0, 0, 0, 0.897);
        z-index: -2;
    }

    .character:hover{
        transform: scale(.9);
    } 
    .character:active {
        transform: scale(1.1);
    }
    .box-imagenes::-webkit-scrollbar {
    height: 13px;
    }

    .box-imagenes::-webkit-scrollbar-track {
    background-color:  rgba(102, 51, 153, 0.082);
    border-radius: 6px;
    }

    .box-imagenes::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgb(61, 134, 216);
    border-radius: 10px;
    }


</style>