

<template>
    
    <hr>
    <h5 class="text-start m-0  text-white" > <strong class="m-4" >STREAM</strong>
    <i style="font-size: .5em;" v-if="!proovedores?.flatrate" >NO DISPONIBlE</i>
    </h5>
    <div class="w-100  p-2 text-white text-center d-flex mb-1 flex-wrap">
        <div v-for="prov of proovedores?.flatrate" :key="prov.id" >
           <span class="d-flex m-1 p-2 gap-1 align-items-center" >
                <img width="35" class="rounded-circle" height="35" :src="`https://image.tmdb.org/t/p/w500/${prov.logo_path}`" alt=""> 
                <strong>{{ prov?.provider_name }}</strong>
            </span>
        </div>
    </div>
    <hr>
    <h5 class="text-start m-0  text-white" > <strong class="m-4" >COMPRA</strong>
        <i style="font-size: .5em;" v-if="!proovedores?.buy" >NO DISPONIBlE</i>
    </h5>
    <div class="w-100  p-2 text-white text-center d-flex mb-1 flex-wrap">
        <div v-for="prov of proovedores?.buy" :key="prov.id" >
           <span class="d-flex m-1 p-2 gap-1 align-items-center" >
                <img width="35" class="rounded-circle" height="35" :src="`https://image.tmdb.org/t/p/w500/${prov.logo_path}`" alt=""> 
                <strong>{{ prov?.provider_name }}</strong>
            </span>
        </div>
    </div>
    <hr>
    <h5 class="text-start m-0  text-white" > <strong class="m-4" >RENTA</strong> 
        <i style="font-size: .5em;" v-if="!proovedores?.rent" >NO DISPONIBlE</i>
    </h5>
    <div class="w-100  p-2 text-white text-center d-flex mb-1 flex-wrap">
        <div v-for="prov of proovedores?.rent" :key="prov.id" >
           <span class="d-flex m-1 p-2 gap-1 align-items-center" >
                <img width="35" class="rounded-circle" height="35" :src="`https://image.tmdb.org/t/p/w500/${prov.logo_path}`" alt=""> 
                <strong>{{ prov?.provider_name }}</strong>
            </span>
        </div>
    </div>
        <hr>
</template>

<script setup>

defineProps({
    proovedores: Object
})

</script>

<style scoped>


</style>
