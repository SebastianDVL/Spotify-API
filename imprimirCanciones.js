

export function imprimirCanciones(canciones,info){
    const songTemplates = document.querySelector("[data-song-template]")
    const container = document.querySelector("[data-container]")

    const reproductor = document.querySelector("[data-reproductor]").content.cloneNode(true).children[0]
    const r = document.querySelector('.r')

    const spotifyRef = document.querySelector('.spotifyLink')
    spotifyRef.href = canciones.tracks[0].artists[0].external_urls.spotify

    let msToMinutes = ms => {
        let minutos = Math.floor(ms / 60000);
        let segundos = ((ms % 60000) / 1000).toFixed(0);
        return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
     }

    
    let nombreArtista = document.querySelector('.artista')
    if(canciones.tracks[0].artists.length > 1) {
        nombreArtista.textContent = canciones.tracks[0].artists[canciones.tracks[0].artists.length-1].name
    }else{
        nombreArtista.textContent = canciones.tracks[0].artists[0].name
    }
    

    let nuevasCanciones = canciones.tracks.filter(track =>track.preview_url != null)
   
  
    let songNames = nuevasCanciones.map((track,index) => {
       
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
        
        return {contenedor:cont, titulo:track.name,song:track.preview_url,album:track.album.name,img:track.album.images,popularity:track.popularity,artista:canciones.tracks[0].artists[0].name}
        
    })
    
    r.appendChild(reproductor)


    let infos = document.querySelector('.side div')

    infos.innerHTML = `<h2><span class="blue">Followers :</span> ${Intl.NumberFormat('es-ES').format(info.followers)}</h2><h2><span class="blue">Generos: </span> ${info.generos}</h2><h2><span class="blue">Popularidad: </span>${info.pop}</h2>`
   
    return songNames
}

