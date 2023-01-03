

<template>
    
    
          <div class="p-3 text-white row w-100 mb-4 m-auto review" >
            <h3 class="text-center text-white mb-2 mt-2"> <i>Reseñas</i> <i  v-if="!reviews[0]">no disponibles</i> </h3>
                
                <div  v-for="re of reviews" :key="re.id" 
                  class="col-12 col-sm-6 col-md-4 d-flex flex-column" style="height: 200px; overflow: auto;" >
                  <strong class="text-center p-2 text-uppercase" > {{ re.author }} </strong>
                  <p class="text-justify p-2">{{ re.content }}</p>
                </div>
                
          </div>

</template>

<script setup>

defineProps({
    reviews: Object
})

</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');

    .review {
      font-family: 'Oswald', sans-serif;
    }

    ::-webkit-scrollbar {
    width: 10px;
    }

    ::-webkit-scrollbar-track {
    background-color:  rgba(102, 51, 153, 0.082);
    border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(102, 51, 153, 0.705);
    border-radius: 10px;
    }
    

</style>