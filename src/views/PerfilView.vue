

<template>

    <div class="w-100 mt-3 p-3 d-flex flex-column">
        
        
        <div class="text-white p-3 border m-2 rounded d-flex align-items-center justify-content-between"
         v-for="d of data" :key="d.id" >
        {{ d.title }} {{ d.vote_average }}

        <button class="btn btn-primary">ver datos de pelicula</button>
        </div>

        
    
    </div>
  

</template>

<script setup >
import { usePerfil } from '../funciones/perfil';

const { getDataProfile, data } = usePerfil()

const gg = [
    {id: 1, nombre: 'pepito', casado: true, direccion: [ {calle: "222"}, {casa: 5} ]
}, {id: 2, nombre: 'pepa'} 
]

</script>

<style scoped >

</style>