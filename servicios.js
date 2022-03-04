
const URI = "https://api.spotify.com/v1/artists/5NGO30tJxFlKixkPSgXcFE/top-tracks?market=US"
const TOKEN = "Bearer BQAdqx8bz7A_eIjBpVOYKqqST6LonyH3omq15uRV72I5kwGQ9xmqgSagMDtJ_PqBWXkbN3_aZ12ahPH0SZozjHEMKCcFBnDHg4hHFTXC-xwO-w3r_Rh2C6XcSWA8oehidm4Yw6G7z34B7lbk"

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
    let songs = []
let songContainers = []

    data.tracks.forEach((track,index) => {
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
        
    })
    songContainers.forEach(song => {
        let play =  song.querySelector(".fa-play")
        song.addEventListener('mouseover', () => { 
           play.classList.toggle("invisible")
        })
        song.addEventListener('mouseout', () => { 
            play.classList.toggle("invisible")
         })
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

 



