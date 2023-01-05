


<template>

 
    <div class="w-100" >

          <!-- Link BACK -->
          <div class="w-100 text-center mb-3" >
            <router-link class="text-decoration-none"  :to="{
            name: 'serie', params: { serie: route.params.current, id: route.params.currentId}}">

          <i class="bi bi-arrow-left-circle-fill text-white h2 m-auto text-decoration-none"> 
           <small class="m-2 text-info" > {{ route.params.current }}</small>
          </i>

        </router-link>
        
    </div>

        
          <!-- Imagen y sinopsis -->
          <div class="row p-2 m-auto" >
            
            <div class="col-12 col-sm-4 col-md-4 p-2" >
              <img  v-if="persona?.profile_path" height="300" class="rounded w-100 img-thumbnail" :src="`https://image.tmdb.org/t/p/w500/${persona?.profile_path}`" alt="imagen no disponible" >
            </div>

            <div class="col-12 col-sm-8 col-md-8 p-2" >
                <h4 class="m-0 text-white fw-bold">{{ persona.name }}</h4>
                <h5 class="m-0 text-white fw-bold" >Cumpleaños: {{persona.birthday}}</h5>
              <small class="text-white mt-4" >
              <i class="text-justify" >{{ persona?.biography }}</i>
            </small>
  
          </div>
          
          </div>


    </div>



</template>

<script setup >
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router"


const route = useRoute()
const persona = ref('')

onMounted(async() => {
    let person = `https://api.themoviedb.org/3/person/`
    let key = `?api_key=9f7031622a3c84ce82bbf384f262391a`
    let lenguage = `&language=es-MX`
    
    let api = `${person}${route.params.id}${key}${lenguage}`
    const res = await axios.get(api)
    persona.value = res.data

})

</script>

<style scoped>



</style>