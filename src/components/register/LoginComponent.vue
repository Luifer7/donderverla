

<template>


    <div class="w-100 px-3 mt-4 d-flex justify-content-center" >
    
        <router-link to="/register" class="btn btn-login fw-bold rounded col-12 col-md-6" >
            Únete Gratis A Nuestra Comunidad
        </router-link>
  
    </div>

</template>

<script setup >


</script>

<style scoped>

.btn-login {
    background-color: rgb(241, 241, 13);
    transition: .6s ease all;
    outline: none;
    border: 2px solid rgba(0, 0, 0, 0.192);
    padding: 5px;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.877);
}

.btn-login:hover {
    background-color: rgb(230, 230, 21);
    transform: scale(.9);
    outline: none;
}

.btn-login:active {
    background-color: rgb(241, 241, 13);
    transform: scale(1.1);
    box-shadow: none;
}


</style>