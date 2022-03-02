
const URI = "https://api.spotify.com/v1/artists/5NGO30tJxFlKixkPSgXcFE/top-tracks?market=US"
const TOKEN = "Bearer BQDyoS99-93q6wi_dCpHejnV_96WAEseVO7v36JZmDvBJBv7FCRVPqTxtWovCgprP40cHCrVsHQ-EhbabaC1tGnwdX6hfZkLdzsWkxFLDJDfuu0m-SYmx-0Q9uIQJlU99Axxz5OZEVBBR07C"

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
.then(data =>{
    data.tracks.forEach(track => {
        const cont= songTemplates.content.cloneNode(true).children[0]
        const img = cont.querySelector("img")
        const songName = cont.querySelector("p")
        img.src = track.album.images[0].url
        img.height = track.album.images[2].height
        img.width = track.album.images[2].width
        songName.textContent = track.name
        container.appendChild(cont)
        console.log(track)
    });
})
.catch(respuestaERROR=>console.log(respuestaERROR))






