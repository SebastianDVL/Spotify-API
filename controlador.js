import {consumirAPI} from './service.js'
import {imprimirCanciones}from './imprimirCanciones.js' 
import {manejarReproductor} from './reproductor.js'
import {reproducirCanciones} from './reproducirCanciones.js'

let artistas = [
    {uri:'https://api.spotify.com/v1/artists/0du5cEVh5yTK9QJze8zA0C/top-tracks?market=US',img:'img/brunomarsjpg.jpg'},
    {uri:'https://api.spotify.com/v1/artists/7bu3H8JO7d0UbMoVzbo70s/top-tracks?market=US',img:'img/thecure.webp'},
    {uri:'https://api.spotify.com/v1/artists/5M52tdBnJaKSvOpJGz8mfZ/top-tracks?market=US',img:'img/bs.webp'},
    {uri:'https://api.spotify.com/v1/artists/2QsynagSdAqZj3U9HgDzjD/top-tracks?market=US',img:'img/bob.jpg'},
    {uri:'https://api.spotify.com/v1/artists/5eAWCfyUhZtHHtBdNk56l1/top-tracks?market=US',img:'img/soad.jpg'}
]
 

let buttons = document.querySelectorAll('.btn')
let audio = document.querySelector("audio")
let songs = {}
let canciones ={}
let dataContainer = document.querySelector('[data-container]')
let banner = document.querySelector('.banner')
let header = document.querySelector('header')
let r = document.querySelector('.r')

buttons.forEach((button,index)=>{
    button.addEventListener('click',async()=>{
        canciones = await consumirAPI(artistas[index].uri)
        checkAndExecute(index)
    
    })
         
})
    

async function ejecutarFunciones() { 
        songs = await imprimirCanciones(canciones)    
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
        ejecutarFunciones()
    }else{
        r.innerHTML = ""
        dataContainer.innerHTML = ""
        ejecutarFunciones()
    }

}





