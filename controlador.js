import {consumirAPI} from './service.js'
import {imprimirCanciones}from './imprimirCanciones.js' 
import {manejarReproductor} from './reproductor.js'
import {reproducirCanciones} from './reproducirCanciones.js'
import {buscarCanciones} from './buscador.js'

let canciones = await consumirAPI()

let songs =  imprimirCanciones(canciones)
let audio = document.querySelector("audio")

reproducirCanciones(songs,audio)
manejarReproductor(audio)
buscarCanciones(songs)



