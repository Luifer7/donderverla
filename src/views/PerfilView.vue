

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

        <div  class="text-center" v-if="!spinner" >
            <SpinnerComponent></SpinnerComponent>
        </div>

            <div class="w-100 py-2">
                <ul class="list-group py-3 list-unstyled" >

                    <li v-for="favorito of useBodega.favoritos" :key="favorito.id" 
                        class="list-item my-1 py-4 titulo-favorito rounded" 
                        :style="bgImage(favorito?.imagen)" style="object-fit: cover;"
                    >
                        
                        <img class="rounded-circle mx-2" 
                        width="70" height="70" 
                        v-if="favorito?.imagen" 
                        style="object-fit: cover; border: 4px solid royalblue;"
                        :src="`https://image.tmdb.org/t/p/w500/${favorito?.imagen}`"
                        alt="imagen no disponible">

                        <h3 class="mb-1 fw-bold m-0 px-2 text-white"
                        style="text-shadow: 5px 2px 3px #000000;"
                        >{{ favorito.titulo }}</h3>
                          
                        <div @click="getTitulo(favorito)" 
                        class="fw-bold btn-see-more d-flex
                        align-items-center justify-content-center">

                        <i class="bi bi-three-dots h1 m-0 text-white fw-bold"></i>
                        </div>

                        <div @click="deleteFav(favorito.id)" 
                            class="fw-bold btn-delete d-flex 
                            align-items-center justify-content-center">

                            <i v-if="spinnerDelete" class="bi bi-trash-fill h2 m-0 text-white fw-bold"></i>

                            <div v-if="!spinnerDelete && favorito.id === spinnerId" 
                                class="spinner-border spinner-border-sm text-white" 
                                role="status">

                                <span class="visually-hidden">Loading...</span>
                            
                            </div>
                        
                        </div>

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
import SpinnerComponent from "../components/SpinnerComponent.vue";
import { useFavoritos } from "../funciones/Favoritos";

const {  spinner, spinnerDelete, spinnerId, deleteFav } = useFavoritos()

const router = useRouter()


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
            titulo: favorito.titulo, modo: favorito.modalidad, id: favorito.tituloId
        }
    })
 
}



</script>

<style scoped >

.titulo-favorito{
    display: flex;
    align-items: center;
    transition: .5s ease all;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    position: relative;
}

.titulo-favorito:hover{
    box-shadow: rgb(255, 255, 255) 0px 0px 0px 4px;
}


.btn-see-more {
    transition: .6s ease all;
    position: absolute;
    right: -3px;
    bottom: -3px;
    width: 55px;
    height: 35px;
    border: 2px solid transparent;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    z-index: 100;
}
.btn-delete{
    transition: .6s ease all;
    position: absolute;
    right: -3px;
    top: -3px;
    width: 55px;
    height: 45px;
    border: 2px solid transparent;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    z-index: 100;
}

 .btn-delete:hover  {
    background: linear-gradient(109.6deg, rgba(184, 22, 22, 0.678) 11.2%, rgba(5, 5, 5, 0.747) 91.1%); ;
    border: 2px solid white;
}
.btn-see-more:hover {
    background: linear-gradient(109.6deg, rgba(22, 87, 184, 0.678) 11.2%, rgba(5, 5, 5, 0.747) 91.1%); ;
    border: 2px solid white;
}

.bi-three-dots, .bi-trash-fill{
    transition: .6s ease all;
}
.bi-three-dots:hover, .bi-trash-fill:hover{
    transform: scale(.8);
}
.bi-three-dots:active, .bi-trash-fill:active{
    transform: scale(1.1);
}



</style>