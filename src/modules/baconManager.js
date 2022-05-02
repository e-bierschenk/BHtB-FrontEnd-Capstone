import { netlifyConfig } from "../helpers/apiKeys"

export const addGame = gameObj => {

    return fetch(`${netlifyConfig.baconUrl}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameObj)
    }).then(response => response.json())
}

export const getGamesByUserId = userId => {
    return fetch(`${netlifyConfig.baconUrl}/games?userId=${userId}&_sort=id&_order=desc&_limit=10`)
        .then(res => res.json())
}

export const deleteGame = gameObj => {

    return fetch(`${netlifyConfig.baconUrl}/games/${gameObj.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameObj)
    }).then(response => response.json())
}

export const getCoinsByUserId = userId => {
    return fetch(`${netlifyConfig.baconUrl}/users/${userId}`)
        .then(res => res.json())
        .then(pr => pr.baconbits)
}

export const updateCoinsByUserId = userObj => {
    return fetch(`${netlifyConfig.baconUrl}/users/${userObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    }).then(response => response.json())
}

export const getTopActors = () => {
    return fetch(`${netlifyConfig.baconUrl}/topActors`)
        .then(res => res.json())
}