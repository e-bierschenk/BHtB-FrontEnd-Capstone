import { apiKey } from "./api-key.js" 


export const getCastByMovieId = movieId => {
    return fetch (`https://imdb-api.com/API/FullCast/${apiKey}/${movieId}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            return res})
}

export const getMoviesByActorId = actorId => {
    return fetch (`https://imdb-api.com/API/Name/${apiKey}/${actorId}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            return res})
}