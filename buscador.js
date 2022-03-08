export function buscarCanciones(songs){
    let searchBar = document.querySelector("#searchBar")

    searchBar.addEventListener('input', e =>{
        let value = e.target.value.toLowerCase().replace(/ /g,"")

        songs.forEach(song => {
            let titulo = song.titulo.toLowerCase().replace(/ /g,"")

            let check = titulo.includes(value)

            song.contenedor.classList.toggle('hide',!check)
        });
    })
}