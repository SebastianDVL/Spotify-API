
export function reproducirCanciones(songs,audio,newIndex){
    songs.forEach(song => {
        let play =  song.contenedor.querySelector(".fa-play")
        song.contenedor.addEventListener('mouseover', () => { 
           play.classList.toggle("invisible")
        })
        song.contenedor.addEventListener('mouseout', () => { 
            play.classList.toggle("invisible")
         })
    })
    let playButtons = document.querySelectorAll(".playBtn") 
    let changeICon = (add,remove,playButtons)=>{
        playButtons.forEach(playButton => {
            playButton.classList.add(add)
            playButton.classList.remove(remove)
        })
        
     }
    
    let play = (playButtons)=>{
        if(audio.paused){
            audio.play()
            changeICon('fa-pause','fa-play',playButtons)  
        }else{
            audio.pause()
            changeICon('fa-play','fa-pause',playButtons)
        }  
     }
    
    
    audio.src = songs[0].song 
    songs[0].contenedor.classList.add("orange")

    let audioPlayer = document.querySelector('.audio-player')
    let img = audioPlayer.querySelector('img')
    let name = audioPlayer.querySelector('.nombre')
    let album = audioPlayer.querySelector('p')

    name.textContent = songs[0].titulo
    album.textContent = songs[0].album
    img.src = songs[0].img[2].url
    img.height = songs[0].img[2].height
    img.width = songs[0].img[2].width
    
    
  
    
    playButtons.forEach((playButton,index) =>{   
        function reproducir(){
            let buttons = []
                playButtons.forEach((btn,secondIndex)=>{
                if(index != 10){
                        if(secondIndex != index){
                            btn.classList.add('fa-play')
                            btn.classList.remove('fa-pause')
                            btn.parentNode.classList.remove("orange")
                        }
                    }
                    
                })
                if(index !=10){  
                    name.textContent = songs[index].titulo
                    album.textContent = songs[index].album
                    img.src = songs[index].img[2].url
                    img.height = songs[index].img[2].height
                    img.width = songs[index].img[2].width
                    buttons = [playButton,playButtons[10]]
                    newIndex = index
                    playButton.parentNode.classList.add("orange")
                    
    
                    if(audio.src == songs[index].song){
                        play(buttons)
                    }else{
                        audio.src = songs[index].song
                        play(buttons) 
                    } 
                }else{            
                    buttons=[playButton,playButtons[newIndex]]
                    play(buttons)
                }

        }
        playButton.addEventListener('click',reproducir) 
        playButton.parentNode.addEventListener('dblclick',()=>{
            if(index!= 10)reproducir()
        })   
        
    }) 
   
    audio.onended = ()=>{changeICon('fa-play','fa-pause',playButtons)} 
}