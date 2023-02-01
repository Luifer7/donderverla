

import axios from "axios"
import Swal from "sweetalert2";
import { ref } from "vue"
import {keyApi} from "./key";

export function usePeliculas () {

    const peliculasModo = ref(null)
    const peticion = ref('')
    const generos = ref([])

    const pelicula = ref({})
    const trailers = ref({})
    const trailersEs = ref({})
    const proovedores = ref([])
    const director = ref([])
    const reparto = ref([])
    const similares = ref([])
    const genres = ref([])

    const spinner = ref(true)


    let key = keyApi
    let api = 'https://api.themoviedb.org/3/movie/'
    let lenguage = `&language=es-ES`
    let pageSimilares = 1



    // Pelicula por modalidades cuando la vista buscar peliclas es montada
    const getPeliculasModo = async (n, mod) => {
        let modalidad = mod
        let page = `&page=${n}&language=es-MX`
        peticion.value = mod

        try { 
            
            const res = await axios.get(`${api}${modalidad}${key}${page}`)
            const resGeneros = await axios.get(`https://api.themoviedb.org/3/genre/movie/list${keyApi}&language=es-ES`)
            peliculasModo.value = res.data
            generos.value = resGeneros.data.genres

        } catch (err) {
            Swal.fire({
                icon: 'info', html: `<strong>Ha ocurrido un error inesperado</strong>`, position: 'top',
                allowOutsideClick: false, confirmButtonText: 'solucionar!', confirmButtonColor: '#00b347'
              }).then((r)=>{
                if (r.isConfirmed) {
                    getPeliculasModo(Math.floor(Math.random() * 50), 'popular')   
                 Swal.fire({icon: 'success', title: 'solucionado!', timer: 1000, showConfirmButton: false })     
                }
              })
        }
          
    }



    // GET detalles de una pelicula para la vista peliculas 
    const getDatosPelicula = async (params) => {
            
    let apitrailers = `${api}/${params.id}/videos${key}`
    let apitrailersEs = `${api}/${params.id}/videos${key}&language=es-MX`
    let apiMovie = `${api}/${params.id}${key}${lenguage}`
    let apiproovedores = `${api}/${params.id}/watch/providers${key}`
    let apiCreditos = `${api}/${params.id}/credits${key}`
    let apiSimilares = `${api}/${params.id}/recommendations${key}${lenguage}&page=${pageSimilares}`

    try {

        const [res, resTrailers, resTrailersEs, resProovedores, resCreditos, resSimilares ] = await Promise.all([
             axios.get(apiMovie), axios.get(apitrailers), axios.get(apitrailersEs), axios.get(apiproovedores), 
             axios.get(apiCreditos), axios.get(apiSimilares)
        ])

        spinner.value = false
        
        pelicula.value = res.data
        genres.value = res.data.genres
        trailers.value = resTrailers.data.results
        trailersEs.value = resTrailersEs.data.results
        proovedores.value = resProovedores.data.results.CO
        director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
        reparto.value = resCreditos.data.cast
        similares.value = resSimilares.data
    
      } catch (error) {
        Swal.fire({
          icon: 'info', html: `<strong>Ha ocurrido un error inesperado</strong>`, position: 'top',
          allowOutsideClick: false, confirmButtonText: 'solucionar!', confirmButtonColor: '#00b347'
        }).then((r)=>{
          if (r.isConfirmed) {
            spinner.value = true
           ArreglarErrorPelicula(params)   
           Swal.fire({icon: 'success', title: 'solucionado!', timer: 1000, showConfirmButton: false })     
          }
        })
      }

    }
    // AFREGLA ERROR para la vista de peliuculas
    const ArreglarErrorPelicula = async  (params) => {

    let apitrailers = `${api}/${params.id}/videos${key}`
    let apitrailersEs = `${api}/${params.id}/videos${key}&language=es-MX`
    let apiMovie = `${api}/${params.id}${key}${lenguage}`
    let apiproovedores = `${api}/${params.id}/watch/providers${key}`
    let apiCreditos = `${api}/${params.id}/credits${key}`
    let apiSimilares = `${api}/${params.id}/recommendations${key}${lenguage}&page=${pageSimilares}`
    
    try {
        const [res, resTrailers, resTrailersEs, resProovedores, resCreditos, resSimilares ] = await Promise.all([
            axios.get(apiMovie), axios.get(apitrailers), axios.get(apitrailersEs), axios.get(apiproovedores), 
            axios.get(apiCreditos), axios.get(apiSimilares)
       ])
    
       spinner.value = false
       pelicula.value = res.data
       genres.value = res.data.genres
       trailers.value = resTrailers.data.results
       trailersEs.value = resTrailersEs.data.results
       proovedores.value = resProovedores.data.results.CO
       director.value = resCreditos.data.crew.filter(field => field.job === 'Director')
       reparto.value = resCreditos.data.cast
       similares.value = resSimilares.data
    } catch (error) {
        console.log(error)
    }
    
}

    
    
    return {
        getPeliculasModo, peticion, peliculasModo, generos,
        getDatosPelicula, pelicula, trailers, trailersEs, proovedores, director, reparto, similares, genres, spinner, key
    }


}