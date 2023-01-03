

<template>
    
    <div class="d-flex container flex-wrap mt-2 mb-3 align-items-center justify-content-start gap-2 p-2" >

        <button class="fw-bold button-10" 
        @click="getModalidad(Math.floor(Math.random() * 50), 'top_rated')" 
        :class="modd === 'top_rated' ?'currentColor':'normalColor'"
        >
            Top Rated
        </button>

        <button class="fw-bold button-10"
        @click="getModalidad(Math.floor(Math.random() * 50), 'popular')"
        :class="modd === 'popular' ?'currentColor':'normalColor'"
        >
            Popular
        </button>

        <button class="fw-bold button-10"
        @click="getModalidad(Math.floor(Math.random() * 87), 'now_playing')"
        :class="modd === 'now_playing' ?'currentColor':'normalColor'"
        >
            Now Playing
        </button>

        <button class="fw-bold button-10"
        @click="getModalidad(Math.floor(Math.random() * 15), 'upcoming')"
        :class="modd === 'upcoming' ?'currentColor':'normalColor'"
        >
            Upcoming
        </button>
        
    </div>

</template>

<script setup >
import { ref } from "@vue/reactivity"


defineProps({
    modd: String
})
const emit = defineEmits(['changeMod'])

const current = ref('')

const getModalidad = (page, mod) => {
    emit('changeMod', page, mod )
    current.value = mod
}

</script>

<style scoped>

.currentColor {
    background-color: rgba(143, 27, 158, 0.884);
}

.normalColor {
    background-color: rgba(27, 88, 158, 0.884);
}


/* CSS */
.button-10 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 6px;
  border: none;

  color: #fff;
  background-origin: border-box;
  box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}


</style>