
<template>
    
    <div class="footer-clean">

      
        <footer>
            <div class="container">
                <div class="row justify-content-center align-items-center">
                
                    <div class="col-12 col-sm-6 col-md-4 item text-center" style="z-index:100;">
                        <h2 class="fw-bold">Menu</h2>
                        <ul class="fw-bold" >
                          <router-link to="/buscarseries" >
                            <li ><a href="#">Series</a></li>
                          </router-link>
                          <router-link to="/buscarpelicula" >
                            <li ><a href="#">Peliculas</a></li>
                          </router-link>
                        </ul>
                    </div>

                    <div class="col-12 col-sm-6 col-md-4 item text-center" style="z-index:100;">
                        <h2 class="fw-bold">Tech</h2>
                        <ul class="fw-bold" >
                            <li class="d-flex" ><a href="#"  class="tech">Vue 3</a></li>
                            <li class="d-flex" ><a href="#" class="tech">TMDB</a></li>
                        </ul>
                    </div>

                    <div class="col-12 col-sm-12 col-md-4  item social text-center" style="z-index:100;">
                      <a href="#"><i class="bi bi-instagram"></i></a>
                      <a href="#"><i class="bi bi-twitter"></i></a>
                      <a href="#"><i class="bi bi-whatsapp"></i></a>
                        <p class="copyright fw-bold">Luis Fernando Cordero Torres © 2023</p>
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
  background-color:rgba(0, 0, 0, 0.952);
  color:#ffffff;
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
  font-size: 1.5em;
  width: 100px;
  margin: auto;
  text-align: start;
  padding-bottom: 5px;
  color: #cac3c38f;
}

.footer-clean ul {
  padding:0;
  list-style:none;
  line-height:1.7;
  font-size:12px;
  margin-bottom:0;
  width: 100px;
  margin: auto;
}

.footer-clean ul a {
 color: #cac3c38f;
 letter-spacing: 1px;
  transition: .6s ease all;
  font-size: 1em;
  font-family: 'Rowdies', cursive;
  text-align: start;
}

.footer-clean ul a:hover {
  color: #cac3c38f;
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
  font-size:10px;
  color: #ffffff75;
}


</style>