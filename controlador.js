import {consumirAPI} from './service.js'

// import {buscarArtista} from './searchArtist.js'
import{checkAndExecute} from './ejecutarFunciones.js'

// buscarArtista()


let search  = document.querySelector('#searchArtist')
let dataArtist = document.querySelector('[data-artist]')
let containerArtists = document.querySelector('[data-container-artists]')


search.addEventListener('change',async e=>{
    let value = e.target.value.replace(" ","%20");
    containerArtists.innerHTML = ""
    if(value != ""){
        let uri = `https://api.spotify.com/v1/search?q=${value}&type=artist&limit=5&offset=0`
        let data = await consumirAPI(uri);
        console.log(data)
        if(data.artists.items.length == 0){
            containerArtists.innerHTML = "Not Found..."
        }
        let artistas = data.artists.items.map(item => {
            let artist = dataArtist.content.cloneNode(true).children[0]
            let nombreArtista = artist.querySelector('button')
            let ima = artist.querySelector('img')

            nombreArtista.innerHTML += item.name

            let im

            if (item.images.length > 0){
                im =  item.images[0].url
                ima.src = item.images[1].url
            }else{
                im = "img/unaveilable.png"
                ima.src = im
            }

            containerArtists.appendChild(artist)
            return{uri: `https://api.spotify.com/v1/artists/${item.id}/top-tracks?market=CO`,img: im,btn:nombreArtista,followers: item.followers.total,generos: item.genres,pop:item.popularity}
        });
        artistas.forEach((button,index)=>{
            button.btn.addEventListener('click',async()=>{
                let canciones = await consumirAPI(artistas[index].uri)
                let isAvailable = canciones.tracks.every(track => track.preview_url == null)
                if(!isAvailable){
                   checkAndExecute(index,artistas,canciones) 
                }else{
                    alert("Este artista no esta disponible")
                }
                
            })     
        })
    }
    
    
})



    
window.addEventListener('keydown', (e) => {  
    if (e.keyCode === 32 && e.target === document.body) {  
      e.preventDefault();  
    }  
  });




