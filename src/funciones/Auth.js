

import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, 
         onAuthStateChanged,
         updateProfile, signOut, 
         signInWithEmailAndPassword
        } from "firebase/auth";

import Swal from "sweetalert2";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { auth, db } from "../../firebase"
import { useBodegaStore } from "../stores/bodega";

export function useAuth() {

  const router = useRouter()
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
      getErrors(error)
    }
}

const login = async (email, password) => {
 spinnerAuth.value = false
 try {
  await signInWithEmailAndPassword(auth, email, password)
  router.push('/')
  spinnerAuth.value = false
 } catch (error) {
  getErrors(error)
 }
}
//Erros login y register
const getErrors = (error) => {
 
  //email invalido
  if (error.code === 'auth/invalid-email') {
    Swal.fire({
      icon: 'info', title: 'Formato de correo invalido',
      html: `<strong class="text-dark fw-bold">
             Prueba de la forma: ejemplo@ejemplo.ejemplo 😀</strong>`,
             allowOutsideClick: false
    }).then((r) => {
      if (r.isConfirmed) {
        spinnerAuth.value = true
      }
    })
  }

  // contraseña corta
  if (error.code === 'auth/weak-password') {
    Swal.fire({
      icon: 'info', title: 'Contraseña débil',
      html: `<strong class="text-dark fw-bold">
             Tu contraseña debe tener minimo 6 caracteres 😀</strong>`,
             allowOutsideClick: false
    }).then((r) => {
      if (r.isConfirmed) {
        spinnerAuth.value = true
      }
    })
  }

  // auth/email-already-in-use
  if (error.code === 'auth/email-already-in-use') {
    Swal.fire({
      icon: 'info', title: 'Este correo ya se encuentra registrado',
      html: `<strong class="text-dark fw-bold">
             Intenta con uno diferente 😀</strong>`,
             allowOutsideClick: false
    }).then((r) => {
      if (r.isConfirmed) {
        spinnerAuth.value = true
      }
    })
  }

  // auth/user-not-found
  if (error.code === 'auth/user-not-found') {
    Swal.fire({
      icon: 'info', title: 'Este correo no esta registrado',
      html: `<strong class="text-dark fw-bold">
             Intenta con uno diferente o registrate gratis..
             </strong>`,
             allowOutsideClick: false, showDenyButton: true, denyButtonText: 'Registrarme'
    }).then((r) => {
      if (r.isConfirmed) {
        spinnerAuth.value = true
      }
      if (r.isDenied) {
        spinnerAuth.value = true
        router.push('/register')
      }
    })
  }

  // auth/wrong-password
  if (error.code === 'auth/wrong-password') {
    Swal.fire({
      icon: 'info', title: 'Contraseña incorrecta',
      html: `<strong class="text-dark fw-bold">
             Intenta con una diferente 😀</strong>`,
             allowOutsideClick: false
    }).then((r) => {
      if (r.isConfirmed) {
        spinnerAuth.value = true
      }
    })
  }

}

//Cerrar sesion
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


    return {
        login, spinnerAuth, logout, createUser 
    }

}
