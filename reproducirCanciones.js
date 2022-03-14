
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
    let playButtons = document.querySelectorAll(".playBtn")
   
    let changeICon = (add,remove,playButtons)=>{
        playButtons.forEach(playButton => {
            playButton.classList.add(add)
            playButton.classList.remove(remove)
        })
        
     }
    changeICon('fa-play','fa-pause',playButtons)
    
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
    let album = audioPlayer.querySelector('em')
    let popularity = audioPlayer.querySelector('small')

    function print(n){
        name.textContent = songs[n].titulo
        album.textContent = songs[n].album
        img.src = songs[n].img[2].url
        img.height = songs[n].img[2].height
        img.width = songs[n].img[2].width
        popularity.textContent = `Popularity: ${songs[n].popularity}`
    }
    print(0)
    
    let newIndex = 0
    let buttons = []
    
    let changeButtons = document.querySelectorAll('.change')

    playButtons.forEach((playButton,index) =>{  
        
        function reproducir(botones,i){

            playButtons.forEach((btn,secondIndex)=>{
            if(i != 10){                 
            if(secondIndex != i){
                        btn.classList.add('fa-play')
                        btn.classList.remove('fa-pause')
                        btn.parentNode.classList.remove("orange")
                    }
                }
                
            })
            if(i !=10){  
                print(i)
                newIndex = i
                playButtons[i].parentNode.classList.add("orange")
                

                if(audio.src == songs[i].song){
                    play(botones)
                }else{
                    audio.src = songs[i].song
                    play(botones) 
                } 
            }else{          
           
                play(botones)

            }

        }
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

        playButton.parentNode.addEventListener('dblclick',(e)=>{
            e.preventDefault();
            e.stopImmediatePropagation();
            buttons = [playButton,playButtons[10]]
            if(index!= 10)reproducir(buttons,index)
        }) 

        changeButtons.forEach((cButton, ind)=>{
            cButton.addEventListener('click',(e)=>{
                e.preventDefault();
                e.stopImmediatePropagation();
                if(ind == 1){
                    if(newIndex < 9 ){
                        buttons = [playButtons[10],playButtons[newIndex+1]]
                        reproducir(buttons,newIndex+1)
                    }else{
                        buttons = [playButtons[10],playButtons[0]]
                        reproducir(buttons,0)
                    }
                }else{
                    if(newIndex > 0 ){
                        buttons = [playButtons[10],playButtons[newIndex-1]]
                        reproducir(buttons,newIndex-1)
                    }   
                }
            
            })
        })
        audio.onended = (e)=>{
            e.preventDefault();
            e.stopImmediatePropagation();
            if(newIndex < 9 ){
                buttons = [playButtons[10],playButtons[newIndex+1]]
                reproducir(buttons,newIndex+1)
            }else{
                changeICon('fa-play','fa-pause',playButtons)
            }
        }
    }) 
   
}