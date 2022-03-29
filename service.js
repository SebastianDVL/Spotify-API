import {implementarToken} from './CONSTANTES.js'
//funcion para consumir APIS(DATOS) de cualquier servidor con  JS PURO

export async function consumirAPI(URI){

    let res  = await fetch(URI,await implementarToken())
    let canciones = res.json()
    return canciones
}

