
const URI = "https://api.spotify.com/v1/artists/5NGO30tJxFlKixkPSgXcFE/top-tracks?market=US"
const TOKEN = "Bearer BQDgEMWfOOc-Yg9bkFuFTb1Uv-rJAZLfI7IfX-CSbBRpLr9-eYlVBnmWh3VnOP1VT7HQUVYwOn1sYBXwU4eAHXudnrJgdmNfwjCDw-GH0aPqFQ53oyCIgob9JbDtC1BSAYcrBAwAByLkUFcX"

let parametrosPeticion = {
    method:"GET",
    headers:{
        Authorization:TOKEN
    }  
}

fetch(URI,parametrosPeticion)
.then(respuesta=>respuesta.json())
.then(respuestaJSON=>{
    respuestaJSON.tracks.forEach(track => {
        console.log(track.name)
    });
})
.catch(respuestaERROR=>console.log(respuestaERROR))
