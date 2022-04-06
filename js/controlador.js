import {consumirAPI} from './service.js'
import{checkAndExecute} from './ejecutarFunciones.js'


//declaro variables globales
let search  = document.querySelector('#searchArtist')
let dataArtist = document.querySelector('[data-artist]')
let containerArtists = document.querySelector('[data-container-artists]')

//evento de 'change' para el input de busqueda
search.addEventListener('change',async e=>{
    //el valor que se digite se formatea para llevarlo a la uri (espacios reemplazados)
    let value = e.target.value.replace(" ","%20");
    //se resetea el contenedor de los resultados buscados (vacio por defecto)
    containerArtists.innerHTML = ""

    if(value != ""){
        //se ejecuta cuando el usuario digite algo diferente de nada

        //se declara la variable que contiene el ENDPOINT(con el valor digitado) de busqueda que ofrece spotify para consumir api
        let uri = `https://api.spotify.com/v1/search?q=${value}&type=artist&limit=5&offset=0`

        //traen los datos de la api con la uri declarada y el valor de busqueda
        let data = await consumirAPI(uri);

        if(data.artists.items.length == 0){
            //Si no se encuentra ningun artista
            containerArtists.innerHTML = "Not Found..."
        }

        
        let artistas = data.artists.items.map(item => {
            //se imprimen los artistas encontrados por la barra de busqueda en el contenedor "containerArtists"
            let artist = dataArtist.content.cloneNode(true).children[0]
            let nombreArtista = artist.querySelector('button')
            let ima = artist.querySelector('img')

            nombreArtista.innerHTML += item.name

            let im

            //si el artista no tiene una imagen disponible, se pondra una por defecto
            if (item.images.length > 0){
                im =  item.images[0].url
                ima.src = item.images[1].url
            }else{
                im = "img/unaveilable.png"
                ima.src = im
            }

            containerArtists.appendChild(artist)

            //utilizo .map para retornar mas organizadamente en un objeto atributos necesarios que se utilizaran para imprimir la informacion del artista en el apartado de info
            return{uri: `https://api.spotify.com/v1/artists/${item.id}/top-tracks?market=CO`,img: im,btn:nombreArtista,followers: item.followers.total,generos: item.genres,pop:item.popularity,nombre:item.name}
        });

        //Evento de click para cada artista encontrado por medio de la busqueda
        artistas.forEach((button,index)=>{
            button.btn.addEventListener('click',async()=>{
                //se consume api y se traen las canciones dependiendo del artista al que se le dio click (index)
                let canciones = await consumirAPI(artistas[index].uri)

                //variable que retorna true si ninguna de las canciones del artista esta disponible
                let isNotAvailable = canciones.tracks.every(track => track.preview_url == null)

                //si el artista tiene almenos una cancion disponible se ejecutaran las funciones respectivas para imprimir y reproducirCanciones canciones
                //de lo contrario si el artista no tiene ninguna cancion disponible se saca un aviso de copyright
                if(!isNotAvailable){
                   checkAndExecute(index,artistas,canciones) 
                }else{
                   let invalidArtistModal = new bootstrap.Modal(document.getElementById('invalidArtist'))
                   invalidArtistModal.show()
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






