//se importan todas las funciones a ejecutar cuando se consuma la api de top 10 tracks de artistas
import {imprimirCanciones}from './imprimirCanciones.js' 
import {manejarReproductor} from './reproductor.js'
import {reproducirCanciones} from './reproducirCanciones.js'


//se declaran variables globales
let audio = document.querySelector("audio")
let songs = {}

let dataContainer = document.querySelector('[data-container]')
let banner = document.querySelector('.banner')
let header = document.querySelector('header')
let r = document.querySelector('.r')
let infos = document.querySelectorAll('.side p')


//funcion que ejecuta todas las funciones que requieren las canciones y la informacion del artista 
async function ejecutarFunciones(canciones,info) { 
    //se guarda en una variable el arreglo de objetos mas con los contenedores de las canciones que retorna la funcion imprimir
    songs = await imprimirCanciones(canciones,info)    
    reproducirCanciones(songs,audio)
    manejarReproductor(audio)
}

//funcion que recibe como parametros el index del artista,el objeto con la info del artista y las canciones
//esta funcion pone la imagen del respectivo artista en el banner y ejecuta la funcion "ejecutarFunciones"
export function checkAndExecute(index,obj,canciones) {  
    const styles = {
        backgroundSize:"100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
    }
        banner.style.background = `url(${obj[index].img})`
        Object.assign(banner.style, styles)
    if(dataContainer.childElementCount == 0){
        header.removeAttribute('class') 
        document.querySelector("hr").classList.remove("invisible")
        ejecutarFunciones(canciones,obj[index])
    }else{
        infos.innerHTML = ""
        r.innerHTML = ""
        dataContainer.innerHTML = ""
        ejecutarFunciones(canciones,obj[index])
    }

}