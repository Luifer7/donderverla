
<template>
    
    <div class="footer-clean">

        <div class="bgbg kenburns-right" ></div>
        <footer>
            <div class="container">
                <div class="row justify-content-center align-items-center">
                
                    <div class="col-12 col-sm-6 col-md-4 item text-center" style="z-index:100;">
                        <h2 class="text-white fw-bold">Menu</h2>
                        <ul class="text-white fw-bold" >
                          <router-link to="/buscarseries" >
                            <li class="linklink" ><a href="#">Series</a></li>
                          </router-link>
                          <router-link to="/buscarpelicula" >
                            <li class="linklink" ><a href="#">Peliculas</a></li>
                          </router-link>
                        </ul>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4 item text-center" style="z-index:100;">
                        <h2 class="text-white fw-bold">Tech</h2>
                        <ul class="text-white fw-bold" >
                            <li><a href="#">Vue 3</a></li>
                            <li><a href="#">TMDB</a></li>
                        </ul>
                    </div>
                    <div class="col-12 col-sm-12 col-md-4  item social text-center" style="z-index:100;">
                      <a href="#"><i class="bi bi-instagram"></i></a>
                      <a href="#"><i class="bi bi-twitter"></i></a>
                      <a href="#"><i class="bi bi-whatsapp"></i></a>
                        <p class="copyright fw-bold">Luis Cordero © 2023</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>


</template>

<script setup >

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&display=swap');

.footer-clean {
  padding:50px 0;
  background-color:rgb(0, 0, 0);
  color:#ffffff;
  position: relative;
  overflow: auto;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

    .footer-clean::-webkit-scrollbar {
        display: none;
    }

    .footer-clean::-webkit-scrollbar-track {
        display: none;
    }

    .footer-clean::-webkit-scrollbar-thumb {
        display: none;
    }

    h2{
      font-size: 1.4em;
    }

.bgbg {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/dondeverla.appspot.com/o/ggghh.jpg?alt=media&token=cb4bf01a-a07e-4e95-8d19-27fed98e57e5);
    background-size: cover;
    background-position: center;
}

.footer-clean h3 {
  margin-top:0;
  margin-bottom:12px;
  font-weight:bold;
  font-size:16px;
}

.footer-clean ul {
  padding:0;
  list-style:none;
  line-height:1.6;
  font-size:14px;
  margin-bottom:0;
  
}

.footer-clean ul a {
 color: rgb(255, 255, 255);
 letter-spacing: 2px;
  transition: .6s ease all;
  font-size: 1em;
  font-family: 'Rowdies', cursive;
}

.footer-clean ul a:hover {
  color: #93979b;
}

.footer-clean .item.social {
  text-align:right;
}

@media (max-width:767px) {
  .footer-clean .item {
    text-align:center;
    padding-bottom:20px;
  }
}

@media (max-width: 768px) {
  .footer-clean .item.social {
    text-align:center;
  }
}

.footer-clean .item.social > a {
  font-size:24px;
  width:40px;
  height:40px;
  line-height:40px;
  display:inline-block;
  text-align:center;
  border-radius:50%;
  margin-left:10px;
  margin-top:22px;
  color:inherit;
  opacity:0.75;
}

.footer-clean .item.social > a:hover {
  opacity:0.9;
}

@media (max-width:991px) {
  .footer-clean .item.social > a {
    margin-top:40px;
  }
}

@media (max-width:767px) {
  .footer-clean .item.social > a {
    margin-top:10px;
  }
}

.footer-clean .copyright {
  margin-top:14px;
  margin-bottom:0;
  font-size:13px;
  color: #ffffff;
}


/** expan exand */

.kenburns-right {
	-webkit-animation: kenburns-right 7s ease-out both;
	        animation: kenburns-right 7s ease-in-out alternate-reverse both infinite;
}


 @-webkit-keyframes kenburns-right {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
            transform: scale(1) translate(0, 0);
    -webkit-transform-origin: 84% 50%;
            transform-origin: 84% 50%;
  }
  100% {
    -webkit-transform: scale(1.25) translateX(20px);
            transform: scale(1.25) translateX(20px);
    -webkit-transform-origin: right;
            transform-origin: right;
  }
}
@keyframes kenburns-right {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
            transform: scale(1) translate(0, 0);
    -webkit-transform-origin: 84% 50%;
            transform-origin: 84% 50%;
  }
  100% {
    -webkit-transform: scale(1.25) translateX(20px);
            transform: scale(1.25) translateX(20px);
    -webkit-transform-origin: right;
            transform-origin: right;
  }
}


</style>