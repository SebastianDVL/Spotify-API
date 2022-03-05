
const URI = "https://api.spotify.com/v1/artists/5NGO30tJxFlKixkPSgXcFE/top-tracks?market=US"
const TOKEN = "Bearer BQACRvjItRowHQpyhbuJ2nxvWwUvp36ci7AycyY-v9h1zwR65VqNWRaPMf7vom9jys6X6N3cNX8vd0P3G9WytcTAFESCNZmD3P6bOdrvU4LuYdCnSXfcQM0XXEWND3-XslysPHIuHlikj-F5"

let parametrosPeticion = {
    method:"GET",
    headers:{
        Authorization:TOKEN
    }  
}

const songTemplates = document.querySelector("[data-song-template]")
const container = document.querySelector("[data-container]")
let audio = document.querySelector("audio")
fetch(URI,parametrosPeticion)
.then(res=>res.json())
.then(data=>{
    let songs = []
    let songContainers = []
    let songNames ={}

    songNames = data.tracks.map((track,index) => {
        let cont= songTemplates.content.cloneNode(true).children[0]
        let img = cont.querySelector("img")
        let songName = cont.querySelector(".name")
        let album = cont.querySelector("p")
        let year = cont.querySelector("small")
        let i = cont.querySelector("h6")
        let duration  = cont.querySelector(".duration")

        songs.push(track.preview_url)
        songContainers.push(cont)

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
    audio.src = data.tracks[0].preview_url
    songContainers.forEach(song => {
        let play =  song.querySelector(".fa-play")
        song.addEventListener('mouseover', () => { 
           play.classList.toggle("invisible")
        })
        song.addEventListener('mouseout', () => { 
            play.classList.toggle("invisible")
         })
    })

    cambiarCancion(songNames)
   
})
.catch(respuestaERROR=>console.log(respuestaERROR))

let playButton = document.querySelector('.playBtn')


let changeICon = (add,remove)=>{
    playButton.classList.add(add)
    playButton.classList.remove(remove)
 }

let play = ()=>{
    if(audio.paused){
        audio.play()
        changeICon('fa-pause','fa-play')
    }else{
        audio.pause()
        changeICon('fa-play','fa-pause')
    }  
 }

 playButton.addEventListener('click',play)


function cambiarCancion (songNames){
       
     songNames.forEach((songName,index) =>{
       
        songName.contenedor.addEventListener('click',e=>{
            let target = e.target
            let icons = document.querySelectorAll(".playBtn")
            if(target == icons[index]){
                
                audio.src = songName.song
                console.log(songName)
                play()
            }
        })
     })
      audio.onended = ()=>{changeICon('fa-play','fa-pause')}
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

volumeline.addEventListener('change',()=>{
    let volumeIcon = document.querySelector('.volumeIcon')
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
 



