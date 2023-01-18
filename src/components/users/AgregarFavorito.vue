
<template>
    
     
    <button style="height: 30px;"
    @click="addFav(titulo)"
    :class="idCurrent[0]?.id == titulo.id ?'d-none':
    'btn btn-warning btn-sm text-dark fw-bold d-flex align-items-center gap-1'"
    >
            Agregar a mi lista
            <i class="bi bi-bookmark-star-fill text-dark h4 m-0"></i>

    </button>

</template>

<script setup >
import { addDoc,  collection, query, where, getDocs  } from "firebase/firestore"
import { useBodegaStore } from "../../stores/bodega";
import { db, auth } from "../../../firebase";
import { useRoute } from "vue-router";
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";

const useBodega = useBodegaStore()
const route = useRoute()



defineProps({
    titulo: Object
})

const idCurrent = ref('')

const addFav = async (titulo) => {
    console.log(titulo)
    const docRef = await addDoc(collection(db, "favoritos"), {
        titulo: route.params.pelicula || route.params.serie || route.params.titulo ,
        id: route.params.id,
        userid: useBodega.currentUser?.uid
    })
    console.log("Document written with ID: ", docRef.id);
    getFav()
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

}

getFav()

</script>



<style scoped>


</style>