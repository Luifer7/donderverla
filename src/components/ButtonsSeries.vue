

<template>
    
    <div class="d-flex flex-wrap mt-2 mx-2 mb-3 align-items-center justify-content-start gap-2 p-2" >

        <button class="fw-bold button-10" 
        @click="getModalidad(Math.floor(Math.random() * 50), 'top_rated')" 
        :class="modd === 'top_rated' ?'seleccionado':''"
        >
        Top Rated
        </button>

        <button class="fw-bold button-10"
        @click="getModalidad(Math.floor(Math.random() * 50), 'popular')"
        :class="modd === 'popular' ?'seleccionado':''"
        >
        Populares
        </button>

        <button class="fw-bold button-10"
        @click="getModalidad(Math.floor(Math.random() * 30), 'on_the_air')"
        :class="modd === 'on_the_air' ?'seleccionado':''"
        >
        En emisión
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

.button-10 {
  transition: .6s ease all;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 6px;
  border: none;

  color: #fff;
  background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
  background-origin: border-box;
  box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-10:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}
.button-10:hover {
    transform: scale(.9);
}
.button-10:active {
    transform: scale(1.1);
}

.seleccionado{
    background: linear-gradient(180deg, #2556a0 0%, #27519e 100%);
    color: white;
}


</style>