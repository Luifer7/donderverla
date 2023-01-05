

<template>

    <h4 class="text-center text-white" ><i>Reparto</i></h4>
    
      <div class="text-white d-flex gap-2 box-imagenes p-1"
      style="height: 200px;">
         
          <div v-for="re of reparto" :key="re.id"  @click="getPersona(re)"
               class="p-2 d-flex flex-column align-items-center justify-content-evenly rounded character" 
               style="min-width: 150px;" >
             <h6 class="text-center m-0" > {{ re.name }}</h6>
             <small class="text-center" style="font-size: .6em;">{{re.character}}</small>
             <img v-if="re?.profile_path" :src="`https://image.tmdb.org/t/p/w500/${re?.profile_path}`" 
                  width="80"  height="80" class="rounded-circle img-border" alt="no disponible" 
                  style="object-fit: cover;">
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
      max-height: 300px;
  }



  .img-border{
      border: 3px solid white;
  }

  .character {
      cursor: pointer;
      transition: .6s ease all;
  }
  .character:hover{
      background-color: rgba(0, 0, 0, 0.199);
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
    background-color: rgba(102, 51, 153, 0.534);
    border-radius: 10px;
    }


</style>