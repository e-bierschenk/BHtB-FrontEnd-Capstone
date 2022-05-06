import { netlifyConfig } from "../helpers/apiKeys.js"


export const getCastByMovieId = movieId => {
    return fetch (`${netlifyConfig.imdbUrl}/FullCast/${netlifyConfig.imdbApiKey}/${movieId}`)
        .then(response => response.json())
        .then(res => {
            return res})
}

export const getMoviesByActorId = actorId => {
    return fetch (`${netlifyConfig.imdbUrl}/Name/${netlifyConfig.imdbApiKey}/${actorId}`)
        .then(response => response.json())
        .then(res => {
            return res})
}

export const getMovieByMovieId = movieId => {
    return fetch (`${netlifyConfig.imdbUrl}/Title/${netlifyConfig.imdbApiKey}/${movieId}`)
        .then(response => response.json())
        .then(res => {
            return res})
}