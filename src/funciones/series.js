

import axios from "axios"
import Swal from "sweetalert2";
import { ref } from "vue"
import { useBodegaStore } from '../stores/bodega';
import {keyApi} from "./key";

export function useSeries () {
    
    const useBodega = useBodegaStore()

    let key = keyApi
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
                icon: 'info', html: `<strong>Ha ocurrido un error inesperado</strong>`, position: 'top',
                allowOutsideClick: false, confirmButtonText: 'solucionar!', confirmButtonColor: '#00b347'
              }).then((r)=>{
                if (r.isConfirmed) {
                 getSeriesPopulares(Math.floor(Math.random() * 40), 'top_rated')   
                 Swal.fire({icon: 'success', title: 'solucionado!', timer: 1000, showConfirmButton: false })     
                }
              })
        }
          
    }

    getSeriesPopulares(Math.floor(Math.random() * 40), 'popular')

    return {
        getSeriesPopulares, keyApi
    }
}