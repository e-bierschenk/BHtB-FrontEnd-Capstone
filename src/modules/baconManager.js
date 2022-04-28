import { baconApi } from "./Settings"

export const addGame = gameObj => {

    return fetch(`${baconApi.url}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameObj)
    }).then(response => response.json())
}

export const getGamesByUserId = userId => {
    return fetch(`${baconApi.url}/games?userId=${userId}&_sort=id&_order=desc`)
        .then(res => res.json())
}

export const deleteGame = gameObj => {

    return fetch(`${baconApi.url}/games/${gameObj.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameObj)
    }).then(response => response.json())
}

export const getCoinsByUserId = userId => {
    return fetch(`${baconApi.url}/users/${userId}`)
        .then(res => res.json())
        .then(pr => pr.baconbits)
}

export const updateCoinsByUserId = userObj => {
    return fetch(`${baconApi.url}/users/${userObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    }).then(response => response.json())
}

export const getTopActors = () => {
    return fetch(`${baconApi.url}/topActors`)
        .then(res => res.json())
}