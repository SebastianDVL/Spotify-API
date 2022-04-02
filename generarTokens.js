export async function generarToken(){

    let client_id = "9125ab9563414e5fbc86ed7b15a24630"
    let client_secret = "b8ea222a46414c56b7c0c007f49809c3"
    let grant_type = "client_credentials"

    let parametros ={
        method:"POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:`client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}`,
    }

    let res = await fetch("https://accounts.spotify.com/api/token",parametros)
    let token = res.json()
    return token
}


