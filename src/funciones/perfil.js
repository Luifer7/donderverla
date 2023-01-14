
import axios from "axios"
import { ref } from "vue"

export function usePerfil () {

    const data = ref('')

    const getDataProfile = async () => {

        let api = `https://api.themoviedb.org/3/movie/popular?api_key=9f7031622a3c84ce82bbf384f262391a`

        try {
            
            const res = await axios.get(api)
            data.value = res.data.results
            console.log(data.value)

        } catch (error) {
            console.log(error)
        }


    }

    getDataProfile()




    return {
      getDataProfile, data
    }


}