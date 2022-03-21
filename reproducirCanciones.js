
export function reproducirCanciones(songs,audio){
    //llamo a todos los botones de de play
    let playButtons = document.querySelectorAll(".playBtn")
    playButtons[0].classList.remove("invisible")

    // Funcion para cambiar el icono dependiendo de si esta reproduciendo o pausado el audio
    let changeICon = (add,remove,playButtons)=>{
            playButtons.forEach(playButton => {
                playButton.classList.add(add)
                playButton.classList.remove(remove)
            })
            
    }

    //Cambiar Todos los iconos por defecto a play
    changeICon('fa-play','fa-pause',playButtons)


    //funcion  para reproducir audio si esta pausado o pausar si esta reproduciendo y llamando a la funcion de cambiar el icono
    let play = (playButtons)=>{
        if(audio.paused){
            audio.play()
            changeICon('fa-pause','fa-play',playButtons)  
        }else{
            audio.pause()
            changeICon('fa-play','fa-pause',playButtons)
        }  
    }
     
    //el src por defecto del audio va a ser el de la primer cancion
    audio.src = songs[0].song 

    //Agregro por defecto los estilos de cancion actual a la primer cancion
    songs[0].contenedor.classList.add("orange")

    //Declaro variables de los elementos del reproductor donde ira la informacion de la cancion actual que se esta reproduciendo

    let audioPlayer = document.querySelector('.audio-player')
    let img = audioPlayer.querySelector('img')
    let name = audioPlayer.querySelector('.nombre')
    let album = audioPlayer.querySelector('em')
    let popularity = audioPlayer.querySelector('small')

    //funcion para para pintar los datos de la cancion actual que se esta reproduciendo en el reproductor
    function print(n){
        name.textContent = songs[n].titulo
        album.textContent = songs[n].album
        img.src = songs[n].img[2].url
        img.height = songs[n].img[2].height
        img.width = songs[n].img[2].width
        popularity.textContent = `Popularity: ${songs[n].popularity}`
    }
    //se pinta los datos de la primera cancion que esta por defecto al cargar el artista
    print(0)

    //declaro un nuevo index que servira para tener control de cual es la cancion que se estara reproduciendo (por defecto la primera)
    let newIndex = 0

    //declaro un array de botones, los dos botones que seran condigurados con la funcion "changeIcon" de arriba cuando se reproduzca una cancion
    let buttons = []
    

    //botones de anterior y siguiente cancion
    let changeButtons = document.querySelectorAll('.change')


    //Bonton de random con evento de click para activar o desactivar reproduccion random

    let random = document.querySelector('.random');

    let sw = false
    random.addEventListener('click',()=>{
        sw = !sw
        random.classList.toggle("on")
    })
    let numeros = [0]
    let randomNumber
    //Se llama a todos los botones para sus respectivas funciones
    playButtons.forEach((playButton,index) =>{  
        
        //funcion de reproducir con parametros de botones a estilar o cambiar e index del boton y cancion a reproducir
        function reproducir(botones,i){
            //funcion para mostrar efecto de animacion de musica sonando cuando la cancion se este reproduciendo
            function hideOrShowWaves(p) {   
                if(audio.paused){
                    playButtons[p].parentNode.querySelector('.number').classList.add("d-hide")
                    playButtons[p].parentNode.querySelector('#bar').classList.remove("d-hide")
                }else{
                    playButtons[p].parentNode.querySelector('.number').classList.toggle("d-hide")
                    playButtons[p].parentNode.querySelector('#bar').classList.toggle("d-hide")
                } 
            }
            
            //Se quitan los estilos de cancion actual al resto de las canciones exceptuando la actual
            playButtons.forEach((btn,secondIndex)=>{
                if(i != 10){                 
                    if(secondIndex != i){
                        btn.classList.add('fa-play')
                        btn.classList.remove('fa-pause')
                        btn.parentNode.classList.remove("orange")
                        if(secondIndex !=10){
                            btn.classList.add("invisible")
                            btn.parentNode.querySelector(".number").classList.remove("d-hide")
                            btn.parentNode.querySelector('#bar').classList.add("d-hide")
                        }   
                    }
                }   
            })
            //se reproduce la cancion y se le da estilo a sus respectivos botones y contenedor dependiendo del boton que precione, ya sea del reproductos o de la cancion en si
            if(i !=10){  
                print(i)
                newIndex = i
                playButtons[i].parentNode.classList.add("orange")
                playButtons[i].classList.remove("invisible")
                
                if(i != numeros[numeros.length - 1]){
                      numeros.push(i)
                }
              
                console.log(numeros)
                hideOrShowWaves(i)
                
                if(audio.src == songs[i].song){
                    play(botones)
                }else{
                    audio.src = songs[i].song
                    play(botones) 
                } 
            }else{
                hideOrShowWaves(newIndex)
                play(botones)

            }
        }
        // if(index == 0){
        //     reproducir([playButtons[10],playButtons[0]],0)
        // }
        
        //evento de click para todos los botones de play que llaman a la funcion reproducir con sus repestivos botones e indice
        playButton.addEventListener('click',e =>{
            e.preventDefault();
            e.stopImmediatePropagation();
            if(index != 10){
                buttons = [playButton,playButtons[10]]
                reproducir(buttons,index)
            }else{
                buttons=[playButton,playButtons[newIndex]]
                reproducir(buttons,index)
            }
        }) 
        //evento de doble click para todos los contenedores de las canciones(10) tambien reproduce cancion con la funcion reproducir
        playButton.parentNode.addEventListener('dblclick',(e)=>{
            e.preventDefault();
            e.stopImmediatePropagation();
            buttons = [playButton,playButtons[10]]
            if(index!= 10)reproducir(buttons,index)
        }) 
        //evento click para los botones de cancion anterior o cancion siguiente con la funcion reproducir
        changeButtons.forEach((cButton, ind)=>{
            cButton.addEventListener('click',(e)=>{
                e.preventDefault();
                e.stopImmediatePropagation();
                if(ind == 1){
                    if(sw){
                        randomNumber = Math.floor(Math.random() * 10)      
                        while(randomNumber == newIndex){
                            randomNumber = Math.floor(Math.random() * 10)      
                        }  
                        reproducir([playButtons[10],playButtons[randomNumber]],randomNumber)

                    }else{
                        if(newIndex < 9 ){
                            buttons = [playButtons[10],playButtons[newIndex+1]]
                            reproducir(buttons,newIndex+1)
                        }else{
                            buttons = [playButtons[10],playButtons[0]]
                            reproducir(buttons,0)
                        } 
                    }
                                      
                }else{
                    if(numeros.length > 1){
                         numeros.pop()
                        buttons = [playButtons[10],playButtons[numeros[numeros.length -1]]]
                        reproducir(buttons,numeros[numeros.length -1])
                    }             
                }
            
            })
        })

        //evento de audio terminado que permite que se sigan reproduciendo la siguiente cancion despues de que se termine la actual
        audio.onended = (e)=>{
            e.preventDefault();
            e.stopImmediatePropagation();

            if(sw){
                randomNumber = Math.floor(Math.random() * 10)      
                        while(randomNumber == newIndex){
                            randomNumber = Math.floor(Math.random() * 10)      
                        }  
                        reproducir([playButtons[10],playButtons[randomNumber]],randomNumber)
            }else{
                 if(newIndex < 9 ){
                    buttons = [playButtons[10],playButtons[newIndex+1]]
                    reproducir(buttons,newIndex+1)
                }else{
                    playButtons[9].parentNode.querySelector('.number').classList.toggle("d-hide")
                    playButtons[9].parentNode.querySelector('#bar').classList.toggle("d-hide")
                    changeICon('fa-play','fa-pause',playButtons)
                }
            }
           
        }
    }) 
   
    
   
}