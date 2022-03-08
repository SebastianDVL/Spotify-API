let artistas = {
    thepolice:'https://api.spotify.com/v1/artists/5NGO30tJxFlKixkPSgXcFE/top-tracks?market=US',
    thecure: 'https://api.spotify.com/v1/artists/7bu3H8JO7d0UbMoVzbo70s/top-tracks?market=US',
    david:'https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy/top-tracks?market=US',
    bobmarley:'https://api.spotify.com/v1/artists/2QsynagSdAqZj3U9HgDzjD/top-tracks?market=US',
    soad:'https://api.spotify.com/v1/artists/5eAWCfyUhZtHHtBdNk56l1/top-tracks?market=US'
}

export const URI = "https://api.spotify.com/v1/artists/5NGO30tJxFlKixkPSgXcFE/top-tracks?market=US"
const TOKEN = "Bearer BQCz1hDPc7MOLG2ByLoHQb7Hj_h-ePHc57vLv-J3PXKW75xTfOwTPMD3NGPStwSXj8MUjuPsph9hGxvF5giq6okxfRe6Gb5JjdjJhpjvpLuqtrXCuZtXtO9M_t5C7XUvEBXB6cXMHXjQK_do"

export const PARAMETROS_PETICION = {
    method:"GET",
    headers:{
        Authorization:TOKEN
    }  
}