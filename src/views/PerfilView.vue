

<template>

    <div class="w-100 mt-3 p-3 d-flex flex-column py-3">
         
        <div class="py-1 px-2 text-center d-flex align-items-center row" >
            
           <div class="d-flex  col-12 col-sm-6" >
            <img :src="useBodega.currentUser.photoURL" 
                 class="rounded-circle"
                 style="object-fit:cover;"
                 alt=""
                 width="45" height="45"
                 >
                 <div class="text-white mx-1 text-capitalize d-flex flex-column" >
                    <strong class="text-info text-start" > {{useBodega.currentUser.displayName}}</strong>
                    <small class="text-white" >{{ useBodega.currentUser.email }}</small>
                </div>
           </div>

           
            <div class="text-white col-12 col-sm-6 text-start mx-1 mt-2" style="font-size:.8em;" >
                    <i>Miembro desde: {{getDate(useBodega.currentUser?.metadata?.createdAt)}}</i>
            </div>
           

        </div>

       <div class="text-white py-3 mt-3 px-2" >
        
       <h4 class="text-warning fw-bold">
        Mi Lista 
        <i class="bi bi-star-fill"></i>
        </h4>
        
        <div class="w-100 py-2">
            <ul class="list-group py-3 list-unstyled" >

                <li v-for="favorito of useBodega.favoritos" :key="favorito.id" 
                    class="list-item my-1 py-4 titulo-favorito rounded" 
                    :style="bgImage(favorito?.imagen)" style="object-fit: cover;"
                    @click="getTitulo(favorito)">
                    
                    <img class="rounded-circle mx-2" 
                    width="70" height="70" 
                    v-if="favorito?.imagen" 
                    style="object-fit: cover; border: 4px solid royalblue;"
                    :src="`https://image.tmdb.org/t/p/w500/${favorito?.imagen}`"
                    alt="imagen no disponible" >

                    <h2 class="mb-1 fw-bold m-0 text-white"
                    style="text-shadow: 5px 2px 3px #000000;"
                    >{{ favorito.titulo }}</h2>
                    
                </li>

            </ul>
        </div>
        
       </div>

    </div>
  

</template>

<script setup >

import { useRoute, useRouter } from "vue-router";
import { useBodegaStore } from "../stores/bodega";
import format from 'date-fns/format'

const route = useRoute()
const router = useRouter()

const useBodega = useBodegaStore()

 const bgImage = (imagen) => {
    return `background-image: url("https://image.tmdb.org/t/p/w500/${imagen}")`
 }

 const getDate = (date) => {
    if (date) {
    const createdAt = format(parseInt(date), 'dd/MM/yyyy')
    return createdAt 
    }
 }

 const getTitulo = (favorito) => {
    
    router.push({
        name: 'titulo', params: {
            titulo: favorito.titulo, modo: 'movie', id: favorito.id
        }
    })
 
}



</script>

<style scoped >

.titulo-favorito{
    display: flex;
    align-items: center;
    transition: .9s ease all;
    cursor: pointer;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

.titulo-favorito:hover{
    transform: scale(.9);
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
}
.titulo-favorito:active{
    transform: scale(1.1);
}

</style>