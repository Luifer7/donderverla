
<template>
    
  <div class="fav-box" >

    <!-- Boton de favortio -->
    <button style="height: 30px;" v-if="spinner"
    @click="addFav(titulo)"
    :class="idCurrent[0]?.tituloId == titulo.id ?'d-none':
    'btn btn-warning btn-sm text-dark fw-bold d-flex align-items-center gap-1'">
    Agregar a mi lista
    <i class="bi bi-bookmark-star-fill text-dark h4 m-0"></i>
    </button>
    
    <!-- estrella de favorito -->
    <i class="bi bi-star-fill h3 m-0 opacity-0"
    :class="idCurrent[0]?.tituloId != titulo.id ?'d-none': 'text-warning opacity-100'">
    </i>

    <!-- Spinner -->
    <div v-if="!spinner" class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>

  </div>

</template>

<script setup >
import { addDoc,  collection, query, getDocs  } from "firebase/firestore"
import { useBodegaStore } from "../../stores/bodega";
import { db } from "../../../firebase";
import { useRoute, useRouter } from "vue-router";
import { ref } from "@vue/runtime-core";
import Swal from "sweetalert2";

const useBodega = useBodegaStore()
const route = useRoute()
const router = useRouter()


defineProps({
    titulo: Object
})

const idCurrent = ref('')
const spinner = ref(true)

const addFav = async (titulo) => {
    
    spinner.value = false
    let modo = ''

    if (route.name === 'pelicula') {
      modo = 'movie'
    }
    if (route.name === 'serie') {
      modo = 'tv'
    }
    if (route.params.modo) {
      modo = route.params.modo
    }

    try {
      const docRef = await addDoc(collection(db, "favoritos"), {
      titulo: route.params.pelicula || route.params.serie || route.params.titulo ,
      tituloId: route.params.id,
      userid: useBodega.currentUser?.uid,
      imagen: titulo.backdrop_path,
      modalidad: modo 
    })

    getFav()
    
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
    })
    Toast.fire({
    icon: 'success',
    title: 'Agregado correctamente!'
    }
    )

    } catch (error) {
      if (error.code === 'invalid-argument') {
      Swal.fire({
      icon: 'info', 
      html: `<strong class="text-dark fw-bold" >Debes estar registrado o haber iniciado sesi??n para crear tu lista</strong>`, 
      confirmButtonText: 'Iniciar Sesi??n', showCancelButton: true,
      }).then((r)=> {
      if (r.isConfirmed) {
          router.push('/login')
      }
      })
    }
} 
   
}

const getFav = async () => {
  
  const q = query(collection(db, "favoritos"));
  let fav = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    fav.push({
      id: doc.id, ...doc.data()
    })
})

  useBodega.favoritos = fav.filter(field => field.userid === useBodega.currentUser?.uid)
  idCurrent.value =  useBodega.favoritos.filter(field => field.tituloId == route.params.id)
  spinner.value = true
}

getFav()

</script>


<style scoped>


.fav-box {
  transition: .8s ease all;
}

</style>