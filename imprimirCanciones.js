export function imprimirCanciones(canciones){
    const songTemplates = document.querySelector("[data-song-template]")
    const container = document.querySelector("[data-container]")

    let msToMinutes = ms => {
        let minutos = Math.floor(ms / 60000);
        let segundos = ((ms % 60000) / 1000).toFixed(0);
        return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
     }

    let nombreArtista = document.querySelector('.artista')
    nombreArtista.textContent = canciones.tracks[0].artists[0].name

    let songNames = canciones.tracks.map((track,index) => {
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
        
        return {contenedor:cont, titulo:track.name,song:track.preview_url,album:track.album.name,img:track.album.images}
    })
    return songNames
}