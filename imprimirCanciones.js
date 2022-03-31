

export function imprimirCanciones(canciones,info){
    const songTemplates = document.querySelector("[data-song-template]")
    const container = document.querySelector("[data-container]")
    const notValidTemplate = document.querySelector("[data-invalidSong]")
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

    nombreArtista.textContent = info.nombre
 
    

    let cancionesDisponibles = canciones.tracks.filter(track =>track.preview_url != null)
    let cancionesNoDisponibles = canciones.tracks.filter(track =>track.preview_url == null)
  
    let songNames = cancionesDisponibles.map((track,index) => {
       
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
    cancionesNoDisponibles.forEach(cancion => {
        let contain = notValidTemplate.content.cloneNode(true).children[0]
        let img = contain.querySelector("img")
        let songName = contain.querySelector(".nombre")
        let album = contain.querySelector("p")
        let year = contain.querySelector("small")
        let i = contain.querySelector("h6")
        let duration  = contain.querySelector(".duration")

        img.src = cancion.album.images[0].url
        img.height = cancion.album.images[2].height
        img.width = cancion.album.images[2].width
        
        songName.textContent = cancion.name
        album.textContent = cancion.album.name    
        year.textContent =cancion.album.release_date.substring(0,4)
        
        duration.textContent = msToMinutes(cancion.duration_ms)


        container.appendChild(contain)
    });
    r.appendChild(reproductor)


    let infos = document.querySelector('.side .about')

    infos.querySelector('#followers').textContent = Intl.NumberFormat("es-Es").format(info.followers)
    infos.querySelector('#popular').textContent = `${info.pop}%`
    info.generos.forEach(genero=>{
        let gen = document.createElement('div')
        gen.classList.add("py-2","rounded-pill","orange","mb-2","px-4")
        gen.textContent = genero
        infos.querySelector("#genres").appendChild(gen)
    })
   
    return songNames
}

