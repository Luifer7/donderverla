

<template>
    
    <div class="d-flex flex-wrap mt-3 mb-3 align-items-center justify-content-center gap-2 p-2" >

        <button class="btn btn-sm text-white fw-bold" 
        @click="getModalidad(Math.floor(Math.random() * 50), 'top_rated')" 
        :class="modd === 'top_rated' ?'currentColor':'normalColor'"
        >
            Top Rated
        </button>

        <button class="btn btn-sm text-white fw-bold"
        @click="getModalidad(Math.floor(Math.random() * 50), 'popular')"
        :class="modd === 'popular' ?'currentColor':'normalColor'"
        >
            Popular
        </button>

        <button class="btn btn-sm text-white fw-bold"
        @click="getModalidad(Math.floor(Math.random() * 87), 'now_playing')"
        :class="modd === 'now_playing' ?'currentColor':'normalColor'"
        >
            Now Playing
        </button>

        <button class="btn btn-sm text-white fw-bold"
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


</style>