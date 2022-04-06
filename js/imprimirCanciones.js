
export function imprimirCanciones(canciones,info){
    //SE declaran variables globales donde se imprimira todo
    const songTemplates = document.querySelector("[data-song-template]")
    const container = document.querySelector("[data-container]")
    const notValidTemplate = document.querySelector("[data-invalidSong]")
    const reproductor = document.querySelector("[data-reproductor]").content.cloneNode(true).children[0]
    const r = document.querySelector('.r')

    //se pone el link de spotify del artista en el boton de "listen on spotify"
    const spotifyRef = document.querySelector('.spotifyLink')
    spotifyRef.href = canciones.tracks[0].artists[0].external_urls.spotify

    //funcion para convertir milisegundos en formato minutos:segundos
    let msToMinutes = ms => {
        let minutos = Math.floor(ms / 60000);
        let segundos = ((ms % 60000) / 1000).toFixed(0);
        return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
    }

    
    //se pone el nombre del artista en el banner
    let nombreArtista = document.querySelector('.artista')

    nombreArtista.textContent = info.nombre
 
    
    // se filtran y se separan las canciones que estan diponibles y las que NO estan disponibles
    let cancionesDisponibles = canciones.tracks.filter(track =>track.preview_url != null)
    let cancionesNoDisponibles = canciones.tracks.filter(track =>track.preview_url == null)
  

    let songNames = cancionesDisponibles.map((track,index) => {
        // se imprimen las canciones disponibles con su respectiva informacion en el contenedor de canciones
        let cont= songTemplates.content.cloneNode(true).children[0]
        let img = cont.querySelector("img")
        let songName = cont.querySelector(".nombre")
        let album = cont.querySelector("p")
        let year = cont.querySelector("small")
        let i = cont.querySelector("h6")
        let duration  = cont.querySelector(".duration")
        
        //se imprime imagen
        img.src = track.album.images[0].url
        img.height = track.album.images[2].height
        img.width = track.album.images[2].width
        
        //se imprime info de la cancion
        songName.textContent = track.name
        album.textContent = track.album.name    
        year.textContent =track.album.release_date.substring(0,4)
        i.textContent = index + 1
        
        //se convierte los milisegundos al formato minutos:segundos con la funcion creada anteriormente
        duration.textContent = msToMinutes(track.duration_ms)


        container.appendChild(cont)
        //se retorna informacion de la cacion y su respectivo contenedor en un arreglo de objetos para posteriormente utilizar en la funcion "reproducirCanciones"
        return {contenedor:cont, titulo:track.name,song:track.preview_url,album:track.album.name,img:track.album.images,popularity:track.popularity,artista:canciones.tracks[0].artists[0].name,ind:index}
        
    })

    cancionesNoDisponibles.forEach(cancion => {
        //se imprimen las canciones no disponibles con estidlo diferentes para diferencialas de las otras 
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

    //se muestra el reproductor
    r.appendChild(reproductor)

   
    //variable que tra el contenedor donde ira la informacion del artsita
    let infos = document.querySelector('.side .about')

    //Se imprime en sus repectivos contenedores la informacion del artista traida del paramaetro "Infos" que es el objeto "artistas" creado en el controlador
    infos.querySelector("#genres").innerHTML = " "
    infos.querySelector('#followers').textContent = Intl.NumberFormat("es-ES").format(info.followers)
    infos.querySelector('#popular').textContent = `${info.pop}%`

    //se imprime los generos del artista en su respectivo contenedor
    if(info.generos.length > 0){
        info.generos.forEach(genero=>{
            let gen = document.createElement('div')
            gen.classList.add("py-2","rounded-pill","orange","mb-3","px-4")
            gen.textContent = genero
            infos.querySelector("#genres").appendChild(gen)
        })
    }else{
        //si el artista no tra generos se imprime un contenedor por defecto
        let gen = document.createElement('div')
        gen.classList.add("py-2","rounded-pill","orange","mb-3","px-4")
        gen.textContent = "Not Found..."
        infos.querySelector("#genres").appendChild(gen)
    }
   
    //retorno el arreglo de objetos con los contenedores de las canciones
    return songNames
}

