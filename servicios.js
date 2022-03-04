
const URI = "https://api.spotify.com/v1/artists/5NGO30tJxFlKixkPSgXcFE/top-tracks?market=US"
const TOKEN = "Bearer BQC19z6dVZOaYmXzw2ZqHXlmGwUZ-NYyV84rOuWudcDZA1cRwjCGhOifNE09md7fEilMNkm_bQX4zmBE5k9GJRd3EzMAWdlU_KCAEniNwBoG5up0U7O19ZZ9CgeRxq6otpJd-Zoxvs5nXtp8"

let parametrosPeticion = {
    method:"GET",
    headers:{
        Authorization:TOKEN
    }  
}

const songTemplates = document.querySelector("[data-song-template]")
const container = document.querySelector("[data-container]")
fetch(URI,parametrosPeticion)
.then(res=>res.json())
.then(data=>{
    let audio = document.querySelector("audio")
    audio.src = data.tracks[0].preview_url

    data.tracks.forEach((track,index) => {
        let cont= songTemplates.content.cloneNode(true).children[0]
        let img = cont.querySelector("img")
        let songName = cont.querySelector(".name")
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
    })
})
.catch(respuestaERROR=>console.log(respuestaERROR))

function msToMinutes(ms) {
    let minutos = Math.floor(ms / 60000);
    let segundos = ((ms % 60000) / 1000).toFixed(0);
    return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
 }

let playButton = document.querySelector('.fa-play')
let audio = document.querySelector("audio")
 playButton.addEventListener('click',()=>{
     audio.play()
 })




