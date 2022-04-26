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