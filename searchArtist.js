import {consumirAPI}from "./service.js"

export function buscarArtista(){
    let search  = document.querySelector('#searchArtist')
    let dataArtist = document.querySelector('[data-artist]')
    let containerArtists = document.querySelector('[data-container-artists]')
    let uris = [0,2]
 
    search.addEventListener('change',async e=>{
        let value = e.target.value.replace(" ","%20");
        containerArtists.innerHTML = ""
        if(value !== ""){
            let uri = `https://api.spotify.com/v1/search?q=${value}&type=artist&limit=5&offset=0`
            let artistas = await consumirAPI(uri);

            uris = artistas.artists.items.map(item => {
                let artist = dataArtist.content.cloneNode(true).children[0]
                let nombreArtista = artist.querySelector('button')
                console.log(item)
                nombreArtista.textContent = item.name

                containerArtists.appendChild(artist)

                return{uri: `https://api.spotify.com/v1/artists/${item.id}/top-tracks?market=US`,img: item.images[0].url}
            });
        }else{
            uris=[0]
        }
        console.log(uris)
        return uris
    })
    return uris
 
    
}
