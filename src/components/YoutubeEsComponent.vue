

<template>

     <!-- TRAILER EN ESPAÑOL -->
     <div class="px-3 my-3 rounded w-100 trailer-es">
        <iframe style="width: 100%; height: 100%;" class="rounded" 
              :src="`https://www.youtube.com/embed/${key}`" 
              title="YouTube video player" frameborder="0"
              autoplay clipboard-write encrypted-media SameSite=None
              gyroscope picture-in-picture
              allowfullscreen>
        </iframe>
    </div>
  
</template>

<script setup >

defineProps({
    key: String
})

</script>

<style scoped >

.trailer-es{
  height: 400px;
}

@media (max-width: 575px) {
  .trailer-es{
  height: 250px;
  }

}

</style>