
import { createUserWithEmailAndPassword, 
         onAuthStateChanged,
         updateProfile, signOut, signInWithEmailAndPassword
        } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { auth, db } from "../../firebase"
import { useBodegaStore } from "../stores/bodega";

export function useAuth() {

  const router = useRouter()
  const route = useRoute()
  const useBodega = useBodegaStore()
  const spinnerAuth = ref(true)

  const createUser = async (email, password, displayName) => {
    spinnerAuth.value = false
    try {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {
      displayName: displayName, 
      photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    })
    spinnerAuth.value = true
    router.push('/')
    } catch (error) {
    console.log(error)
    }
}

const login = async (email, password) => {
 spinnerAuth.value = false
 try {
  await signInWithEmailAndPassword(auth, email, password)
  router.push('/')
  spinnerAuth.value = false
 } catch (error) {
  console.log(error)
 }
}

const logout = async () => {
 
  try {
      await signOut(auth)
      useBodega.isLogin = false
      router.push('/login')
  } catch (error) {
      console.log(error)
  }
          
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    useBodega.currentUser = user
    useBodega.isLogin = true
  } else {
    useBodega.isLogin = false
  }
})

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
}

getFav()

    return {
        login, spinnerAuth, logout, createUser, getFav
    }

}
