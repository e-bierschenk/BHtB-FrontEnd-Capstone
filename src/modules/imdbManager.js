import { imdbApi } from "./Settings.js" 


export const getCastByMovieId = movieId => {
    return fetch (`${imdbApi.url}/FullCast/${imdbApi.key}/${movieId}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            return res})
}

export const getMoviesByActorId = actorId => {
    return fetch (`${imdbApi.url}/Name/${imdbApi.key}/${actorId}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            return res})
}

export const getPostersByMovieId = movieId => {
    return fetch (`${imdbApi.url}/Posters/${imdbApi.key}/${movieId}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            return res})
}