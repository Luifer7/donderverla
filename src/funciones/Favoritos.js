

import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref } from "vue";
import { db } from "../../firebase"
import { useBodegaStore } from "../stores/bodega";

export function useFavoritos() {

    const useBodega = useBodegaStore()
    const spinner = ref(true)

    const spinnerDelete = ref(true)
    const spinnerId = ref('')

    const getFav = async (fromDelete) => {
        spinner.value = false || fromDelete
        const q = query(collection(db, "favoritos"));
        let fav = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          fav.push({
            id: doc.id, ...doc.data()
          })
      })
        useBodega.favoritos = fav.filter(field => field.userid === useBodega.currentUser?.uid)
        spinner.value = true
      }
      
      const deleteFav = async (id) => {
       spinnerId.value = id
       spinnerDelete.value = false
       await deleteDoc(doc(db, "favoritos", id))
       await getFav(true)
       spinnerDelete.value = await true
       spinnerId.value = await ''
      } 
      
      getFav()
      
    return {
        getFav, deleteFav, spinner, spinnerDelete, spinnerId
    }
}