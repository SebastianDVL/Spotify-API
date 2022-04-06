export function manejarReproductor(audio){
    
    let timeline = document.querySelector('.timeline');
    //Sincronizar la linea de tiempo del input range con la de la cancion

    window.onload = ()=>{timeline.value = 0}

    //funcion para llenar el background de la linea del tiempo dependiendo del tiempo actual de la cancion
    let cambiarPosicion = ()=> {
        let porcentaje = (100*audio.currentTime) / audio.duration;
        timeline.style.backgroundSize = `${porcentaje}% 100%`;
        timeline.value = porcentaje;
    }

    audio.ontimeupdate = cambiarPosicion;
    //funcion para manejar linea del tiempo de la cancion con el input range
    let cambiarLinea = ()=> {
        let tiempo = (timeline.value * audio.duration) / 100;
        audio.currentTime = tiempo;
    }
    
    timeline.addEventListener('change', cambiarLinea)

    //aplicar estilos al backgroud de la linea del range cuando se maneja manualmente la linea de tiempo de la cancion o el volumen

    let rangeInputs = document.querySelectorAll('input[type="range"]')

    function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    } 
    const min = target.min
    const max = target.max
    const val = target.value
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    }

    rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
    })

    // Cambiar icono de volumen dependiendo del nivel de volumen (mutear o desmutear)

    let volumeline = document.querySelector('.volumeline')
    let volumeIcon = document.querySelector('.volumeIcon')
    
    volumeIcon.addEventListener('click',()=>{
        if(audio.volume == 0){
            volumeline.value = 100
            volumeline.style.backgroundSize = '100% 100%'
            manageVolume(volumeline.value)
        }else{
            volumeline.value = 0
            volumeline.style.backgroundSize = '0% 100%'
            manageVolume(volumeline.value)
        }
        
    })

    volumeline.addEventListener('change',()=>{
    
       manageVolume(volumeline.value)
    })

    //funcion para mnejar el volumen del reproductor y cambiar el icono con respecto al nivel de volumen
    function manageVolume(volumeValue){
        let volume = volumeValue/ 100;
        if(volume == 0){
            volumeIcon.classList.add("fa-volume-xmark")
            volumeIcon.classList.remove("fa-volume-high")
            volumeIcon.classList.remove("fa-volume-low")
        }else if(volume > 0.5){
            volumeIcon.classList.remove("fa-volume-xmark")
            volumeIcon.classList.add("fa-volume-high")
            volumeIcon.classList.remove("fa-volume-low")
        }else{
            volumeIcon.classList.remove("fa-volume-xmark")
            volumeIcon.classList.remove("fa-volume-high")
            volumeIcon.classList.add("fa-volume-low")
        }
        audio.volume = volume;
    }

 
}
