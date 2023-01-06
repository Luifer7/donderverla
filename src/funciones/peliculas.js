

import axios from "axios"
import Swal from "sweetalert2";
import { ref } from "vue"



import { useBodegaStore } from '../stores/bodega';

export function usePeliculas () {

    const useBodega = useBodegaStore()
    
    let key = '?api_key=9f7031622a3c84ce82bbf384f262391a'
    let api = 'https://api.themoviedb.org/3/movie/'
    let modalidad = ref('') // for example
    let page = ref('')
    
    const getPopular = async (n, mod) => {
          
        modalidad = mod
        page = `&page=${n}&language=es-MX`
        useBodega.peticion = modalidad
        try { 
            const res = await axios.get(`${api}${modalidad}${key}${page}`)
            useBodega.peliculasPopulares = res.data
        } catch (err) {
            Swal.fire({
                icon: 'info', html: `<strong>Ha ocurrido un error inesperado</strong>`, position: 'top',
                allowOutsideClick: false, confirmButtonText: 'solucionar!', confirmButtonColor: '#00b347'
              }).then((r)=>{
                if (r.isConfirmed) {
                 getPopular(Math.floor(Math.random() * 50), 'popular')   
                 Swal.fire({icon: 'success', title: 'solucionado!', timer: 1000, showConfirmButton: false })     
                }
              })
        }
          
    }
    
    getPopular(Math.floor(Math.random() * 50), 'popular')
    
    return {
        getPopular
    }


}