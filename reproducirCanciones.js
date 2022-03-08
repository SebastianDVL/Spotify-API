export function reproducirCanciones(songs,audio){
    songs.forEach(song => {
        let play =  song.contenedor.querySelector(".fa-play")
        song.contenedor.addEventListener('mouseover', () => { 
           play.classList.toggle("invisible")
        })
        song.contenedor.addEventListener('mouseout', () => { 
            play.classList.toggle("invisible")
         })
    })

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
    
        let playButtons = document.querySelectorAll(".playBtn") 
        let newIndex = 0
       
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
            playButton.addEventListener('click',()=>{
                reproducir()
            }) 
            playButton.parentNode.addEventListener('dblclick',()=>{
                reproducir()
            })
            
        })
        audio.onended = ()=>{changeICon('fa-play','fa-pause',playButtons)} 
    

}