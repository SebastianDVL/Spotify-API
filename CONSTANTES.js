import {generarToken} from './generarTokens.js'

export async function implementarToken(){
    let obj = await generarToken()
    let TOKEN = `${obj.token_type} ${obj.access_token}`
    
    const PARAMETROS_PETICION = {
        method:"GET",
        headers:{
            Authorization:TOKEN
        }  
    }
    return PARAMETROS_PETICION
}




