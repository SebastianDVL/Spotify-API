import {generarToken} from './generarTokens.js'

export async function implementarToken(){
    //capturo en un objeto variable el token que me trae la funcion de generarToken
    let obj = await generarToken()
    //concateno el token type con el access token
    let TOKEN = `${obj.token_type} ${obj.access_token}`
    
    //parametros peticion con el token armado
    const PARAMETROS_PETICION = {
        method:"GET",
        headers:{
            Authorization:TOKEN
        }  
    }
    return PARAMETROS_PETICION
}




