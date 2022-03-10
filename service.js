import {PARAMETROS_PETICION} from './CONSTANTES.js'
//funcion para consumir APIS(DATOS) de cualquier servidor con  JS PURO


export async function consumirAPI(URI){

    let res  = await fetch(URI,PARAMETROS_PETICION)
    let canciones = res.json()
    return canciones
}
