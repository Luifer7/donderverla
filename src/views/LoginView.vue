<template>

 
    <div class="w-100 d-flex flex-column align-items-center justify-content-center" >
        <div class="row w-100 p-3">
            
            <div class="col-md-9 col-lg-6 col-xl-5 p-2 m-auto">
                <div class="mx-3 mt-4 d-flex align-items-center justify-content-center donde" >
            <router-link to="/" class="text-decoration-none v" >
              <h3 class="m-0  text-center tracking-in-expand tt" ><i>DONDEVERLA</i></h3>
            </router-link>
          </div>
            </div>

            <div  class="col-md-8 col-lg-6 col-xl-4 p-2 m-auto">
                <form v-on:submit.prevent="login(email, password)" >


                <div class="divider d-flex align-items-center my-4">
                    <h4 class="text-center text-white fw-bold mx-3 mb-1">Inicia Sesión</h4>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="email" v-model="email" id="form3Example3" class="form-control form-control-md"
                    placeholder="Ingresa una cuenta de email valido" />
                    <label class="form-label text-white fw-bold" for="form3Example3">Email</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-3">
                    <input type="password" v-model="password" id="form3Example4" class="form-control form-control-md"
                    placeholder="Contraseña valida (minimo 6 digitos)" />
                    <label class="form-label text-white fw-bold" for="form3Example4">Password</label>
                </div>

                <div v-if="spinnerAuth" class="text-center w-100">
                    <button type="submit" class="btn btn-primary fw-bold btn-md w-100"
                    style="padding-left: 2.5rem; padding-right: 2.5rem; letter-spacing: 1px;">
                    LOGIN
                  
                    </button>
                    <p class="medium fw-bold mt-2 text-white pt-1 mb-0">No tienes Cuenta?
                        <router-link to="/register" class="text-success" >
                            Registrate
                        </router-link>
                    </p>
                </div>

                <div v-if="!spinnerAuth" class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>

                </form>
            </div>

      
        </div>

        <div class="w-100 p-5" >

        </div>

    </div>
 
</template>

<script setup >
import { ref } from '@vue/reactivity';
import { useAuth } from '../funciones/Auth';


const { login, spinnerAuth } = useAuth()

const email = ref('')
const password = ref('')

</script>

<style scoped >

.donde .v{
  font-weight: 600;
  background-image: linear-gradient(109.6deg, rgb(255, 252, 252) 11.2%, rgb(11, 132, 145) 91.1%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  font-family: 'Rubik Spray Paint', cursive;
  text-shadow: rgba(255, 255, 255, 0.849) 3px -24px 2px;
  transition: .6s ease all;
}

.tt{
    font-size: 40px;
}

.donde:hover .v {
  transform: scale(.9);
}

.donde:active .v {
  transform: scale(1.1);
}

.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
.h-custom {
height: calc(100% - 73px);
}
@media (max-width: 450px) {
.h-custom {
height: 100%;
}
}

</style>