import {imprimirCanciones}from './imprimirCanciones.js' 
import {manejarReproductor} from './reproductor.js'
import {reproducirCanciones} from './reproducirCanciones.js'

let audio = document.querySelector("audio")
let songs = {}

let dataContainer = document.querySelector('[data-container]')
let banner = document.querySelector('.banner')
let header = document.querySelector('header')
let r = document.querySelector('.r')
let infos = document.querySelectorAll('.side p')


async function ejecutarFunciones(index,canciones) { 
    songs = await imprimirCanciones(canciones,index)    
    reproducirCanciones(songs,audio)
    manejarReproductor(audio)
}

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
    ejecutarFunciones(index,canciones)
}else{
    infos.innerHTML = ""
    r.innerHTML = ""
    dataContainer.innerHTML = ""
    ejecutarFunciones(index,canciones)
}

}