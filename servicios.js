
const URI = "https://api.spotify.com/v1/artists/5NGO30tJxFlKixkPSgXcFE/top-tracks?market=US"
const TOKEN = "Bearer BQA7JPAI4A9nZkVYLC8rBrIs65yJv0IiSXMboQin8c-isZv2SBSxzhsWh2_m2LP3UKygrOK-cHxRQwjBLe2OKTAPeMh_Tj-Ipb4G4u38jpFRIrxbgQVRirmryIviP-DHUYrWOGiKTYBY6iZL"

let parametrosPeticion = {
    method:"GET",
    headers:{
        Authorization:TOKEN
    }  
}

const songTemplates = document.querySelector("[data-song-template]")
const container = document.querySelector("[data-container]")


let songNames ={}
fetch(URI,parametrosPeticion)
.then(res=>res.json())
.then(data=>{

    songNames = data.tracks.map((track,index) => {
        let cont= songTemplates.content.cloneNode(true).children[0]
        let img = cont.querySelector("img")
        let songName = cont.querySelector(".nombre")
        let album = cont.querySelector("p")
        let year = cont.querySelector("small")
        let i = cont.querySelector("h6")
        let duration  = cont.querySelector(".duration")


        img.src = track.album.images[0].url
        img.height = track.album.images[2].height
        img.width = track.album.images[2].width

        songName.textContent = track.name
        album.textContent = track.album.name    
        year.textContent =track.album.release_date.substring(0,4)
        i.textContent = index + 1
        duration.textContent = msToMinutes(track.duration_ms)

        container.appendChild(cont)

        return {contenedor:cont, titulo:track.name,song:track.preview_url}
    })
    songNames.forEach(song => {
        let play =  song.contenedor.querySelector(".fa-play")
        song.contenedor.addEventListener('mouseover', () => { 
           play.classList.toggle("invisible")
        })
        song.contenedor.addEventListener('mouseout', () => { 
            play.classList.toggle("invisible")
         })
    })

    cambiarCancion(songNames)
   
})
.catch(respuestaERROR=>console.log(respuestaERROR))

// Dale al PLay !!!


let changeICon = (add,remove,playButtons)=>{
    playButtons.forEach(playButton => {
        playButton.classList.add(add)
        playButton.classList.remove(remove)
    })
    
 }

let play = (playButtons)=>{
    if(audio.paused){
        audio.play()
        changeICon('fa-pause','fa-play',playButtons)  
    }else{
        audio.pause()
        changeICon('fa-play','fa-pause',playButtons)
    }  
 }

let audio = document.querySelector("audio")

function cambiarCancion (songNames){
    audio.src = songNames[0].song 
    songNames[0].contenedor.classList.add("orange")

    let playButtons = document.querySelectorAll(".playBtn") 
    let newIndex = 0
   
    playButtons.forEach((playButton,index) =>{   
        function reproducir(){
            let buttons = []
                playButtons.forEach((btn,secondIndex)=>{
                    if(index != 10){
                    
                        if(secondIndex != index){
                            btn.classList.add('fa-play')
                            btn.classList.remove('fa-pause')
                            btn.parentNode.classList.remove("orange")
                          
                        }
                    }
                   
                })
                if(index !=10){  
                    buttons = [playButton,playButtons[10]]
                    newIndex = index
                     playButton.parentNode.classList.add("orange")
                   
    
                    if(audio.src == songNames[index].song){
                        play(buttons)
                    }else{
                        audio.src = songNames[index].song
                        play(buttons) 
                    } 
                }else{            
                    buttons=[playButton,playButtons[newIndex]]
                    play(buttons)
                }
        }
        playButton.addEventListener('click',()=>{
            reproducir()
        }) 
        playButton.parentNode.addEventListener('dblclick',()=>{
            reproducir()
        })
        
    })
    audio.onended = ()=>{changeICon('fa-play','fa-pause',playButtons)} 
}
// Funcion para convertir milisegundos a formato minutos:segundos
 let msToMinutes = ms => {
    let minutos = Math.floor(ms / 60000);
    let segundos = ((ms % 60000) / 1000).toFixed(0);
    return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
 }

let timeline = document.querySelector('.timeline');

//Sincronizar la linea de tiempo del input range con la de la cancion

window.onload = ()=>{timeline.value = 0}

let cambiarPosicion = ()=> {
  let porcentaje = (100*audio.currentTime) / audio.duration;
  timeline.style.backgroundSize = `${porcentaje}% 100%`;
  timeline.value = porcentaje;
}

audio.ontimeupdate = cambiarPosicion;

let cambiarLinea = ()=> {
    let tiempo = (timeline.value * audio.duration) / 100;
    audio.currentTime = tiempo;
  }
  
timeline.addEventListener('change', cambiarLinea)

//aplicar estilos al backgroud de la linea del range cuando se maneja manualmente la linea del range

let rangeInputs = document.querySelectorAll('input[type="range"]')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

// Cambiar icono de volumen dependiendo del nivel de volumen

let volumeline = document.querySelector('.volumeline')
 let volumeIcon = document.querySelector('.volumeIcon')
 
 volumeIcon.addEventListener('click',()=>{

 })
volumeline.addEventListener('change',()=>{
   
    let volume = volumeline.value / 100;
    if(volume == 0){
        volumeIcon.classList.add("fa-volume-xmark")
        volumeIcon.classList.remove("fa-volume-high")
        volumeIcon.classList.remove("fa-volume-low")
    }else if(volume > 0.5){
        volumeIcon.classList.remove("fa-volume-xmark")
        volumeIcon.classList.add("fa-volume-high")
        volumeIcon.classList.remove("fa-volume-low")
    }else{
        volumeIcon.classList.remove("fa-volume-xmark")
        volumeIcon.classList.remove("fa-volume-high")
        volumeIcon.classList.add("fa-volume-low")
    }
    audio.volume = volume;
})
 

//buscador

let inputSearch = document.querySelector("#searchBar")

inputSearch.addEventListener("input",e =>{
    let value = e.target.value.toLowerCase().replace(/ /g,"");

    songNames.forEach(songName =>{
        let name = songName.titulo.toLowerCase().replace(/ /g,"");

        let isVisible = name.includes(value)
        songName.contenedor.classList.toggle("hide",!isVisible)
        
    })
    
})