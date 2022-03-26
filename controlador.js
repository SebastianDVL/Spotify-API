import {consumirAPI} from './service.js'

// import {buscarArtista} from './searchArtist.js'
import{checkAndExecute} from './ejecutarFunciones.js'

// buscarArtista()


let search  = document.querySelector('#searchArtist')
let dataArtist = document.querySelector('[data-artist]')
let containerArtists = document.querySelector('[data-container-artists]')
let canciones ={}

search.addEventListener('change',async e=>{
    let value = e.target.value.replace(" ","%20");
    containerArtists.innerHTML = ""
    if(value != ""){
        let uri = `https://api.spotify.com/v1/search?q=${value}&type=artist&limit=5&offset=0`
        let artistas = await consumirAPI(uri);
        console.log(artistas)
        let uris = artistas.artists.items.map(item => {
            let artist = dataArtist.content.cloneNode(true).children[0]
            let nombreArtista = artist.querySelector('button')
            nombreArtista.innerHTML += item.name

            containerArtists.appendChild(artist)
            let im
            if (item.images.length > 0){
                im =  item.images[0].url
            }else{
                im = ""
            }
            

            return{uri: `https://api.spotify.com/v1/artists/${item.id}/top-tracks?market=US`,img: im,btn:nombreArtista}
        });
        uris.forEach((button,index)=>{
            button.btn.addEventListener('click',async()=>{
                canciones = await consumirAPI(uris[index].uri)
                checkAndExecute(index,uris,canciones)
            })     
        })
    }else{
        uris=[]
    }
    
    
})



    
window.addEventListener('keydown', (e) => {  
    if (e.keyCode === 32 && e.target === document.body) {  
      e.preventDefault();  
    }  
  });




