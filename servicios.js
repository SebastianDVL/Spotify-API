
const URI = "https://api.spotify.com/v1/artists/5NGO30tJxFlKixkPSgXcFE/top-tracks?market=US"
const TOKEN = "Bearer BQBcI5Q8a3e4135K9A2oytlG3DVenxll6BUyoEMAGu4VzN4e48G_Bc2EfSnVSNJgB8PN0cM5-0rGft-ZW3yFUZnWAOEtxLaeWJfBWZ3ULXg42UQUXNFobPkxdze8_CxC8Fhx1mBExidbp9zx"

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
    data.tracks.forEach((track,index) => {
        let cont= songTemplates.content.cloneNode(true).children[0]
        let img = cont.querySelector("img")
        let songName = cont.querySelector(".name")
        let album = cont.querySelector("p")
        let year = cont.querySelector("small")
        let i = cont.querySelector("h6")
        let duration  = cont.querySelector(".duration")
        let audio = cont.querySelector("audio")
        img.src = track.album.images[0].url
        img.height = track.album.images[2].height
        img.width = track.album.images[2].width
        songName.textContent = track.name
        album.textContent = track.album.name
        audio.src = track.preview_url
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




