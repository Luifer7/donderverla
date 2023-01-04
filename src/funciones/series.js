

import axios from "axios"
import Swal from "sweetalert2";
import { ref } from "vue"
import { useBodegaStore } from '../stores/bodega';

export function useSeries () {
    
    const useBodega = useBodegaStore()

    let key = '?api_key=9f7031622a3c84ce82bbf384f262391a'
    let api = 'https://api.themoviedb.org/3/tv/'
    let modalidad = ref('')
    let page = ref('')


    const getSeriesPopulares = async (n, mod) => {
          
        modalidad = mod
        page = `&page=${n}&language=es-MX`
        useBodega.seriePeticion = modalidad
        try { 
            const res = await axios.get(`${api}${modalidad}${key}${page}`)
            useBodega.seriesPopulares = res.data
        } catch (err) {
            Swal.fire({
                icon: 'error', title: 'Ha ocurrido un error inesperado!', position: 'top-start',
                allowOutsideClick: false, confirmButtonText: 'solucionar!'
              }).then((r)=>{
                if (r.isConfirmed) {
                 getSeriesPopulares(Math.floor(Math.random() * 20), 'top_rated')   
                 Swal.fire({icon: 'success', title: 'solucionado!', timer: 1000, showConfirmButton: false })     
                }
              })
        }
          
    }

    getSeriesPopulares(Math.floor(Math.random() * 20), 'top_rated')

    return {
        getSeriesPopulares
    }
}