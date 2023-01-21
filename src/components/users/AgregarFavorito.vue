
<template>
    
     <div class="fav-box" >

    <button style="height: 30px;" v-if="spinner"
    @click="addFav(titulo)"
    :class="idCurrent[0]?.id == titulo.id ?'d-none':
    'btn btn-warning btn-sm text-dark fw-bold d-flex align-items-center gap-1'">
    Agregar a mi lista
    <i class="bi bi-bookmark-star-fill text-dark h4 m-0"></i>
    </button>
    
    <i class="bi bi-star-fill h3 m-0 opacity-0"
    :class="idCurrent[0]?.id != titulo.id ?'d-none': 'text-warning opacity-100'">
    </i>

    <div v-if="!spinner" class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>

    </div>

</template>

<script setup >
import { addDoc,  collection, query, where, getDocs  } from "firebase/firestore"
import { useBodegaStore } from "../../stores/bodega";
import { db, auth } from "../../../firebase";
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
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
    try {
      const docRef = await addDoc(collection(db, "favoritos"), {
        titulo: route.params.pelicula || route.params.serie || route.params.titulo ,
        id: route.params.id,
        userid: useBodega.currentUser?.uid,
        imagen: titulo.backdrop_path
    })
    getFav()
    } catch (error) {
      if (error.code === 'invalid-argument') {
          Swal.fire({
            icon: 'info', 
            html: `<strong class="text-dark fw-bold" >Debes estar registrado 
                    o haber iniciado sesión para crear tu lista</strong>`, 
            confirmButtonText: 'Iniciar Sesión', showCancelButton: true,
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
  idCurrent.value =  useBodega.favoritos.filter(field => field.id == route.params.id)
  spinner.value = true
}

getFav()

</script>


<style scoped>


.fav-box {
  transition: .8s ease all;
}

</style>