import {consumirAPI} from './service.js'
import {imprimirCanciones}from './imprimirCanciones.js' 
import {manejarReproductor} from './reproductor.js'
import {reproducirCanciones} from './reproducirCanciones.js'
import {buscarArtista} from './searchArtist.js'

let artistas = buscarArtista()



let buttons = document.querySelectorAll('.btn')
let audio = document.querySelector("audio")
let songs = {}
let canciones ={}
let dataContainer = document.querySelector('[data-container]')
let banner = document.querySelector('.banner')
let header = document.querySelector('header')
let r = document.querySelector('.r')
let infos = document.querySelectorAll('.side p')
console.log(artistas)

buttons.forEach((button,index)=>{
    button.addEventListener('click',async()=>{
        canciones = await consumirAPI(artistas[index].uri)
        checkAndExecute(index)
    })     
})
    
async function ejecutarFunciones(index) { 
        songs = await imprimirCanciones(canciones,index)    
        reproducirCanciones(songs,audio)
        manejarReproductor(audio)
}

function checkAndExecute(index) {  
    const styles = {
        backgroundSize:"100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
    }
        banner.style.background = `url(${artistas[index].img})`
        Object.assign(banner.style, styles)

    if(dataContainer.childElementCount == 0){
        header.removeAttribute('class') 
        ejecutarFunciones(index)
    }else{
        infos.innerHTML = ""
        r.innerHTML = ""
        dataContainer.innerHTML = ""
        ejecutarFunciones(index)
    }

}

window.addEventListener('keydown', (e) => {  
    if (e.keyCode === 32 && e.target === document.body) {  
      e.preventDefault();  
    }  
  });




