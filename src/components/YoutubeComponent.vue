

<template>
    
    <div class="p-1 px-3 d-flexflex-wrap" >
        <span v-for="tra of trailers" :key="tra.id" @click="videoTrailer(tra)" 
              class="d-flex align-items-start gap-1" 
              style="cursor:pointer;" >
            <i class="bi bi-youtube h4 text-danger m-0"></i>
            <strong class="link-yt" >{{ tra?.name }} <small>({{ tra?.iso_639_1 }}) </small> </strong>
        </span>
    </div>

</template>

<script setup>
import  Swal  from 'sweetalert2';

defineProps({
    trailers: Object
})

const videoTrailer =  (data) => {
            Swal.fire({
              html:`<iframe width="400" height="320" src='https://www.youtube.com/embed/${data.key}' 
              title="YouTube video player" frameborder="0"
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen></iframe>`,
              showCancelButton: false, showConfirmButton: false,
        })
}

</script>

<style scoped>

.link-yt{
    transition: .6s ease all;
    color: white;
}

.link-yt:hover{
    color: rgba(0, 174, 255, 0.842);    
}

</style>